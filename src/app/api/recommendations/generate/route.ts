import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Configuración de Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

// Tipos
interface RecommendationRequest {
  userId: string
  recommendationType: 'property' | 'location' | 'strategy' | 'timing' | 'comprehensive'
  userProfile: any
  preferences?: any
  context?: any
}

interface Recommendation {
  id: string
  userId: string
  type: string
  title: string
  description: string
  category: string
  priority: 'high' | 'medium' | 'low'
  confidence: number
  impact: 'high' | 'medium' | 'low'
  timeframe: string
  cost?: number
  effort: 'low' | 'medium' | 'high'
  tags: string[]
  createdAt: string
}

interface RecommendationResponse {
  recommendations: Recommendation[]
  summary: string
  nextSteps: string[]
  confidence: number
  lastUpdated: string
}

// POST /api/recommendations/generate
export async function POST(request: NextRequest) {
  try {
    const { userId, recommendationType, userProfile, preferences, context }: RecommendationRequest = await request.json()
    
    if (!userId || !recommendationType || !userProfile) {
      return NextResponse.json({ 
        error: 'Missing required fields: userId, recommendationType, userProfile' 
      }, { status: 400 })
    }

    // Generar recomendaciones basadas en el tipo
    const recommendations = await generateRecommendations(
      recommendationType, 
      userProfile, 
      preferences, 
      context
    )
    
    // Generar resumen y próximos pasos
    const summary = generateSummary(recommendations, recommendationType)
    const nextSteps = generateNextSteps(recommendations, userProfile)
    const confidence = calculateOverallConfidence(recommendations)

    // Guardar recomendaciones en la base de datos
    const { error: saveError } = await supabase
      .from('recommendations')
      .insert(
        recommendations.map(rec => ({
          ...rec,
          userId,
          createdAt: new Date().toISOString()
        }))
      )

    if (saveError) {
      console.error('Error saving recommendations:', saveError)
    }

    const response: RecommendationResponse = {
      recommendations,
      summary,
      nextSteps,
      confidence,
      lastUpdated: new Date().toISOString()
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Recommendations error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// GET /api/recommendations/user
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const type = searchParams.get('type')
    const priority = searchParams.get('priority')
    const limit = parseInt(searchParams.get('limit') || '20')
    
    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }

    let query = supabase
      .from('recommendations')
      .select('*')
      .eq('userId', userId)
      .order('createdAt', { ascending: false })
      .limit(limit)

    if (type) query = query.eq('type', type)
    if (priority) query = query.eq('priority', priority)

    const { data: recommendations, error } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ 
      recommendations,
      total: recommendations.length,
      userId
    })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT /api/recommendations/feedback
export async function PUT(request: NextRequest) {
  try {
    const { recommendationId, userId, feedback, rating } = await request.json()
    
    if (!recommendationId || !userId || !feedback) {
      return NextResponse.json({ 
        error: 'Missing required fields: recommendationId, userId, feedback' 
      }, { status: 400 })
    }

    // Guardar feedback del usuario
    const { error } = await supabase
      .from('recommendation_feedback')
      .insert({
        recommendationId,
        userId,
        feedback,
        rating: rating || null,
        createdAt: new Date().toISOString()
      })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ 
      message: 'Feedback saved successfully',
      recommendationId,
      feedback
    })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// Funciones auxiliares
async function generateRecommendations(
  type: string, 
  userProfile: any, 
  preferences?: any, 
  context?: any
): Promise<Recommendation[]> {
  const recommendations: Recommendation[] = []
  
  switch (type) {
    case 'property':
      recommendations.push(...await generatePropertyRecommendations(userProfile, preferences))
      break
    case 'location':
      recommendations.push(...await generateLocationRecommendations(userProfile, preferences))
      break
    case 'strategy':
      recommendations.push(...await generateStrategyRecommendations(userProfile, preferences))
      break
    case 'timing':
      recommendations.push(...await generateTimingRecommendations(userProfile, preferences))
      break
    case 'comprehensive':
      recommendations.push(...await generateComprehensiveRecommendations(userProfile, preferences))
      break
  }
  
  return recommendations
}

