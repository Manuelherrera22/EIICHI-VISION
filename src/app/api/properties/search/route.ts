import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Configuración de Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

// Tipos
interface Property {
  id: string
  title: string
  description: string
  price: number
  currency: string
  location: {
    address: string
    city: string
    prefecture: string
    coordinates: {
      lat: number
      lng: number
    }
  }
  propertyType: 'apartment' | 'house' | 'commercial' | 'land'
  size: {
    area: number
    rooms: number
    bathrooms: number
  }
  features: string[]
  images: string[]
  status: 'available' | 'sold' | 'pending'
  createdAt: string
  updatedAt: string
}

interface PropertySearchRequest {
  userId: string
  filters: {
    minPrice?: number
    maxPrice?: number
    propertyType?: string
    city?: string
    prefecture?: string
    minArea?: number
    maxArea?: number
    minRooms?: number
    features?: string[]
  }
  sortBy?: 'price' | 'area' | 'date' | 'relevance'
  sortOrder?: 'asc' | 'desc'
  limit?: number
  offset?: number
}

interface PropertyRecommendationRequest {
  userId: string
  userProfile: any
  preferences: {
    budget: { min: number; max: number }
    timeline: string
    goals: string[]
    lifestyle: string[]
  }
}

// GET /api/properties/search
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const propertyType = searchParams.get('propertyType')
    const city = searchParams.get('city')
    const prefecture = searchParams.get('prefecture')
    const sortBy = searchParams.get('sortBy') || 'relevance'
    const sortOrder = searchParams.get('sortOrder') || 'desc'
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')

    let query = supabase
      .from('properties')
      .select('*')
      .eq('status', 'available')

    // Aplicar filtros
    if (minPrice) query = query.gte('price', parseInt(minPrice))
    if (maxPrice) query = query.lte('price', parseInt(maxPrice))
    if (propertyType) query = query.eq('propertyType', propertyType)
    if (city) query = query.ilike('location->>city', `%${city}%`)
    if (prefecture) query = query.ilike('location->>prefecture', `%${prefecture}%`)

    // Aplicar ordenamiento
    switch (sortBy) {
      case 'price':
        query = query.order('price', { ascending: sortOrder === 'asc' })
        break
      case 'area':
        query = query.order('size->>area', { ascending: sortOrder === 'asc' })
        break
      case 'date':
        query = query.order('createdAt', { ascending: sortOrder === 'asc' })
        break
      default:
        query = query.order('createdAt', { ascending: false })
    }

    // Aplicar paginación
    query = query.range(offset, offset + limit - 1)

    const { data: properties, error } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Si hay userId, calcular relevancia personalizada
    if (userId) {
      const personalizedProperties = await calculateRelevance(userId, properties)
      return NextResponse.json({ 
        properties: personalizedProperties,
        total: properties.length,
        limit,
        offset
      })
    }

    return NextResponse.json({ 
      properties,
      total: properties.length,
      limit,
      offset
    })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/properties/search
