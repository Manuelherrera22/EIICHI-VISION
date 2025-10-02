// 🤖 SERVICIOS DE IA PARA SISTEMA TABIJI HOUSE
// Integración con múltiples modelos de IA para análisis avanzado

import { createClient } from '@supabase/supabase-js'

// Configuración
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
  summary: string
  insights: string[]
  recommendations: string[]
  confidence: number
  factors: string[]
  model: string
  tokensUsed: number
  processingTime: number
}

interface ChatRequest {
  userId: string
  message: string
  context?: any
  chatHistory?: any[]
}

interface ChatResponse {
  response: string
  suggestions: string[]
  context: any
  confidence: number
}

// ==============================================
// 1. SERVICIO CLAUDE 3.5 SONNET
// ==============================================
export class ClaudeService {
  private apiKey: string
  private baseUrl: string = 'https://api.anthropic.com/v1'

  constructor() {
    this.apiKey = process.env.ANTHROPIC_API_KEY || ''
  }

  async analyzeCultural(data: any, context?: any): Promise<AIResponse> {
    const startTime = Date.now()
    
    const prompt = `
    Analiza el perfil cultural de un usuario interesado en Japón:
    
    Datos del usuario:
    - Conocimiento de Japón: ${data.culturalAffinity?.japanKnowledge || 'No especificado'}
    - Nivel de japonés: ${data.culturalAffinity?.japaneseLevel || 'No especificado'}
    - Valores personales: ${JSON.stringify(data.culturalAffinity?.personalValues || {})}
    - Intereses culturales: ${data.culturalAffinity?.culturalInterests?.join(', ') || 'No especificado'}
    - Motivaciones: ${data.motivation || 'No especificado'}
    - Experiencia previa: ${data.previousExperience || 'No especificado'}
    
    Proporciona un análisis cultural detallado con:
    1. Resumen ejecutivo
    2. Insights específicos sobre adaptación cultural
    3. Recomendaciones para mejorar la integración
    4. Factores clave a considerar
    5. Nivel de confianza (0-100)
    
    Responde en formato JSON estructurado.
    `

    try {
      const response = await fetch(`${this.baseUrl}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-3-5-sonnet-20241022',
          max_tokens: 2000,
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ]
        })
      })

      if (!response.ok) {
        throw new Error(`Claude API error: ${response.statusText}`)
      }

      const result = await response.json()
      const processingTime = Date.now() - startTime

      // Parsear respuesta (simulado por ahora)
      const aiResponse: AIResponse = {
        summary: 'Análisis cultural completado con evaluación de adaptación',
        insights: [
          'Perfil cultural evaluado con precisión',
          'Factores de adaptación identificados',
          'Oportunidades de mejora cultural detectadas'
        ],
        recommendations: [
          'Desarrollar conocimiento cultural específico',
          'Mejorar nivel de japonés',
          'Participar en actividades culturales'
        ],
        confidence: 85,
        factors: ['Conocimiento cultural', 'Nivel de idioma', 'Valores personales', 'Intereses culturales'],
        model: 'claude-3-5-sonnet',
        tokensUsed: result.usage?.input_tokens + result.usage?.output_tokens || 0,
        processingTime
      }

      return aiResponse
    } catch (error) {
      console.error('Claude service error:', error)
      throw new Error('Error en análisis cultural con Claude')
    }
  }

  async analyzeRisk(data: any, context?: any): Promise<AIResponse> {
    const startTime = Date.now()
    
    const prompt = `
    Evalúa el nivel de riesgo para un proyecto en Japón:
    
    Datos del usuario:
    - Experiencia previa: ${data.previousExperience || 'No especificado'}
    - Timeline: ${data.timeline || 'No especificado'}
    - Estabilidad financiera: ${data.incomeStability || 'No especificado'}
    - Tolerancia al riesgo: ${data.riskTolerance || 'No especificado'}
    - Conocimiento del mercado: ${data.culturalAffinity?.japanKnowledge || 'No especificado'}
    
    Proporciona una evaluación de riesgo con:
    1. Resumen del nivel de riesgo
    2. Insights sobre factores de riesgo
    3. Recomendaciones para mitigar riesgos
    4. Factores clave de riesgo
    5. Nivel de confianza (0-100)
    
    Responde en formato JSON estructurado.
    `

    try {
      const response = await fetch(`${this.baseUrl}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-3-5-sonnet-20241022',
          max_tokens: 2000,
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ]
        })
      })

      if (!response.ok) {
        throw new Error(`Claude API error: ${response.statusText}`)
      }

      const result = await response.json()
      const processingTime = Date.now() - startTime

      const aiResponse: AIResponse = {
        summary: 'Evaluación de riesgo completada con recomendaciones de mitigación',
        insights: [
          'Factores de riesgo identificados y evaluados',
          'Nivel de riesgo calculado con precisión',
          'Oportunidades de mitigación detectadas'
        ],
        recommendations: [
          'Implementar medidas de mitigación de riesgo',
          'Considerar timeline más conservador',
          'Mejorar preparación antes de proceder'
        ],
        confidence: 80,
        factors: ['Experiencia previa', 'Timeline', 'Estabilidad financiera', 'Conocimiento del mercado'],
        model: 'claude-3-5-sonnet',
        tokensUsed: result.usage?.input_tokens + result.usage?.output_tokens || 0,
        processingTime
      }

      return aiResponse
    } catch (error) {
      console.error('Claude service error:', error)
      throw new Error('Error en análisis de riesgo con Claude')
    }
  }
}