async function generatePropertyRecommendations(userProfile: any, preferences?: any): Promise<Recommendation[]> {
  const recommendations: Recommendation[] = []
  
  if (userProfile.primaryGoal === 'invertir') {
    recommendations.push({
      id: `prop-rec-${Date.now()}-1`,
      userId: userProfile.id,
      type: 'property',
      title: 'Apartamentos en Tokio Central',
      description: 'Apartamentos de 1-2 habitaciones en áreas como Shibuya, Shinjuku o Roppongi ofrecen excelente potencial de renta y valorización',
      category: 'investment',
      priority: 'high',
      confidence: 85,
      impact: 'high',
      timeframe: '3-6 meses',
      cost: userProfile.budgetMin || 200000,
      effort: 'medium',
      tags: ['tokyo', 'apartment', 'rental', 'high-yield'],
      createdAt: new Date().toISOString()
    })
    
    recommendations.push({
      id: `prop-rec-${Date.now()}-2`,
      userId: userProfile.id,
      type: 'property',
      title: 'Propiedades Renovables en Osaka',
      description: 'Casas tradicionales japonesas que requieren renovación pero tienen potencial de valorización significativa',
      category: 'investment',
      priority: 'medium',
      confidence: 75,
      impact: 'high',
      timeframe: '6-12 meses',
      cost: userProfile.budgetMin || 150000,
      effort: 'high',
      tags: ['osaka', 'renovation', 'value-add', 'traditional'],
      createdAt: new Date().toISOString()
    })
  } else if (userProfile.primaryGoal === 'vivir') {
    recommendations.push({
      id: `prop-rec-${Date.now()}-3`,
      userId: userProfile.id,
      type: 'property',
      title: 'Casas Familiares en Yokohama',
      description: 'Casas con jardín en áreas residenciales de Yokohama, perfectas para familias con buena conectividad a Tokio',
      category: 'lifestyle',
      priority: 'high',
      confidence: 80,
      impact: 'high',
      timeframe: '6-12 meses',
      cost: userProfile.budgetMax || 400000,
      effort: 'medium',
      tags: ['yokohama', 'family', 'garden', 'residential'],
      createdAt: new Date().toISOString()
    })
  }
  
  return recommendations
}

async function generateLocationRecommendations(userProfile: any, preferences?: any): Promise<Recommendation[]> {
  const recommendations: Recommendation[] = []
  
  if (userProfile.primaryGoal === 'invertir') {
    recommendations.push({
      id: `loc-rec-${Date.now()}-1`,
      userId: userProfile.id,
      type: 'location',
      title: 'Tokio - Distrito Financiero',
      description: 'Áreas como Marunouchi, Otemachi y Nihonbashi ofrecen estabilidad y crecimiento constante',
      category: 'investment',
      priority: 'high',
      confidence: 90,
      impact: 'high',
      timeframe: 'Inmediato',
      effort: 'low',
      tags: ['tokyo', 'financial', 'stable', 'premium'],
      createdAt: new Date().toISOString()
    })
    
    recommendations.push({
      id: `loc-rec-${Date.now()}-2`,
      userId: userProfile.id,
      type: 'location',
      title: 'Osaka - Centro Comercial',
      description: 'Distritos como Namba, Umeda y Shinsaibashi ofrecen oportunidades de crecimiento con menor costo de entrada',
      category: 'investment',
      priority: 'medium',
      confidence: 80,
      impact: 'medium',
      timeframe: '3-6 meses',
      effort: 'medium',
      tags: ['osaka', 'commercial', 'growth', 'affordable'],
      createdAt: new Date().toISOString()
    })
  } else if (userProfile.primaryGoal === 'migrar') {
    recommendations.push({
      id: `loc-rec-${Date.now()}-3`,
      userId: userProfile.id,
      type: 'location',
      title: 'Tokio - Áreas Internacionales',
      description: 'Distritos como Azabu, Roppongi y Hiroo tienen comunidades internacionales establecidas y servicios en inglés',
      category: 'migration',
      priority: 'high',
      confidence: 85,
      impact: 'high',
      timeframe: '1-3 meses',
      effort: 'low',
      tags: ['tokyo', 'international', 'english', 'community'],
      createdAt: new Date().toISOString()
    })
  }
  
  return recommendations
}