export async function POST(request: NextRequest) {
  try {
    const { userId, filters, sortBy = 'relevance', sortOrder = 'desc', limit = 20, offset = 0 }: PropertySearchRequest = await request.json()
    
    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }

    let query = supabase
      .from('properties')
      .select('*')
      .eq('status', 'available')

    // Aplicar filtros
    if (filters.minPrice) query = query.gte('price', filters.minPrice)
    if (filters.maxPrice) query = query.lte('price', filters.maxPrice)
    if (filters.propertyType) query = query.eq('propertyType', filters.propertyType)
    if (filters.city) query = query.ilike('location->>city', `%${filters.city}%`)
    if (filters.prefecture) query = query.ilike('location->>prefecture', `%${filters.prefecture}%`)
    if (filters.minArea) query = query.gte('size->>area', filters.minArea)
    if (filters.maxArea) query = query.lte('size->>area', filters.maxArea)
    if (filters.minRooms) query = query.gte('size->>rooms', filters.minRooms)

    // Aplicar ordenamiento
    switch (sortBy) {
      case 'price':
        query = query.order('price', { ascending: sortOrder === 'asc' })
        break
      case 'area':
        query = query.order('size->>area', { ascending: sortOrder === 'asc' })
        break
      case 'date':
        query = query.order('createdAt', { ascending: sortOrder === 'asc' })
        break
      default:
        query = query.order('createdAt', { ascending: false })
    }

    // Aplicar paginación
    query = query.range(offset, offset + limit - 1)

    const { data: properties, error } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Calcular relevancia personalizada
    const personalizedProperties = await calculateRelevance(userId, properties)

    return NextResponse.json({ 
      properties: personalizedProperties,
      total: properties.length,
      limit,
      offset,
      filters
    })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/properties/recommendations
export async function POST(request: NextRequest) {
  try {
    const { userId, userProfile, preferences }: PropertyRecommendationRequest = await request.json()
    
    if (!userId || !userProfile || !preferences) {
      return NextResponse.json({ 
        error: 'Missing required fields: userId, userProfile, preferences' 
      }, { status: 400 })
    }

    // Obtener propiedades base
    const { data: allProperties, error } = await supabase
      .from('properties')
      .select('*')
      .eq('status', 'available')

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Generar recomendaciones personalizadas
    const recommendations = await generatePersonalizedRecommendations(
      userId, 
      userProfile, 
      preferences, 
      allProperties
    )

    // Guardar recomendaciones en la base de datos
    const { error: saveError } = await supabase
      .from('property_recommendations')
      .insert({
        userId,
        recommendations: recommendations.map(r => r.id),
        preferences,
        createdAt: new Date().toISOString()
      })

    if (saveError) {
      console.error('Error saving recommendations:', saveError)
    }

    return NextResponse.json({ 
      recommendations,
      total: recommendations.length,
      userProfile: {
        primaryGoal: userProfile.primaryGoal,
        budget: preferences.budget,
        timeline: preferences.timeline
      }
    })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// Funciones auxiliares
async function calculateRelevance(userId: string, properties: any[]): Promise<any[]> {
  try {
    // Obtener perfil del usuario
    const { data: userProfile } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (!userProfile) {
      return properties
    }

    // Calcular relevancia para cada propiedad
    const propertiesWithRelevance = properties.map(property => {
      let relevanceScore = 0
      
      // Factor presupuesto
      if (userProfile.budgetMin && userProfile.budgetMax) {
        if (property.price >= userProfile.budgetMin && property.price <= userProfile.budgetMax) {
          relevanceScore += 30
        } else if (property.price < userProfile.budgetMin) {
          relevanceScore += 10
        } else if (property.price > userProfile.budgetMax) {
          relevanceScore -= 20
        }
      }
      
      // Factor ubicación (preferencias del usuario)
      if (userProfile.preferredLanguage === 'ja' && property.location.prefecture === 'Tokyo') {
        relevanceScore += 20
      }
      
      // Factor tipo de propiedad
      if (userProfile.primaryGoal === 'invertir' && property.propertyType === 'apartment') {
        relevanceScore += 15
      } else if (userProfile.primaryGoal === 'vivir' && property.propertyType === 'house') {
        relevanceScore += 15
      }
      
      // Factor tamaño
      if (userProfile.familySituation?.size === 'familia-grande' && property.size.rooms >= 4) {
        relevanceScore += 10
      } else if (userProfile.familySituation?.size === 'solo' && property.size.rooms <= 2) {
        relevanceScore += 10
      }
      
      return {
        ...property,
        relevanceScore: Math.max(0, Math.min(100, relevanceScore))
      }
    })

    // Ordenar por relevancia
    return propertiesWithRelevance.sort((a, b) => b.relevanceScore - a.relevanceScore)
  } catch (error) {
    console.error('Error calculating relevance:', error)
    return properties
  }
}

async function generatePersonalizedRecommendations(
  userId: string, 
  userProfile: any, 
  preferences: any, 
  properties: any[]
): Promise<any[]> {
  const recommendations: any[] = []
  
  // Filtrar propiedades según preferencias
  const filteredProperties = properties.filter(property => {
    if (preferences.budget.min && property.price < preferences.budget.min) return false
    if (preferences.budget.max && property.price > preferences.budget.max) return false
    return true
  })
  
  // Calcular puntuación de recomendación para cada propiedad
  const scoredProperties = filteredProperties.map(property => {
    let score = 0
    
    // Puntuación basada en presupuesto
    if (preferences.budget.min && preferences.budget.max) {
      const budgetRange = preferences.budget.max - preferences.budget.min
      const pricePosition = (property.price - preferences.budget.min) / budgetRange
      if (pricePosition >= 0.3 && pricePosition <= 0.7) {
        score += 25 // Precio en rango óptimo
      } else if (pricePosition >= 0 && pricePosition <= 1) {
        score += 15 // Precio en rango aceptable
      }
    }
    
    // Puntuación basada en objetivos
    if (userProfile.primaryGoal === 'invertir') {
      if (property.propertyType === 'apartment') score += 20
      if (property.location.prefecture === 'Tokyo' || property.location.prefecture === 'Osaka') score += 15
    } else if (userProfile.primaryGoal === 'vivir') {
      if (property.propertyType === 'house') score += 20
      if (property.size.rooms >= 3) score += 15
    } else if (userProfile.primaryGoal === 'migrar') {
      if (property.location.prefecture === 'Tokyo') score += 20
      if (property.features.includes('near_station')) score += 15
    }
    
    // Puntuación basada en estilo de vida
    if (preferences.lifestyle.includes('urban') && property.location.city.includes('Tokyo')) {
      score += 15
    } else if (preferences.lifestyle.includes('quiet') && property.location.prefecture !== 'Tokyo') {
      score += 15
    }
    
    return {
      ...property,
      recommendationScore: score
    }
  })
  
  // Ordenar por puntuación y tomar las mejores
  const topRecommendations = scoredProperties
    .sort((a, b) => b.recommendationScore - a.recommendationScore)
    .slice(0, 10)
  
  return topRecommendations
}
