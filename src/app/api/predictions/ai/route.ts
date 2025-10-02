import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Configuración de Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

// Tipos
interface PredictionRequest {
  userId: string
  predictionType: 'market' | 'property' | 'success' | 'risk'
  timeframe: 'short' | 'medium' | 'long'
  userData: any
  context?: any
}

interface PredictionResult {
  id: string
  userId: string
  predictionType: string
  timeframe: string
  prediction: {
    value: number
    confidence: number
    factors: string[]
    explanation: string
  }
  recommendations: string[]
  risks: string[]
  opportunities: string[]
  createdAt: string
}

// POST /api/predictions/ai
export async function POST(request: NextRequest) {
  try {
    const { userId, predictionType, timeframe, userData, context }: PredictionRequest = await request.json()
    
    if (!userId || !predictionType || !timeframe || !userData) {
      return NextResponse.json({ 
        error: 'Missing required fields: userId, predictionType, timeframe, userData' 
      }, { status: 400 })
    }

    // Generar predicción basada en IA
    const prediction = await generateAIPrediction(predictionType, timeframe, userData, context)
    
    // Generar recomendaciones
    const recommendations = generateRecommendations(predictionType, prediction, userData)
    
    // Identificar riesgos
    const risks = identifyRisks(predictionType, prediction, userData)
    
    // Identificar oportunidades
    const opportunities = identifyOpportunities(predictionType, prediction, userData)
    
    // Guardar predicción en la base de datos
    const predictionResult: Omit<PredictionResult, 'id' | 'createdAt'> = {
      userId,
      predictionType,
      timeframe,
      prediction,
      recommendations,
      risks,
      opportunities
    }

    const { data: savedPrediction, error } = await supabase
      .from('ai_predictions')
      .insert({
        ...predictionResult,
        createdAt: new Date().toISOString()
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ 
      prediction: savedPrediction,
      aiInsights: {
        prediction: prediction.value,
        confidence: prediction.confidence,
        explanation: prediction.explanation,
        factors: prediction.factors
      },
      recommendations,
      risks,
      opportunities
    })
  } catch (error) {
    console.error('Prediction error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// GET /api/predictions/ai
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const predictionType = searchParams.get('type')
    const timeframe = searchParams.get('timeframe')
    
    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }

    let query = supabase
      .from('ai_predictions')
      .select('*')
      .eq('userId', userId)
      .order('createdAt', { ascending: false })

    if (predictionType) {
      query = query.eq('predictionType', predictionType)
    }
    
    if (timeframe) {
      query = query.eq('timeframe', timeframe)
    }

    const { data: predictions, error } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ predictions })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// Funciones auxiliares
async function generateAIPrediction(type: string, timeframe: string, userData: any, context?: any) {
  // Simulación de predicción con IA (aquí integrarías con Claude, GPT-4, etc.)
  
  let baseValue = 0
  let confidence = 0
  let factors: string[] = []
  let explanation = ''
  
  switch (type) {
    case 'market':
      baseValue = await predictMarketTrends(timeframe, userData)
      confidence = calculateMarketConfidence(userData)
      factors = ['Tendencias del mercado', 'Condiciones económicas', 'Demanda inmobiliaria']
      explanation = `Predicción de mercado basada en análisis de tendencias y datos económicos actuales`
      break
      
    case 'property':
      baseValue = await predictPropertyValue(userData, context)
      confidence = calculatePropertyConfidence(userData)
      factors = ['Ubicación', 'Características de la propiedad', 'Condición del mercado local']
      explanation = `Valoración de propiedad considerando ubicación, características y mercado local`
      break
      
    case 'success':
      baseValue = await predictSuccessProbability(userData)
      confidence = calculateSuccessConfidence(userData)
      factors = ['Perfil del usuario', 'Preparación', 'Condiciones del mercado']
      explanation = `Probabilidad de éxito basada en perfil personal y condiciones del mercado`
      break
      
    case 'risk':
      baseValue = await predictRiskLevel(userData)
      confidence = calculateRiskConfidence(userData)
      factors = ['Experiencia', 'Estabilidad financiera', 'Conocimiento del mercado']
      explanation = `Nivel de riesgo evaluado considerando experiencia y estabilidad financiera`
      break
  }
  
  return {
    value: baseValue,
    confidence,
    factors,
    explanation
  }
}

