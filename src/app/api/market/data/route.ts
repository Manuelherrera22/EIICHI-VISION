import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Configuración de Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

// Tipos
interface MarketData {
  id: string
  region: string
  prefecture: string
  city: string
  propertyType: string
  averagePrice: number
  pricePerSqm: number
  priceChange: number
  priceChangePercent: number
  volume: number
  volumeChange: number
  daysOnMarket: number
  marketTrend: 'rising' | 'stable' | 'declining'
  confidence: number
  lastUpdated: string
}

interface MarketAnalysisRequest {
  userId: string
  region?: string
  prefecture?: string
  propertyType?: string
  timeframe?: '1m' | '3m' | '6m' | '1y' | '2y'
}

interface MarketInsight {
  id: string
  region: string
  insight: string
  confidence: number
  impact: 'high' | 'medium' | 'low'
  timeframe: string
  createdAt: string
}

// GET /api/market/data
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const region = searchParams.get('region')
    const prefecture = searchParams.get('prefecture')
    const propertyType = searchParams.get('propertyType')
    const timeframe = searchParams.get('timeframe') || '3m'

    let query = supabase
      .from('market_data')
      .select('*')
      .gte('lastUpdated', getTimeframeDate(timeframe))

    // Aplicar filtros
    if (region) query = query.eq('region', region)
    if (prefecture) query = query.eq('prefecture', prefecture)
    if (propertyType) query = query.eq('propertyType', propertyType)

    const { data: marketData, error } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Calcular estadísticas agregadas
    const statistics = calculateMarketStatistics(marketData)

    return NextResponse.json({ 
      marketData,
      statistics,
      timeframe,
      lastUpdated: new Date().toISOString()
    })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/market/analysis
export async function POST(request: NextRequest) {
  try {
    const { userId, region, prefecture, propertyType, timeframe = '3m' }: MarketAnalysisRequest = await request.json()
    
    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }

    // Obtener datos de mercado
    let query = supabase
      .from('market_data')
      .select('*')
      .gte('lastUpdated', getTimeframeDate(timeframe))

    if (region) query = query.eq('region', region)
    if (prefecture) query = query.eq('prefecture', prefecture)
    if (propertyType) query = query.eq('propertyType', propertyType)

    const { data: marketData, error } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Generar análisis personalizado
    const analysis = await generateMarketAnalysis(userId, marketData, timeframe)
    
    // Generar insights
    const insights = generateMarketInsights(marketData, analysis)
    
    // Generar predicciones
    const predictions = generateMarketPredictions(marketData, analysis)

    // Guardar análisis en la base de datos
    const { error: saveError } = await supabase
      .from('market_analyses')
      .insert({
        userId,
        region: region || 'all',
        prefecture: prefecture || 'all',
        propertyType: propertyType || 'all',
        timeframe,
        analysis,
        insights,
        predictions,
        createdAt: new Date().toISOString()
      })

    if (saveError) {
      console.error('Error saving market analysis:', saveError)
    }

    return NextResponse.json({ 
      analysis,
      insights,
      predictions,
      marketData: marketData.slice(0, 10), // Top 10 resultados
      timeframe
    })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}


// Funciones auxiliares
function getTimeframeDate(timeframe: string): string {
  const now = new Date()
  let days = 30 // Default 1 month
  
  switch (timeframe) {
    case '1m': days = 30; break
    case '3m': days = 90; break
    case '6m': days = 180; break
    case '1y': days = 365; break
    case '2y': days = 730; break
  }
  
  const pastDate = new Date(now.getTime() - (days * 24 * 60 * 60 * 1000))
  return pastDate.toISOString()
}

function calculateMarketStatistics(marketData: MarketData[]): any {
  if (marketData.length === 0) {
    return {
      totalRegions: 0,
      averagePrice: 0,
      totalVolume: 0,
      overallTrend: 'stable',
      confidence: 0
    }
  }

  const totalRegions = new Set(marketData.map(d => d.region)).size
  const averagePrice = marketData.reduce((sum, d) => sum + d.averagePrice, 0) / marketData.length
  const totalVolume = marketData.reduce((sum, d) => sum + d.volume, 0)
  const averageConfidence = marketData.reduce((sum, d) => sum + d.confidence, 0) / marketData.length
  
  // Calcular tendencia general
  const risingMarkets = marketData.filter(d => d.marketTrend === 'rising').length
  const decliningMarkets = marketData.filter(d => d.marketTrend === 'declining').length
  
  let overallTrend = 'stable'
  if (risingMarkets > decliningMarkets * 1.5) {
    overallTrend = 'rising'
  } else if (decliningMarkets > risingMarkets * 1.5) {
    overallTrend = 'declining'
  }

  return {
    totalRegions,
    averagePrice: Math.round(averagePrice),
    totalVolume,
    overallTrend,
    confidence: Math.round(averageConfidence),
    marketCount: marketData.length
  }
}