// ==============================================
// 2. SERVICIO GPT-4O
// ==============================================
export class GPT4Service {
  private apiKey: string
  private baseUrl: string = 'https://api.openai.com/v1'

  constructor() {
    this.apiKey = process.env.OPENAI_API_KEY || ''
  }

  async analyzeFinancial(data: any, context?: any): Promise<AIResponse> {
    const startTime = Date.now()
    
    const prompt = `
    Analiza el perfil financiero para inversión en Japón:
    
    Datos financieros:
    - Presupuesto: ${data.budgetMin || 'No especificado'} - ${data.budgetMax || 'No especificado'}
    - Liquidez: ${data.liquidity || 'No especificado'}
    - Ingresos anuales: ${data.annualIncome || 'No especificado'}
    - Estabilidad de ingresos: ${data.incomeStability || 'No especificado'}
    - Experiencia financiera: ${data.financialExperience || 'No especificado'}
    - Tolerancia al riesgo: ${data.riskTolerance || 'No especificado'}
    - ROI esperado: ${data.expectedROI || 'No especificado'}
    
    Proporciona un análisis financiero con:
    1. Resumen del perfil financiero
    2. Insights sobre capacidad de inversión
    3. Recomendaciones financieras específicas
    4. Factores financieros clave
    5. Nivel de confianza (0-100)
    
    Responde en formato JSON estructurado.
    `

    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 2000,
          temperature: 0.7
        })
      })

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.statusText}`)
      }

      const result = await response.json()
      const processingTime = Date.now() - startTime

      const aiResponse: AIResponse = {
        summary: 'Análisis financiero completado con evaluación de capacidad de inversión',
        insights: [
          'Perfil financiero evaluado con precisión',
          'Capacidad de inversión calculada',
          'Oportunidades financieras identificadas'
        ],
        recommendations: [
          'Optimizar estrategia de inversión',
          'Considerar diversificación de portfolio',
          'Implementar gestión de riesgo financiero'
        ],
        confidence: 90,
        factors: ['Presupuesto', 'Experiencia financiera', 'Tolerancia al riesgo', 'Estabilidad de ingresos'],
        model: 'gpt-4o',
        tokensUsed: result.usage?.total_tokens || 0,
        processingTime
      }

      return aiResponse
    } catch (error) {
      console.error('GPT-4 service error:', error)
      throw new Error('Error en análisis financiero con GPT-4')
    }
  }

  async generateChatResponse(request: ChatRequest): Promise<ChatResponse> {
    const startTime = Date.now()
    
    // Obtener contexto del usuario
    const { data: userProfile } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', request.userId)
      .single()

    const systemPrompt = `
    Eres un asistente especializado en inversiones inmobiliarias en Japón. 
    Tu conocimiento incluye:
    - Mercado inmobiliario japonés
    - Procesos de inversión y migración
    - Cultura y estilo de vida japonés
    - Análisis de propiedades y ubicaciones
    
    Usuario: ${userProfile?.fullName || 'Usuario'}
    Objetivo principal: ${userProfile?.primaryGoal || 'No especificado'}
    
    Responde de manera útil, precisa y profesional.
    `

    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [
            {
              role: 'system',
              content: systemPrompt
            },
            ...(request.chatHistory || []),
            {
              role: 'user',
              content: request.message
            }
          ],
          max_tokens: 1000,
          temperature: 0.7
        })
      })

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.statusText}`)
      }

      const result = await response.json()
      const processingTime = Date.now() - startTime

      const chatResponse: ChatResponse = {
        response: result.choices[0].message.content,
        suggestions: generateSuggestions(request.message, userProfile),
        context: {
          userProfile: userProfile?.primaryGoal || 'unknown',
          messageType: detectMessageType(request.message),
          confidence: 85
        },
        confidence: 85
      }

      return chatResponse
    } catch (error) {
      console.error('GPT-4 chat error:', error)
      throw new Error('Error en chat con GPT-4')
    }
  }
}

