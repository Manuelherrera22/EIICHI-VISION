// 📊 SISTEMA DE ANÁLISIS AVANZADO PARA TABIJI HOUSE
// Análisis predictivo, scoring inteligente y recomendaciones personalizadas

import { createClient } from '@supabase/supabase-js'
import { calculateIntelligentScores } from '@/lib/arquitecto-types'

// Configuración
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

// Tipos
interface AnalysisData {
  userId: string
  userProfile: any
  context?: any
}

interface AnalysisResult {
  scores: {
    IVI: { score: number; factors: any; confidence: number }
    IVM: { score: number; factors: any; confidence: number }
    ISE: { score: number; factors: any; confidence: number }
    overallScore: number
    recommendation: string
  }
  insights: string[]
  predictions: any[]
  recommendations: any[]
  confidence: number
  timestamp: string
}

interface PredictionModel {
  type: 'market' | 'property' | 'success' | 'risk'
  timeframe: 'short' | 'medium' | 'long'
  data: any
  confidence: number
}

interface MarketAnalysis {
  region: string
  trend: 'rising' | 'stable' | 'declining'
  confidence: number
  factors: string[]
  predictions: any[]
}

// ==============================================
// 1. SERVICIO DE ANÁLISIS INTELIGENTE
// ==============================================
export class IntelligentAnalysisService {
  
  async performCompleteAnalysis(data: AnalysisData): Promise<AnalysisResult> {
    try {
      // 1. Calcular scores inteligentes
      const scores = calculateIntelligentScores(data.userProfile) || {
        IVI: { score: 0, factors: {} },
        IVM: { score: 0, factors: {} },
        ISE: { score: 0, factors: {} },
        overallScore: 0,
        recommendation: 'moderada' as const
      }
      
      // 2. Generar insights
      const insights = await this.generateInsights(data.userProfile, scores)
      
      // 3. Generar predicciones
      const predictions = await this.generatePredictions(data.userProfile, scores)
      
      // 4. Generar recomendaciones
      const recommendations = await this.generateRecommendations(data.userProfile, scores)
      
      // 5. Calcular confianza general
      const confidence = this.calculateOverallConfidence(scores, insights, predictions)
      
      const result: AnalysisResult = {
        scores: {
          IVI: { 
            score: scores.IVI?.score || 0, 
            factors: scores.IVI?.factors || {}, 
            confidence: this.calculateScoreConfidence(scores.IVI) 
          },
          IVM: { 
            score: scores.IVM?.score || 0, 
            factors: scores.IVM?.factors || {}, 
            confidence: this.calculateScoreConfidence(scores.IVM) 
          },
          ISE: { 
            score: scores.ISE?.score || 0, 
            factors: scores.ISE?.factors || {}, 
            confidence: this.calculateScoreConfidence(scores.ISE) 
          },
          overallScore: scores.overallScore || 0,
          recommendation: scores.recommendation || 'moderada'
        },
        insights,
        predictions,
        recommendations,
        confidence,
        timestamp: new Date().toISOString()
      }
      
      // Guardar análisis en la base de datos
      await this.saveAnalysisResult(data.userId, result)
      
      return result
    } catch (error) {
      console.error('Analysis error:', error)
      throw new Error('Error en análisis inteligente')
    }
  }

