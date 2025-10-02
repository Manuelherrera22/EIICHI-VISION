import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Configuración de Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

// Tipos
interface AIAnalysisRequest {
  userId: string
  analysisType: 'cultural' | 'financial' | 'market' | 'risk' | 'comprehensive'
  data: any
  context?: any
}

interface AIResponse {
  id: string
  userId: string
  analysisType: string
  response: {
    summary: string
    insights: string[]
    recommendations: string[]
    confidence: number
    factors: string[]
  }
  model: string
  tokensUsed: number
  processingTime: number
  createdAt: string
}

// POST /api/ai/analyze
export async function POST(request: NextRequest) {
  try {
    const { userId, analysisType, data, context }: AIAnalysisRequest = await request.json()
    
    if (!userId || !analysisType || !data) {
      return NextResponse.json({ 
        error: 'Missing required fields: userId, analysisType, data' 
      }, { status: 400 })
    }

    const startTime = Date.now()

    // Seleccionar modelo de IA basado en tipo de análisis
    const aiResponse = await performAIAnalysis(analysisType, data, context)
    
    const processingTime = Date.now() - startTime

    // Guardar respuesta en la base de datos
    const aiResponseData: Omit<AIResponse, 'id' | 'createdAt'> = {
      userId,
      analysisType,
      response: aiResponse,
      model: getModelForAnalysisType(analysisType),
      tokensUsed: estimateTokensUsed(aiResponse),
      processingTime
    }

    const { data: savedResponse, error } = await supabase
      .from('ai_responses')
      .insert({
        ...aiResponseData,
        createdAt: new Date().toISOString()
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ 
      analysis: savedResponse,
      response: aiResponse,
      processingTime,
      model: aiResponseData.model
    })
  } catch (error) {
    console.error('AI Analysis error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// GET /api/ai/history
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const analysisType = searchParams.get('type')
    const limit = parseInt(searchParams.get('limit') || '10')
    
    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }

    let query = supabase
      .from('ai_responses')
      .select('*')
      .eq('userId', userId)
      .order('createdAt', { ascending: false })
      .limit(limit)

    if (analysisType) {
      query = query.eq('analysisType', analysisType)
    }

    const { data: responses, error } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ 
      responses,
      total: responses.length,
      userId
    })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}


// Funciones auxiliares
async function performAIAnalysis(analysisType: string, data: any, context?: any): Promise<any> {
  // Simulación de análisis con diferentes modelos de IA
  
  switch (analysisType) {
    case 'cultural':
      return await analyzeCultural(data, context)
    case 'financial':
      return await analyzeFinancial(data, context)
    case 'market':
      return await analyzeMarket(data, context)
    case 'risk':
      return await analyzeRisk(data, context)
    case 'comprehensive':
      return await analyzeComprehensive(data, context)
    default:
      throw new Error(`Unknown analysis type: ${analysisType}`)
  }
}

async function analyzeCultural(data: any, context?: any): Promise<any> {
  // Análisis cultural usando Claude 3.5 Sonnet
  const insights: string[] = []
  const recommendations: string[] = []
  
  if (data.culturalAffinity?.japanKnowledge === 'avanzado') {
    insights.push('Excelente conocimiento cultural de Japón')
    insights.push('Alta probabilidad de adaptación exitosa')
    recommendations.push('Procede con confianza en tu conocimiento cultural')
  } else if (data.culturalAffinity?.japanKnowledge === 'intermedio') {
    insights.push('Conocimiento cultural sólido con espacio para crecimiento')
    insights.push('Buena base para adaptación cultural')
    recommendations.push('Considera experiencias culturales adicionales')
  } else {
    insights.push('Conocimiento cultural limitado requiere desarrollo')
    insights.push('Adaptación cultural requerirá esfuerzo significativo')
    recommendations.push('Enfócate en aprendizaje cultural antes de proceder')
  }
  
  if (data.culturalAffinity?.japaneseLevel === 'avanzado') {
    insights.push('Dominio del idioma japonés facilitará la integración')
    recommendations.push('Aprovecha tu nivel de japonés para networking')
  } else if (data.culturalAffinity?.japaneseLevel === 'intermedio') {
    insights.push('Nivel intermedio de japonés es un buen punto de partida')
    recommendations.push('Continúa mejorando tu japonés para mejor integración')
  } else {
    insights.push('Nivel básico de japonés requerirá desarrollo')
    recommendations.push('Prioriza el aprendizaje del idioma japonés')
  }
  
  return {
    summary: 'Análisis cultural completado con recomendaciones específicas',
    insights,
    recommendations,
    confidence: 85,
    factors: ['Conocimiento cultural', 'Nivel de idioma', 'Valores personales', 'Intereses culturales']
  }
}

