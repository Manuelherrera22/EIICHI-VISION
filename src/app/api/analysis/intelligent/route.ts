import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { calculateIntelligentScores } from '@/lib/arquitecto-types'

// Configuración de Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

// Tipos
interface AnalysisRequest {
  userId: string
  analysisType: 'ivi' | 'ivm' | 'ise' | 'complete'
  userData: any
}

interface AnalysisResult {
  id: string
  userId: string
  analysisType: string
  scores: {
    IVI?: { score: number; factors: any }
    IVM?: { score: number; factors: any }
    ISE?: { score: number; factors: any }
    overallScore?: number
    recommendation?: string
  }
  insights: string[]
  recommendations: string[]
  confidence: number
  createdAt: string
}

// POST /api/analysis/intelligent
export async function POST(request: NextRequest) {
  try {
    const { userId, analysisType, userData }: AnalysisRequest = await request.json()
    
    if (!userId || !analysisType || !userData) {
      return NextResponse.json({ 
        error: 'Missing required fields: userId, analysisType, userData' 
      }, { status: 400 })
    }

    // Calcular scores inteligentes
    const intelligentScores = calculateIntelligentScores(userData)
    
    // Verificar que los scores se calcularon correctamente
    if (!intelligentScores) {
      return NextResponse.json({ 
        error: 'Failed to calculate intelligent scores' 
      }, { status: 500 })
    }
    
    // Generar insights basados en el análisis
    const insights = generateInsights(userData, intelligentScores, analysisType)
    
    // Generar recomendaciones
    const recommendations = generateRecommendations(userData, intelligentScores, analysisType)
    
    // Calcular confianza del análisis
    const confidence = calculateConfidence(userData, intelligentScores)
    
    // Guardar análisis en la base de datos
    const analysisResult: Omit<AnalysisResult, 'id' | 'createdAt'> = {
      userId,
      analysisType,
      scores: intelligentScores,
      insights,
      recommendations,
      confidence
    }

    const { data: savedAnalysis, error } = await supabase
      .from('analysis_results')
      .insert({
        ...analysisResult,
        createdAt: new Date().toISOString()
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ 
      analysis: savedAnalysis,
      scores: intelligentScores,
      insights,
      recommendations,
      confidence
    })
  } catch (error) {
    console.error('Analysis error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// GET /api/analysis/intelligent
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const analysisType = searchParams.get('type')
    
    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }

    let query = supabase
      .from('analysis_results')
      .select('*')
      .eq('userId', userId)
      .order('createdAt', { ascending: false })

    if (analysisType) {
      query = query.eq('analysisType', analysisType)
    }

    const { data: analyses, error } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ analyses })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// Funciones auxiliares
function generateInsights(userData: any, scores: any, analysisType: string): string[] {
  const insights: string[] = []
  
  switch (analysisType) {
    case 'ivi':
      if (scores.IVI?.score >= 80) {
        insights.push('Excelente perfil para inversión inmobiliaria en Japón')
        insights.push('Alto potencial de ROI basado en tu perfil financiero')
      } else if (scores.IVI?.score >= 60) {
        insights.push('Buen perfil para inversión con algunas áreas de mejora')
        insights.push('Considera diversificar tu estrategia de inversión')
      } else {
        insights.push('Perfil de inversión requiere fortalecimiento')
        insights.push('Recomendamos mejorar experiencia financiera antes de invertir')
      }
      break
      
    case 'ivm':
      if (scores.IVM?.score >= 80) {
        insights.push('Alta probabilidad de éxito migratorio')
        insights.push('Perfil cultural muy compatible con Japón')
      } else if (scores.IVM?.score >= 60) {
        insights.push('Buena base para migración con preparación adicional')
        insights.push('Considera mejorar nivel de japonés')
      } else {
        insights.push('Migración requiere preparación significativa')
        insights.push('Enfócate en desarrollo cultural y lingüístico')
      }
      break
      
    case 'ise':
      if (scores.ISE?.score >= 80) {
        insights.push('Excelente alineación con estilo de vida japonés')
        insights.push('Alta probabilidad de satisfacción personal')
      } else if (scores.ISE?.score >= 60) {
        insights.push('Buena compatibilidad con cultura japonesa')
        insights.push('Algunas áreas pueden requerir adaptación')
      } else {
        insights.push('Adaptación cultural requerirá esfuerzo significativo')
        insights.push('Considera experiencias previas en Japón')
      }
      break
      
    case 'complete':
      insights.push('Análisis completo realizado exitosamente')
      insights.push('Todos los índices calculados con alta precisión')
      break
  }
  
  return insights
}

function generateRecommendations(userData: any, scores: any, analysisType: string): string[] {
  const recommendations: string[] = []
  
  // Recomendaciones basadas en scores
  if (scores.overallScore >= 85) {
    recommendations.push('Procede con confianza - perfil excelente')
    recommendations.push('Considera inversiones de mayor escala')
  } else if (scores.overallScore >= 70) {
    recommendations.push('Perfil sólido con oportunidades de mejora')
    recommendations.push('Inicia con inversiones moderadas')
  } else if (scores.overallScore >= 50) {
    recommendations.push('Requiere preparación adicional antes de proceder')
    recommendations.push('Considera consultoría especializada')
  } else {
    recommendations.push('Perfil requiere desarrollo significativo')
    recommendations.push('Enfócate en preparación antes de cualquier acción')
  }
  
  // Recomendaciones específicas por tipo
  if (analysisType === 'ivi' && userData.budgetMin && userData.budgetMax) {
    const avgBudget = (userData.budgetMin + userData.budgetMax) / 2
    if (avgBudget >= 500000) {
      recommendations.push('Considera propiedades premium en ubicaciones estratégicas')
    } else if (avgBudget >= 100000) {
      recommendations.push('Enfócate en propiedades de valor medio con potencial de crecimiento')
    } else {
      recommendations.push('Considera propiedades de entrada con potencial de renovación')
    }
  }
  
  return recommendations
}

function calculateConfidence(userData: any, scores: any): number {
  let confidence = 0
  
  // Factores que aumentan la confianza
  if (userData.fullName && userData.age && userData.nationality) confidence += 20
  if (userData.timeline && userData.motivation) confidence += 20
  if (userData.budgetMin && userData.budgetMax) confidence += 20
  if (userData.culturalAffinity?.japanKnowledge) confidence += 15
  if (userData.culturalAffinity?.japaneseLevel) confidence += 15
  if (userData.previousExperience) confidence += 10
  
  // Ajustar por completitud de datos
  const dataCompleteness = Object.keys(userData).length / 20 // Asumiendo 20 campos esperados
  confidence *= dataCompleteness
  
  return Math.min(Math.round(confidence), 100)
}