  private async generateInsights(userProfile: any, scores: any): Promise<string[]> {
    const insights: string[] = []
    
    // Insights basados en IVI
    if (scores.IVI.score >= 80) {
      insights.push('Excelente perfil para inversión inmobiliaria en Japón')
      insights.push('Alto potencial de ROI basado en tu perfil financiero')
    } else if (scores.IVI.score >= 60) {
      insights.push('Buen perfil para inversión con algunas áreas de mejora')
      insights.push('Considera diversificar tu estrategia de inversión')
    } else {
      insights.push('Perfil de inversión requiere fortalecimiento')
      insights.push('Recomendamos mejorar experiencia financiera antes de invertir')
    }
    
    // Insights basados en IVM
    if (scores.IVM.score >= 80) {
      insights.push('Alta probabilidad de éxito migratorio')
      insights.push('Perfil cultural muy compatible con Japón')
    } else if (scores.IVM.score >= 60) {
      insights.push('Buena base para migración con preparación adicional')
      insights.push('Considera mejorar nivel de japonés')
    } else {
      insights.push('Migración requiere preparación significativa')
      insights.push('Enfócate en desarrollo cultural y lingüístico')
    }
    
    // Insights basados en ISE
    if (scores.ISE.score >= 80) {
      insights.push('Excelente alineación con estilo de vida japonés')
      insights.push('Alta probabilidad de satisfacción personal')
    } else if (scores.ISE.score >= 60) {
      insights.push('Buena compatibilidad con cultura japonesa')
      insights.push('Algunas áreas pueden requerir adaptación')
    } else {
      insights.push('Adaptación cultural requerirá esfuerzo significativo')
      insights.push('Considera experiencias previas en Japón')
    }
    
    // Insights específicos por objetivo
    if (userProfile.primaryGoal === 'invertir') {
      insights.push('Enfócate en propiedades con potencial de renta alta')
      insights.push('Considera ubicaciones estratégicas con crecimiento sostenido')
    } else if (userProfile.primaryGoal === 'migrar') {
      insights.push('Prioriza ubicaciones con comunidades internacionales')
      insights.push('Considera el costo de vida en diferentes regiones')
    } else if (userProfile.primaryGoal === 'vivir') {
      insights.push('Busca regiones que se alineen con tu estilo de vida')
      insights.push('Considera el clima y ambiente de cada región')
    }
    
    return insights
  }

  private async generatePredictions(userProfile: any, scores: any): Promise<any[]> {
    const predictions: any[] = []
    
    // Predicción de éxito general
    const successProbability = this.calculateSuccessProbability(scores)
    predictions.push({
      type: 'success',
      timeframe: '12-months',
      value: successProbability,
      confidence: 85,
      factors: ['Perfil del usuario', 'Scores calculados', 'Condiciones del mercado'],
      explanation: `Probabilidad de éxito del ${successProbability}% basada en tu perfil completo`
    })
    
    // Predicción de mercado
    const marketPrediction = await this.predictMarketTrends(userProfile)
    predictions.push({
      type: 'market',
      timeframe: '6-months',
      value: marketPrediction.trend,
      confidence: marketPrediction.confidence,
      factors: marketPrediction.factors,
      explanation: `Tendencia del mercado: ${marketPrediction.trend} con ${marketPrediction.confidence}% de confianza`
    })
    
    // Predicción de riesgo
    const riskLevel = this.calculateRiskLevel(userProfile, scores)
    predictions.push({
      type: 'risk',
      timeframe: 'immediate',
      value: riskLevel,
      confidence: 80,
      factors: ['Experiencia previa', 'Preparación', 'Estabilidad financiera'],
      explanation: `Nivel de riesgo: ${riskLevel}% - ${this.getRiskDescription(riskLevel)}`
    })
    
    return predictions
  }