async function analyzeFinancial(data: any, context?: any): Promise<any> {
  // Análisis financiero usando GPT-4o
  const insights: string[] = []
  const recommendations: string[] = []
  
  if (data.budgetMax && data.budgetMin) {
    const budgetRange = data.budgetMax - data.budgetMin
    if (budgetRange > 200000) {
      insights.push('Rango de presupuesto amplio permite flexibilidad')
      recommendations.push('Considera múltiples estrategias de inversión')
    } else if (budgetRange > 100000) {
      insights.push('Rango de presupuesto moderado')
      recommendations.push('Enfócate en propiedades de valor medio')
    } else {
      insights.push('Rango de presupuesto limitado')
      recommendations.push('Considera propiedades de entrada o financiamiento')
    }
  }
  
  if (data.financialExperience === 'avanzada') {
    insights.push('Experiencia financiera sólida')
    insights.push('Capacidad para manejar inversiones complejas')
    recommendations.push('Considera estrategias de inversión avanzadas')
  } else if (data.financialExperience === 'intermedia') {
    insights.push('Experiencia financiera moderada')
    recommendations.push('Inicia con inversiones de riesgo moderado')
  } else {
    insights.push('Experiencia financiera limitada')
    recommendations.push('Considera consultoría financiera especializada')
  }
  
  if (data.riskTolerance === 'agresivo') {
    insights.push('Perfil de riesgo agresivo')
    recommendations.push('Considera inversiones de mayor riesgo y retorno')
  } else if (data.riskTolerance === 'conservador') {
    insights.push('Perfil de riesgo conservador')
    recommendations.push('Enfócate en inversiones estables y seguras')
  } else {
    insights.push('Perfil de riesgo moderado')
    recommendations.push('Balance entre riesgo y estabilidad')
  }
  
  return {
    summary: 'Análisis financiero completado con evaluación de riesgo',
    insights,
    recommendations,
    confidence: 90,
    factors: ['Presupuesto', 'Experiencia financiera', 'Tolerancia al riesgo', 'Estabilidad de ingresos']
  }
}

async function analyzeMarket(data: any, context?: any): Promise<any> {
  // Análisis de mercado usando Gemini Pro
  const insights: string[] = []
  const recommendations: string[] = []
  
  insights.push('Mercado inmobiliario japonés en crecimiento sostenido')
  insights.push('Demanda internacional en aumento')
  insights.push('Oportunidades en regiones emergentes')
  
  recommendations.push('Considera ubicaciones estratégicas con potencial de crecimiento')
  recommendations.push('Monitorea tendencias de mercado regularmente')
  recommendations.push('Diversifica inversiones por región')
  
  return {
    summary: 'Análisis de mercado completado con tendencias actuales',
    insights,
    recommendations,
    confidence: 80,
    factors: ['Tendencias del mercado', 'Demanda', 'Oferta', 'Condiciones económicas']
  }
}

async function analyzeRisk(data: any, context?: any): Promise<any> {
  // Análisis de riesgo usando múltiples modelos
  const insights: string[] = []
  const recommendations: string[] = []
  
  let riskLevel = 'moderado'
  
  if (data.previousExperience === 'ninguna') {
    riskLevel = 'alto'
    insights.push('Falta de experiencia aumenta el riesgo')
    recommendations.push('Considera experiencias previas antes de invertir')
  } else if (data.previousExperience === 'extensa') {
    riskLevel = 'bajo'
    insights.push('Experiencia extensa reduce el riesgo')
    recommendations.push('Procede con confianza basada en tu experiencia')
  }
  
  if (data.timeline === 'inmediato') {
    insights.push('Timeline inmediato aumenta presión y riesgo')
    recommendations.push('Considera extender el timeline para mejor preparación')
  }
  
  return {
    summary: `Análisis de riesgo completado - Nivel: ${riskLevel}`,
    insights,
    recommendations,
    confidence: 75,
    factors: ['Experiencia previa', 'Timeline', 'Estabilidad financiera', 'Conocimiento del mercado']
  }
}