async function predictMarketTrends(timeframe: string, userData: any): Promise<number> {
  // Simulación de predicción de mercado
  const baseTrend = 5.2 // % de crecimiento anual promedio
  
  let multiplier = 1
  if (timeframe === 'short') multiplier = 0.3
  else if (timeframe === 'medium') multiplier = 1
  else if (timeframe === 'long') multiplier = 2.5
  
  // Ajustar basado en perfil del usuario
  if (userData.primaryGoal === 'invertir') multiplier *= 1.2
  if (userData.budgetMax && userData.budgetMax > 500000) multiplier *= 1.1
  
  return Math.round(baseTrend * multiplier * 100) / 100
}

async function predictPropertyValue(userData: any, context?: any): Promise<number> {
  // Simulación de valoración de propiedad
  const baseValue = context?.propertyValue || 300000
  
  let adjustment = 1
  if (userData.budgetMax && userData.budgetMax > baseValue) adjustment *= 1.1
  if (userData.previousExperience === 'extensa') adjustment *= 1.05
  
  return Math.round(baseValue * adjustment)
}

async function predictSuccessProbability(userData: any): Promise<number> {
  // Simulación de probabilidad de éxito
  let probability = 50 // Base
  
  if (userData.previousExperience === 'extensa') probability += 20
  else if (userData.previousExperience === 'moderada') probability += 10
  
  if (userData.culturalAffinity?.japanKnowledge === 'avanzado') probability += 15
  else if (userData.culturalAffinity?.japanKnowledge === 'intermedio') probability += 10
  
  if (userData.timeline === 'inmediato') probability += 5
  else if (userData.timeline === '6-meses') probability += 10
  
  return Math.min(probability, 95)
}

async function predictRiskLevel(userData: any): Promise<number> {
  // Simulación de nivel de riesgo (0-100, donde 100 es máximo riesgo)
  let risk = 50 // Base
  
  if (userData.previousExperience === 'ninguna') risk += 20
  else if (userData.previousExperience === 'limitada') risk += 10
  
  if (userData.culturalAffinity?.japanKnowledge === 'ninguno') risk += 15
  else if (userData.culturalAffinity?.japanKnowledge === 'basico') risk += 10
  
  if (userData.timeline === 'inmediato') risk += 10
  
  return Math.min(risk, 90)
}

function calculateMarketConfidence(userData: any): number {
  let confidence = 70
  if (userData.previousExperience === 'extensa') confidence += 15
  if (userData.culturalAffinity?.japanKnowledge === 'avanzado') confidence += 10
  return Math.min(confidence, 95)
}

function calculatePropertyConfidence(userData: any): number {
  let confidence = 65
  if (userData.budgetMax && userData.budgetMax > 100000) confidence += 15
  if (userData.previousExperience === 'extensa') confidence += 15
  return Math.min(confidence, 90)
}

function calculateSuccessConfidence(userData: any): number {
  let confidence = 60
  if (userData.previousExperience === 'extensa') confidence += 20
  if (userData.culturalAffinity?.japanKnowledge === 'avanzado') confidence += 15
  if (userData.timeline && userData.timeline !== 'inmediato') confidence += 10
  return Math.min(confidence, 95)
}

function calculateRiskConfidence(userData: any): number {
  let confidence = 75
  if (userData.previousExperience === 'extensa') confidence += 15
  if (userData.culturalAffinity?.japanKnowledge === 'avanzado') confidence += 10
  return Math.min(confidence, 95)
}