  private async generateRecommendations(userProfile: any, scores: any): Promise<any[]> {
    const recommendations: any[] = []
    
    // Recomendaciones basadas en scores
    if (scores.overallScore >= 85) {
      recommendations.push({
        type: 'strategy',
        priority: 'high',
        title: 'Procede con confianza',
        description: 'Tu perfil es excelente. Considera inversiones de mayor escala',
        timeframe: 'immediate',
        effort: 'low'
      })
    } else if (scores.overallScore >= 70) {
      recommendations.push({
        type: 'strategy',
        priority: 'high',
        title: 'Perfil sólido con oportunidades',
        description: 'Inicia con inversiones moderadas y mejora áreas identificadas',
        timeframe: '3-months',
        effort: 'medium'
      })
    } else if (scores.overallScore >= 50) {
      recommendations.push({
        type: 'preparation',
        priority: 'high',
        title: 'Requiere preparación adicional',
        description: 'Enfócate en preparación antes de proceder con cualquier acción',
        timeframe: '6-months',
        effort: 'high'
      })
    } else {
      recommendations.push({
        type: 'preparation',
        priority: 'high',
        title: 'Desarrollo significativo requerido',
        description: 'Considera consultoría especializada y desarrollo personal',
        timeframe: '12-months',
        effort: 'high'
      })
    }
    
    // Recomendaciones específicas por objetivo
    if (userProfile.primaryGoal === 'invertir') {
      recommendations.push({
        type: 'property',
        priority: 'medium',
        title: 'Estrategia de diversificación',
        description: 'Distribuye inversiones entre diferentes regiones y tipos de propiedad',
        timeframe: '6-months',
        effort: 'medium'
      })
    } else if (userProfile.primaryGoal === 'migrar') {
      recommendations.push({
        type: 'preparation',
        priority: 'high',
        title: 'Plan de migración gradual',
        description: 'Inicia con visitas frecuentes y estadías temporales',
        timeframe: '12-months',
        effort: 'high'
      })
    }
    
    return recommendations
  }

  private calculateSuccessProbability(scores: any): number {
    let probability = 50 // Base
    
    // Ajustar por scores individuales
    if (scores.IVI.score >= 80) probability += 20
    else if (scores.IVI.score >= 60) probability += 10
    
    if (scores.IVM.score >= 80) probability += 15
    else if (scores.IVM.score >= 60) probability += 8
    
    if (scores.ISE.score >= 80) probability += 15
    else if (scores.ISE.score >= 60) probability += 8
    
    return Math.min(probability, 95)
  }

  private async predictMarketTrends(userProfile: any): Promise<MarketAnalysis> {
    // Obtener datos de mercado recientes
    const { data: marketData } = await supabase
      .from('market_data')
      .select('*')
      .gte('lastUpdated', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())
      .order('lastUpdated', { ascending: false })
      .limit(10)
    
    if (!marketData || marketData.length === 0) {
      return {
        region: 'all',
        trend: 'stable',
        confidence: 50,
        factors: ['Datos limitados'],
        predictions: []
      }
    }
    
    const avgTrend = marketData.reduce((sum, data) => sum + (data.priceChangePercent || 0), 0) / marketData.length
    const risingMarkets = marketData.filter(d => d.priceChangePercent > 0).length
    const totalMarkets = marketData.length
    
    let trend: 'rising' | 'stable' | 'declining' = 'stable'
    let confidence = 60
    
    if (avgTrend > 2 && risingMarkets > totalMarkets * 0.7) {
      trend = 'rising'
      confidence = 80
    } else if (avgTrend < -1 && risingMarkets < totalMarkets * 0.3) {
      trend = 'declining'
      confidence = 75
    }
    
    return {
      region: 'all',
      trend,
      confidence,
      factors: ['Tendencias del mercado', 'Demanda', 'Oferta', 'Condiciones económicas'],
      predictions: marketData.slice(0, 3).map(data => ({
        region: data.region,
        prediction: trend,
        confidence: data.confidence
      }))
    }
  }

  private calculateRiskLevel(userProfile: any, scores: any): number {
    let risk = 50 // Base
    
    // Ajustar por experiencia
    if (userProfile.previousExperience === 'ninguna') risk += 20
    else if (userProfile.previousExperience === 'extensa') risk -= 15
    
    // Ajustar por conocimiento cultural
    if (userProfile.culturalAffinity?.japanKnowledge === 'ninguno') risk += 15
    else if (userProfile.culturalAffinity?.japanKnowledge === 'avanzado') risk -= 10
    
    // Ajustar por timeline
    if (userProfile.timeline === 'inmediato') risk += 10
    else if (userProfile.timeline === '1-ano') risk -= 5
    
    return Math.max(10, Math.min(90, risk))
  }