async function generateStrategyRecommendations(userProfile: any, preferences?: any): Promise<Recommendation[]> {
  const recommendations: Recommendation[] = []
  
  if (userProfile.primaryGoal === 'invertir') {
    recommendations.push({
      id: `strat-rec-${Date.now()}-1`,
      userId: userProfile.id,
      type: 'strategy',
      title: 'Estrategia de Diversificación Regional',
      description: 'Distribuye inversiones entre Tokio (60%), Osaka (25%) y otras ciudades (15%) para balancear riesgo y retorno',
      category: 'investment',
      priority: 'high',
      confidence: 85,
      impact: 'high',
      timeframe: '12-24 meses',
      effort: 'medium',
      tags: ['diversification', 'risk-management', 'portfolio'],
      createdAt: new Date().toISOString()
    })
    
    recommendations.push({
      id: `strat-rec-${Date.now()}-2`,
      userId: userProfile.id,
      type: 'strategy',
      title: 'Enfoque en Propiedades de Renta',
      description: 'Prioriza propiedades con potencial de renta alta y estabilidad para generar flujo de caja consistente',
      category: 'investment',
      priority: 'high',
      confidence: 80,
      impact: 'high',
      timeframe: '6-12 meses',
      effort: 'medium',
      tags: ['rental', 'cash-flow', 'stability'],
      createdAt: new Date().toISOString()
    })
  } else if (userProfile.primaryGoal === 'migrar') {
    recommendations.push({
      id: `strat-rec-${Date.now()}-3`,
      userId: userProfile.id,
      type: 'strategy',
      title: 'Plan de Migración Gradual',
      description: 'Inicia con visitas frecuentes, luego estadías temporales, y finalmente migración permanente',
      category: 'migration',
      priority: 'high',
      confidence: 90,
      impact: 'high',
      timeframe: '12-18 meses',
      effort: 'high',
      tags: ['gradual', 'visits', 'temporary', 'permanent'],
      createdAt: new Date().toISOString()
    })
  }
  
  return recommendations
}

async function generateTimingRecommendations(userProfile: any, preferences?: any): Promise<Recommendation[]> {
  const recommendations: Recommendation[] = []
  
  // Obtener datos de mercado para timing
  const { data: marketData } = await supabase
    .from('market_data')
    .select('*')
    .gte('lastUpdated', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())
    .order('lastUpdated', { ascending: false })
    .limit(5)
  
  if (marketData && marketData.length > 0) {
    const avgTrend = marketData.reduce((sum, data) => sum + (data.priceChangePercent || 0), 0) / marketData.length
    
    if (avgTrend > 2) {
      recommendations.push({
        id: `time-rec-${Date.now()}-1`,
        userId: userProfile.id,
        type: 'timing',
        title: 'Mercado en Tendencia Alcista',
        description: 'El mercado muestra crecimiento sostenido. Considera acelerar tus planes de inversión para aprovechar la tendencia',
        category: 'timing',
        priority: 'high',
        confidence: 80,
        impact: 'high',
        timeframe: '1-3 meses',
        effort: 'low',
        tags: ['bull-market', 'acceleration', 'opportunity'],
        createdAt: new Date().toISOString()
      })
    } else if (avgTrend < -1) {
      recommendations.push({
        id: `time-rec-${Date.now()}-2`,
        userId: userProfile.id,
        type: 'timing',
        title: 'Mercado en Corrección',
        description: 'El mercado muestra signos de corrección. Considera esperar mejores condiciones o buscar oportunidades de valor',
        category: 'timing',
        priority: 'medium',
        confidence: 75,
        impact: 'medium',
        timeframe: '3-6 meses',
        effort: 'low',
        tags: ['correction', 'wait', 'value-opportunity'],
        createdAt: new Date().toISOString()
      })
    }
  }
  
  return recommendations
}