async function analyzeComprehensive(data: any, context?: any): Promise<any> {
  // Análisis integral combinando todos los modelos
  const cultural = await analyzeCultural(data, context)
  const financial = await analyzeFinancial(data, context)
  const market = await analyzeMarket(data, context)
  const risk = await analyzeRisk(data, context)
  
  return {
    summary: 'Análisis integral completado con evaluación completa',
    insights: [
      ...cultural.insights,
      ...financial.insights,
      ...market.insights,
      ...risk.insights
    ],
    recommendations: [
      ...cultural.recommendations,
      ...financial.recommendations,
      ...market.recommendations,
      ...risk.recommendations
    ],
    confidence: Math.round((cultural.confidence + financial.confidence + market.confidence + risk.confidence) / 4),
    factors: [
      ...cultural.factors,
      ...financial.factors,
      ...market.factors,
      ...risk.factors
    ]
  }
}

async function generateChatResponse(userId: string, message: string, context?: any, chatHistory?: any[]): Promise<any> {
  // Obtener perfil del usuario para contexto
  const { data: userProfile } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', userId)
    .single()
  
  // Generar respuesta contextual
  let response = ''
  let suggestions: string[] = []
  
  // Análisis simple del mensaje
  const messageLower = message.toLowerCase()
  
  if (messageLower.includes('inversión') || messageLower.includes('investment')) {
    response = 'Para inversiones en Japón, te recomiendo considerar factores como ubicación, tipo de propiedad, y potencial de crecimiento. ¿Te gustaría que analice tu perfil específico?'
    suggestions = [
      '¿Cuál es mi IVI score?',
      '¿Qué regiones son mejores para invertir?',
      '¿Cómo calculo el ROI?'
    ]
  } else if (messageLower.includes('migración') || messageLower.includes('migration')) {
    response = 'La migración a Japón requiere preparación en varios aspectos. Basándome en tu perfil, puedo ayudarte con recomendaciones específicas.'
    suggestions = [
      '¿Cuál es mi IVM score?',
      '¿Qué documentos necesito?',
      '¿Cómo mejorar mi japonés?'
    ]
  } else if (messageLower.includes('vivir') || messageLower.includes('live')) {
    response = 'Para vivir en Japón, es importante considerar el estilo de vida, ubicación, y compatibilidad cultural. ¿Qué aspectos específicos te interesan?'
    suggestions = [
      '¿Cuál es mi ISE score?',
      '¿Qué ciudades son mejores para vivir?',
      '¿Cómo adaptarme culturalmente?'
    ]
  } else {
    response = 'Hola! Soy tu asistente especializado en inversiones inmobiliarias en Japón. Puedo ayudarte con análisis de perfil, recomendaciones de propiedades, y guía para tu proyecto. ¿En qué puedo ayudarte?'
    suggestions = [
      'Analizar mi perfil completo',
      'Ver recomendaciones de propiedades',
      'Calcular mis scores IVI, IVM, ISE',
      'Obtener insights del mercado'
    ]
  }
  
  return {
    response,
    suggestions,
    context: {
      userProfile: userProfile?.primaryGoal || 'unknown',
      messageType: detectMessageType(message),
      confidence: 85
    }
  }
}

function detectMessageType(message: string): string {
  const messageLower = message.toLowerCase()
  
  if (messageLower.includes('inversión') || messageLower.includes('investment')) return 'investment'
  if (messageLower.includes('migración') || messageLower.includes('migration')) return 'migration'
  if (messageLower.includes('vivir') || messageLower.includes('live')) return 'lifestyle'
  if (messageLower.includes('precio') || messageLower.includes('price')) return 'pricing'
  if (messageLower.includes('mercado') || messageLower.includes('market')) return 'market'
  
  return 'general'
}

function getModelForAnalysisType(analysisType: string): string {
  switch (analysisType) {
    case 'cultural': return 'claude-3.5-sonnet'
    case 'financial': return 'gpt-4o'
    case 'market': return 'gemini-pro'
    case 'risk': return 'claude-3.5-sonnet'
    case 'comprehensive': return 'multi-model'
    default: return 'gpt-4o'
  }
}

function estimateTokensUsed(response: any): number {
  // Estimación simple de tokens usados
  const text = JSON.stringify(response)
  return Math.ceil(text.length / 4) // Aproximación: 4 caracteres por token
}