function generateRecommendations(type: string, prediction: any, userData: any): string[] {
  const recommendations: string[] = []
  
  switch (type) {
    case 'market':
      if (prediction.value > 7) {
        recommendations.push('Mercado en tendencia alcista - momento favorable para inversión')
        recommendations.push('Considera acelerar tus planes de inversión')
      } else if (prediction.value > 3) {
        recommendations.push('Mercado estable - procede con cautela')
        recommendations.push('Monitorea indicadores económicos regularmente')
      } else {
        recommendations.push('Mercado volátil - considera esperar mejores condiciones')
        recommendations.push('Enfócate en preparación mientras esperas')
      }
      break
      
    case 'property':
      if (prediction.value > userData.budgetMax * 1.1) {
        recommendations.push('Propiedad sobrevalorada - considera negociar precio')
        recommendations.push('Busca propiedades similares con mejor valor')
      } else if (prediction.value < userData.budgetMin * 0.9) {
        recommendations.push('Propiedad subvalorada - oportunidad de inversión')
        recommendations.push('Considera proceder rápidamente')
      } else {
        recommendations.push('Valoración justa - procede con análisis detallado')
        recommendations.push('Realiza inspección profesional')
      }
      break
      
    case 'success':
      if (prediction.value > 80) {
        recommendations.push('Alta probabilidad de éxito - procede con confianza')
        recommendations.push('Considera inversiones más ambiciosas')
      } else if (prediction.value > 60) {
        recommendations.push('Buena probabilidad de éxito con preparación adicional')
        recommendations.push('Enfócate en áreas de mejora identificadas')
      } else {
        recommendations.push('Requiere preparación significativa antes de proceder')
        recommendations.push('Considera consultoría especializada')
      }
      break
      
    case 'risk':
      if (prediction.value < 30) {
        recommendations.push('Bajo riesgo - procede con confianza')
        recommendations.push('Considera estrategias más agresivas')
      } else if (prediction.value < 60) {
        recommendations.push('Riesgo moderado - procede con cautela')
        recommendations.push('Implementa medidas de mitigación de riesgo')
      } else {
        recommendations.push('Alto riesgo - requiere preparación adicional')
        recommendations.push('Considera estrategias más conservadoras')
      }
      break
  }
  
  return recommendations
}

function identifyRisks(type: string, prediction: any, userData: any): string[] {
  const risks: string[] = []
  
  switch (type) {
    case 'market':
      risks.push('Volatilidad del mercado inmobiliario')
      risks.push('Cambios en políticas gubernamentales')
      risks.push('Fluctuaciones económicas globales')
      break
      
    case 'property':
      risks.push('Problemas estructurales no detectados')
      risks.push('Cambios en zonificación')
      risks.push('Problemas legales o de propiedad')
      break
      
    case 'success':
      risks.push('Falta de experiencia en el mercado japonés')
      risks.push('Barreras culturales y lingüísticas')
      risks.push('Cambios en situación personal')
      break
      
    case 'risk':
      risks.push('Pérdida de capital')
      risks.push('Dificultades de liquidez')
      risks.push('Problemas de gestión a distancia')
      break
  }
  
  return risks
}

function identifyOpportunities(type: string, prediction: any, userData: any): string[] {
  const opportunities: string[] = []
  
  switch (type) {
    case 'market':
      opportunities.push('Crecimiento del mercado inmobiliario japonés')
      opportunities.push('Oportunidades en ubicaciones emergentes')
      opportunities.push('Demanda creciente de propiedades internacionales')
      break
      
    case 'property':
      opportunities.push('Potencial de renovación y valorización')
      opportunities.push('Oportunidades de renta')
      opportunities.push('Valorización a largo plazo')
      break
      
    case 'success':
      opportunities.push('Acceso a mercado inmobiliario premium')
      opportunities.push('Diversificación de portfolio')
      opportunities.push('Experiencia cultural única')
      break
      
    case 'risk':
      opportunities.push('Aprendizaje y desarrollo personal')
      opportunities.push('Construcción de red profesional')
      opportunities.push('Experiencia internacional valiosa')
      break
  }
  
  return opportunities
}