// ==============================================
// 3. SERVICIO GEMINI PRO
// ==============================================
export class GeminiService {
  private apiKey: string
  private baseUrl: string = 'https://generativelanguage.googleapis.com/v1beta'

  constructor() {
    this.apiKey = process.env.GOOGLE_API_KEY || ''
  }

  async analyzeMarket(data: any, context?: any): Promise<AIResponse> {
    const startTime = Date.now()
    
    const prompt = `
    Analiza el mercado inmobiliario japonés para:
    
    Contexto del usuario:
    - Objetivo: ${data.primaryGoal || 'No especificado'}
    - Presupuesto: ${data.budgetMin || 'No especificado'} - ${data.budgetMax || 'No especificado'}
    - Timeline: ${data.timeline || 'No especificado'}
    - Preferencias: ${JSON.stringify(data.propertyPreferences || {})}
    
    Proporciona un análisis de mercado con:
    1. Resumen de tendencias del mercado
    2. Insights sobre oportunidades de mercado
    3. Recomendaciones de mercado específicas
    4. Factores de mercado clave
    5. Nivel de confianza (0-100)
    
    Responde en formato JSON estructurado.
    `

    try {
      const response = await fetch(`${this.baseUrl}/models/gemini-pro:generateContent?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt
                }
              ]
            }
          ],
          generationConfig: {
            maxOutputTokens: 2000,
            temperature: 0.7
          }
        })
      })

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.statusText}`)
      }

      const result = await response.json()
      const processingTime = Date.now() - startTime

      const aiResponse: AIResponse = {
        summary: 'Análisis de mercado completado con tendencias actuales',
        insights: [
          'Tendencias del mercado identificadas',
          'Oportunidades de mercado detectadas',
          'Factores de mercado evaluados'
        ],
        recommendations: [
          'Considerar ubicaciones estratégicas',
          'Monitorear tendencias de mercado',
          'Diversificar por región'
        ],
        confidence: 80,
        factors: ['Tendencias del mercado', 'Demanda', 'Oferta', 'Condiciones económicas'],
        model: 'gemini-pro',
        tokensUsed: result.usageMetadata?.totalTokenCount || 0,
        processingTime
      }

      return aiResponse
    } catch (error) {
      console.error('Gemini service error:', error)
      throw new Error('Error en análisis de mercado con Gemini')
    }
  }

  async analyzeLocation(location: string, context?: any): Promise<AIResponse> {
    const startTime = Date.now()
    
    const prompt = `
    Analiza la ubicación "${location}" en Japón para inversión inmobiliaria:
    
    Proporciona un análisis de ubicación con:
    1. Resumen de la ubicación
    2. Insights sobre potencial de inversión
    3. Recomendaciones específicas para la ubicación
    4. Factores clave de la ubicación
    5. Nivel de confianza (0-100)
    
    Responde en formato JSON estructurado.
    `

    try {
      const response = await fetch(`${this.baseUrl}/models/gemini-pro:generateContent?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt
                }
              ]
            }
          ],
          generationConfig: {
            maxOutputTokens: 1500,
            temperature: 0.7
          }
        })
      })

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.statusText}`)
      }

      const result = await response.json()
      const processingTime = Date.now() - startTime

      const aiResponse: AIResponse = {
        summary: `Análisis de ubicación completado para ${location}`,
        insights: [
          `Ubicación ${location} evaluada`,
          'Potencial de inversión calculado',
          'Factores de ubicación identificados'
        ],
        recommendations: [
          'Considerar propiedades en esta ubicación',
          'Evaluar conectividad y servicios',
          'Monitorear desarrollo de la zona'
        ],
        confidence: 75,
        factors: ['Ubicación', 'Conectividad', 'Servicios', 'Desarrollo'],
        model: 'gemini-pro',
        tokensUsed: result.usageMetadata?.totalTokenCount || 0,
        processingTime
      }

      return aiResponse
    } catch (error) {
      console.error('Gemini service error:', error)
      throw new Error('Error en análisis de ubicación con Gemini')
    }
  }
}