async function generateComprehensiveRecommendations(userProfile: any, preferences?: any): Promise<Recommendation[]> {
  const recommendations: Recommendation[] = []
  
  // Combinar todos los tipos de recomendaciones
  const propertyRecs = await generatePropertyRecommendations(userProfile, preferences)
  const locationRecs = await generateLocationRecommendations(userProfile, preferences)
  const strategyRecs = await generateStrategyRecommendations(userProfile, preferences)
  const timingRecs = await generateTimingRecommendations(userProfile, preferences)
  
  recommendations.push(...propertyRecs, ...locationRecs, ...strategyRecs, ...timingRecs)
  
  // Ordenar por prioridad y confianza
  return recommendations.sort((a, b) => {
    const priorityOrder = { 'high': 3, 'medium': 2, 'low': 1 }
    const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority]
    if (priorityDiff !== 0) return priorityDiff
    return b.confidence - a.confidence
  })
}

function generateSummary(recommendations: Recommendation[], type: string): string {
  const highPriority = recommendations.filter(r => r.priority === 'high').length
  const total = recommendations.length
  
  switch (type) {
    case 'property':
      return `Se generaron ${total} recomendaciones de propiedades, con ${highPriority} de alta prioridad. Enfócate en las recomendaciones de alta prioridad para maximizar tu inversión.`
    case 'location':
      return `Se identificaron ${total} ubicaciones estratégicas, con ${highPriority} consideradas críticas para tu éxito.`
    case 'strategy':
      return `Se desarrollaron ${total} estrategias personalizadas, con ${highPriority} estrategias clave para tu objetivo.`
    case 'timing':
      return `Se analizaron ${total} factores de timing, con ${highPriority} oportunidades críticas de tiempo.`
    case 'comprehensive':
      return `Análisis completo generado con ${total} recomendaciones integradas, incluyendo ${highPriority} acciones prioritarias.`
    default:
      return `Se generaron ${total} recomendaciones personalizadas para tu perfil.`
  }
}

function generateNextSteps(recommendations: Recommendation[], userProfile: any): string[] {
  const nextSteps: string[] = []
  
  const highPriority = recommendations.filter(r => r.priority === 'high')
  
  if (highPriority.length > 0) {
    nextSteps.push(`Revisar ${highPriority.length} recomendaciones de alta prioridad`)
    nextSteps.push('Evaluar presupuesto y timeline para cada recomendación')
  }
  
  if (userProfile.primaryGoal === 'invertir') {
    nextSteps.push('Contactar agentes inmobiliarios especializados')
    nextSteps.push('Realizar análisis financiero detallado')
  } else if (userProfile.primaryGoal === 'migrar') {
    nextSteps.push('Iniciar proceso de documentación')
    nextSteps.push('Mejorar nivel de japonés si es necesario')
  } else if (userProfile.primaryGoal === 'vivir') {
    nextSteps.push('Planificar visitas a ubicaciones recomendadas')
    nextSteps.push('Evaluar servicios y amenidades locales')
  }
  
  nextSteps.push('Programar seguimiento en 30 días')
  
  return nextSteps
}

function calculateOverallConfidence(recommendations: Recommendation[]): number {
  if (recommendations.length === 0) return 0
  
  const avgConfidence = recommendations.reduce((sum, rec) => sum + rec.confidence, 0) / recommendations.length
  return Math.round(avgConfidence)
}