  private getRiskDescription(riskLevel: number): string {
    if (riskLevel < 30) return 'Bajo riesgo'
    if (riskLevel < 60) return 'Riesgo moderado'
    return 'Alto riesgo'
  }

  private calculateScoreConfidence(score: any): number {
    let confidence = 70 // Base
    
    // Ajustar por completitud de datos
    const factors = Object.keys(score.factors || {})
    confidence += factors.length * 5
    
    // Ajustar por valores de factores
    const factorValues = Object.values(score.factors || {})
    const avgFactorValue = factorValues.reduce((sum: number, val: any) => sum + (val || 0), 0) / factorValues.length
    confidence += avgFactorValue * 2
    
    return Math.min(confidence, 95)
  }

  private calculateOverallConfidence(scores: any, insights: string[], predictions: any[]): number {
    let confidence = 60 // Base
    
    // Ajustar por scores
    confidence += (scores.IVI.score + scores.IVM.score + scores.ISE.score) / 3 * 0.3
    
    // Ajustar por cantidad de insights
    confidence += Math.min(insights.length * 2, 20)
    
    // Ajustar por cantidad de predicciones
    confidence += Math.min(predictions.length * 3, 15)
    
    return Math.min(confidence, 95)
  }

  private async saveAnalysisResult(userId: string, result: AnalysisResult): Promise<void> {
    try {
      await supabase
        .from('analysis_results')
        .insert({
          userId,
          analysisType: 'comprehensive',
          scores: result.scores,
          insights: result.insights,
          recommendations: result.recommendations,
          confidence: result.confidence,
          createdAt: result.timestamp
        })
    } catch (error) {
      console.error('Error saving analysis result:', error)
    }
  }
}

// ==============================================
// 2. SERVICIO DE ANÁLISIS DE MERCADO
// ==============================================
export class MarketAnalysisService {
  
  async analyzeMarketRegion(region: string, propertyType: string = 'all'): Promise<MarketAnalysis> {
    try {
      // Obtener datos de mercado para la región
      let query = supabase
        .from('market_data')
        .select('*')
        .eq('region', region)
        .gte('lastUpdated', new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString())
        .order('lastUpdated', { ascending: false })
      
      if (propertyType !== 'all') {
        query = query.eq('propertyType', propertyType)
      }
      
      const { data: marketData, error } = await query
      
      if (error) {
        throw new Error(`Error fetching market data: ${error.message}`)
      }
      
      if (!marketData || marketData.length === 0) {
        return {
          region,
          trend: 'stable',
          confidence: 50,
          factors: ['Datos limitados'],
          predictions: []
        }
      }
      
      // Analizar tendencias
      const analysis = this.analyzeMarketTrends(marketData)
      
      // Generar predicciones
      const predictions = this.generateMarketPredictions(marketData, analysis)
      
      return {
        region,
        trend: analysis.trend,
        confidence: analysis.confidence,
        factors: analysis.factors,
        predictions
      }
    } catch (error) {
      console.error('Market analysis error:', error)
      throw new Error('Error en análisis de mercado')
    }
  }

  private analyzeMarketTrends(marketData: any[]): any {
    const avgPriceChange = marketData.reduce((sum, data) => sum + (data.priceChangePercent || 0), 0) / marketData.length
    const avgVolume = marketData.reduce((sum, data) => sum + (data.volume || 0), 0) / marketData.length
    const avgConfidence = marketData.reduce((sum, data) => sum + (data.confidence || 0), 0) / marketData.length
    
    let trend: 'rising' | 'stable' | 'declining' = 'stable'
    let confidence = Math.round(avgConfidence)
    
    if (avgPriceChange > 2) {
      trend = 'rising'
      confidence += 10
    } else if (avgPriceChange < -1) {
      trend = 'declining'
      confidence -= 5
    }
    
    const factors = [
      `Cambio promedio de precios: ${avgPriceChange.toFixed(2)}%`,
      `Volumen promedio: ${Math.round(avgVolume)}`,
      `Confianza promedio: ${Math.round(avgConfidence)}%`
    ]
    
    return { trend, confidence, factors }
  }