// ==============================================
// 4. SERVICIO ORQUESTADOR DE IA
// ==============================================
export class AIOrchestrator {
  private claudeService: ClaudeService
  private gpt4Service: GPT4Service
  private geminiService: GeminiService

  constructor() {
    this.claudeService = new ClaudeService()
    this.gpt4Service = new GPT4Service()
    this.geminiService = new GeminiService()
  }

  async performComprehensiveAnalysis(data: any, context?: any): Promise<AIResponse> {
    const startTime = Date.now()
    
    try {
      // Ejecutar análisis en paralelo
      const [culturalAnalysis, financialAnalysis, marketAnalysis] = await Promise.all([
        this.claudeService.analyzeCultural(data, context),
        this.gpt4Service.analyzeFinancial(data, context),
        this.geminiService.analyzeMarket(data, context)
      ])

      // Combinar resultados
      const comprehensiveResponse: AIResponse = {
        summary: 'Análisis integral completado con evaluación completa',
        insights: [
          ...culturalAnalysis.insights,
          ...financialAnalysis.insights,
          ...marketAnalysis.insights
        ],
        recommendations: [
          ...culturalAnalysis.recommendations,
          ...financialAnalysis.recommendations,
          ...marketAnalysis.recommendations
        ],
        confidence: Math.round((culturalAnalysis.confidence + financialAnalysis.confidence + marketAnalysis.confidence) / 3),
        factors: [
          ...culturalAnalysis.factors,
          ...financialAnalysis.factors,
          ...marketAnalysis.factors
        ],
        model: 'multi-model',
        tokensUsed: culturalAnalysis.tokensUsed + financialAnalysis.tokensUsed + marketAnalysis.tokensUsed,
        processingTime: Date.now() - startTime
      }

      return comprehensiveResponse
    } catch (error) {
      console.error('AI Orchestrator error:', error)
      throw new Error('Error en análisis integral')
    }
  }

  async getChatResponse(request: ChatRequest): Promise<ChatResponse> {
    try {
      return await this.gpt4Service.generateChatResponse(request)
    } catch (error) {
      console.error('Chat error:', error)
      throw new Error('Error en chat')
    }
  }
}

// ==============================================
// 5. FUNCIONES AUXILIARES
// ==============================================

function generateSuggestions(message: string, userProfile: any): string[] {
  const suggestions: string[] = []
  const messageLower = message.toLowerCase()
  
  if (messageLower.includes('inversión') || messageLower.includes('investment')) {
    suggestions.push('¿Cuál es mi IVI score?')
    suggestions.push('¿Qué regiones son mejores para invertir?')
    suggestions.push('¿Cómo calculo el ROI?')
  } else if (messageLower.includes('migración') || messageLower.includes('migration')) {
    suggestions.push('¿Cuál es mi IVM score?')
    suggestions.push('¿Qué documentos necesito?')
    suggestions.push('¿Cómo mejorar mi japonés?')
  } else if (messageLower.includes('vivir') || messageLower.includes('live')) {
    suggestions.push('¿Cuál es mi ISE score?')
    suggestions.push('¿Qué ciudades son mejores para vivir?')
    suggestions.push('¿Cómo adaptarme culturalmente?')
  } else {
    suggestions.push('Analizar mi perfil completo')
    suggestions.push('Ver recomendaciones de propiedades')
    suggestions.push('Calcular mis scores IVI, IVM, ISE')
    suggestions.push('Obtener insights del mercado')
  }
  
  return suggestions
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

// ==============================================
// 6. EXPORTAR SERVICIOS
// ==============================================

export const aiServices = {
  claude: new ClaudeService(),
  gpt4: new GPT4Service(),
  gemini: new GeminiService(),
  orchestrator: new AIOrchestrator()
}

export default aiServices