async function generateMarketAnalysis(userId: string, marketData: MarketData[], timeframe: string): Promise<any> {
  // Obtener perfil del usuario para personalización
  const { data: userProfile } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', userId)
    .single()

  const analysis = {
    summary: '',
    keyFindings: [] as string[],
    opportunities: [] as string[],
    risks: [] as string[],
    recommendations: [] as string[],
    confidence: 0
  }

  if (marketData.length === 0) {
    analysis.summary = 'No hay datos suficientes para el análisis en el período seleccionado'
    analysis.confidence = 0
    return analysis
  }

  // Análisis general del mercado
  const statistics = calculateMarketStatistics(marketData)
  
  if (statistics.overallTrend === 'rising') {
    analysis.summary = 'El mercado inmobiliario japonés muestra tendencia alcista'
    analysis.keyFindings.push('Precios en aumento en la mayoría de regiones')
    analysis.opportunities.push('Momento favorable para inversión')
  } else if (statistics.overallTrend === 'declining') {
    analysis.summary = 'El mercado inmobiliario japonés muestra tendencia bajista'
    analysis.keyFindings.push('Precios en descenso en varias regiones')
    analysis.risks.push('Posible corrección del mercado')
  } else {
    analysis.summary = 'El mercado inmobiliario japonés se mantiene estable'
    analysis.keyFindings.push('Precios estables con variaciones regionales')
    analysis.opportunities.push('Estabilidad permite planificación a largo plazo')
  }

  // Análisis personalizado basado en perfil del usuario
  if (userProfile) {
    if (userProfile.primaryGoal === 'invertir') {
      analysis.recommendations.push('Enfócate en regiones con mayor potencial de crecimiento')
      analysis.recommendations.push('Considera propiedades con buen potencial de renta')
    } else if (userProfile.primaryGoal === 'migrar') {
      analysis.recommendations.push('Prioriza ubicaciones con buena conectividad')
      analysis.recommendations.push('Considera el costo de vida en diferentes regiones')
    } else if (userProfile.primaryGoal === 'vivir') {
      analysis.recommendations.push('Busca regiones que se alineen con tu estilo de vida')
      analysis.recommendations.push('Considera el clima y ambiente de cada región')
    }
  }

  // Calcular confianza del análisis
  analysis.confidence = Math.min(95, statistics.confidence + (marketData.length * 2))

  return analysis
}

function generateMarketInsights(marketData: MarketData[], analysis: any): string[] {
  const insights: string[] = []
  
  // Insights basados en datos
  if (marketData.length > 0) {
    const topPerformingRegion = marketData.reduce((max, current) => 
      current.priceChangePercent > max.priceChangePercent ? current : max
    )
    
    insights.push(`${topPerformingRegion.region} muestra el mayor crecimiento con ${topPerformingRegion.priceChangePercent}%`)
    
    const mostActiveRegion = marketData.reduce((max, current) => 
      current.volume > max.volume ? current : max
    )
    
    insights.push(`${mostActiveRegion.region} tiene la mayor actividad comercial`)
  }
  
  // Insights basados en análisis
  if (analysis.overallTrend === 'rising') {
    insights.push('Tendencia alcista sostenida en el mercado japonés')
    insights.push('Demanda internacional en aumento')
  }
  
  return insights
}

function generateMarketPredictions(marketData: MarketData[], analysis: any): any[] {
  const predictions: any[] = []
  
  // Predicciones basadas en tendencias actuales
  marketData.forEach(data => {
    if (data.marketTrend === 'rising' && data.confidence > 70) {
      predictions.push({
        region: data.region,
        prediction: 'Continuará el crecimiento de precios',
        confidence: data.confidence,
        timeframe: '6-12 meses',
        factors: ['Demanda sostenida', 'Oferta limitada', 'Condiciones económicas favorables']
      })
    }
  })
  
  return predictions
}