  private generateMarketPredictions(marketData: any[], analysis: any): any[] {
    const predictions: any[] = []
    
    // Predicción a corto plazo (3 meses)
    predictions.push({
      timeframe: '3-months',
      prediction: analysis.trend,
      confidence: analysis.confidence,
      factors: analysis.factors,
      explanation: `Tendencia esperada: ${analysis.trend} en los próximos 3 meses`
    })
    
    // Predicción a medio plazo (6 meses)
    const mediumTermConfidence = Math.max(analysis.confidence - 10, 50)
    predictions.push({
      timeframe: '6-months',
      prediction: analysis.trend,
      confidence: mediumTermConfidence,
      factors: analysis.factors,
      explanation: `Tendencia esperada: ${analysis.trend} en los próximos 6 meses`
    })
    
    return predictions
  }
}

// ==============================================
// 3. SERVICIO DE ANÁLISIS PREDICTIVO
// ==============================================
export class PredictiveAnalysisService {
  
  async generatePredictions(userProfile: any, context?: any): Promise<PredictionModel[]> {
    const predictions: PredictionModel[] = []
    
    try {
      // Predicción de éxito de inversión
      const investmentSuccess = await this.predictInvestmentSuccess(userProfile)
      predictions.push(investmentSuccess)
      
      // Predicción de adaptación cultural
      const culturalAdaptation = await this.predictCulturalAdaptation(userProfile)
      predictions.push(culturalAdaptation)
      
      // Predicción de satisfacción
      const satisfaction = await this.predictSatisfaction(userProfile)
      predictions.push(satisfaction)
      
      // Predicción de riesgo
      const risk = await this.predictRisk(userProfile)
      predictions.push(risk)
      
      return predictions
    } catch (error) {
      console.error('Predictive analysis error:', error)
      throw new Error('Error en análisis predictivo')
    }
  }

  private async predictInvestmentSuccess(userProfile: any): Promise<PredictionModel> {
    let successProbability = 50 // Base
    
    // Ajustar por experiencia financiera
    if (userProfile.financialExperience === 'avanzada') successProbability += 25
    else if (userProfile.financialExperience === 'intermedia') successProbability += 15
    else if (userProfile.financialExperience === 'basica') successProbability += 5
    
    // Ajustar por presupuesto
    if (userProfile.budgetMax && userProfile.budgetMax > 500000) successProbability += 15
    else if (userProfile.budgetMax && userProfile.budgetMax > 200000) successProbability += 10
    
    // Ajustar por tolerancia al riesgo
    if (userProfile.riskTolerance === 'agresivo') successProbability += 10
    else if (userProfile.riskTolerance === 'conservador') successProbability -= 5
    
    return {
      type: 'success',
      timeframe: 'medium',
      data: {
        probability: Math.min(successProbability, 95),
        factors: ['Experiencia financiera', 'Presupuesto', 'Tolerancia al riesgo'],
        explanation: `Probabilidad de éxito en inversión: ${Math.min(successProbability, 95)}%`
      },
      confidence: 80
    }
  }

  private async predictCulturalAdaptation(userProfile: any): Promise<PredictionModel> {
    let adaptationScore = 50 // Base
    
    // Ajustar por conocimiento cultural
    if (userProfile.culturalAffinity?.japanKnowledge === 'avanzado') adaptationScore += 25
    else if (userProfile.culturalAffinity?.japanKnowledge === 'intermedio') adaptationScore += 15
    else if (userProfile.culturalAffinity?.japanKnowledge === 'basico') adaptationScore += 5
    
    // Ajustar por nivel de japonés
    if (userProfile.culturalAffinity?.japaneseLevel === 'avanzado') adaptationScore += 20
    else if (userProfile.culturalAffinity?.japaneseLevel === 'intermedio') adaptationScore += 10
    else if (userProfile.culturalAffinity?.japaneseLevel === 'principiante') adaptationScore += 5
    
    // Ajustar por valores personales
    const values = userProfile.culturalAffinity?.personalValues || {}
    const harmony = values.harmony || 5
    const respect = values.respect || 5
    const discipline = values.discipline || 5
    
    adaptationScore += (harmony + respect + discipline) / 3 * 2
    
    return {
      type: 'success',
      timeframe: 'long',
      data: {
        score: Math.min(adaptationScore, 95),
        factors: ['Conocimiento cultural', 'Nivel de japonés', 'Valores personales'],
        explanation: `Puntuación de adaptación cultural: ${Math.min(adaptationScore, 95)}%`
      },
      confidence: 85
    }
  }

  private async predictSatisfaction(userProfile: any): Promise<PredictionModel> {
    let satisfactionScore = 50 // Base
    
    // Ajustar por objetivo principal
    if (userProfile.primaryGoal === 'vivir') satisfactionScore += 20
    else if (userProfile.primaryGoal === 'migrar') satisfactionScore += 15
    else if (userProfile.primaryGoal === 'invertir') satisfactionScore += 10
    
    // Ajustar por intereses culturales
    const interests = userProfile.culturalAffinity?.culturalInterests || []
    satisfactionScore += interests.length * 5
    
    // Ajustar por expectativas realistas
    if (userProfile.motivationExpectations?.realisticExpectations) satisfactionScore += 15
    
    return {
      type: 'success',
      timeframe: 'long',
      data: {
        score: Math.min(satisfactionScore, 95),
        factors: ['Objetivo principal', 'Intereses culturales', 'Expectativas realistas'],
        explanation: `Puntuación de satisfacción esperada: ${Math.min(satisfactionScore, 95)}%`
      },
      confidence: 75
    }
  }

  private async predictRisk(userProfile: any): Promise<PredictionModel> {
    let riskLevel = 50 // Base
    
    // Ajustar por experiencia previa
    if (userProfile.previousExperience === 'ninguna') riskLevel += 20
    else if (userProfile.previousExperience === 'extensa') riskLevel -= 15
    
    // Ajustar por timeline
    if (userProfile.timeline === 'inmediato') riskLevel += 15
    else if (userProfile.timeline === '1-ano') riskLevel -= 5
    
    // Ajustar por estabilidad financiera
    if (userProfile.incomeStability === 'inestable') riskLevel += 10
    else if (userProfile.incomeStability === 'estable') riskLevel -= 10
    
    return {
      type: 'risk',
      timeframe: 'short',
      data: {
        level: Math.max(10, Math.min(riskLevel, 90)),
        factors: ['Experiencia previa', 'Timeline', 'Estabilidad financiera'],
        explanation: `Nivel de riesgo: ${Math.max(10, Math.min(riskLevel, 90))}%`
      },
      confidence: 80
    }
  }
}

// ==============================================
// 4. SERVICIO PRINCIPAL DE ANÁLISIS
// ==============================================
export class AnalysisService {
  private intelligentAnalysis: IntelligentAnalysisService
  private marketAnalysis: MarketAnalysisService
  private predictiveAnalysis: PredictiveAnalysisService

  constructor() {
    this.intelligentAnalysis = new IntelligentAnalysisService()
    this.marketAnalysis = new MarketAnalysisService()
    this.predictiveAnalysis = new PredictiveAnalysisService()
  }

  async performCompleteAnalysis(data: AnalysisData): Promise<AnalysisResult> {
    return await this.intelligentAnalysis.performCompleteAnalysis(data)
  }

  async analyzeMarket(region: string, propertyType?: string): Promise<MarketAnalysis> {
    return await this.marketAnalysis.analyzeMarketRegion(region, propertyType)
  }

  async generatePredictions(userProfile: any, context?: any): Promise<PredictionModel[]> {
    return await this.predictiveAnalysis.generatePredictions(userProfile, context)
  }
}

// ==============================================
// 5. EXPORTAR SERVICIOS
// ==============================================

export const analysisService = new AnalysisService()

export default analysisService
