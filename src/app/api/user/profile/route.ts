import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Configuración de Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

// Tipos
interface UserProfile {
  id: string
  fullName: string
  email: string
  primaryGoal: 'invertir' | 'migrar' | 'vivir'
  age: number
  nationality: string
  timeline: string
  motivation: string
  budgetMin?: number
  budgetMax?: number
  intelligentScores?: {
    IVI: { score: number; factors: any }
    IVM: { score: number; factors: any }
    ISE: { score: number; factors: any }
    overallScore: number
    recommendation: string
  }
  createdAt: string
  updatedAt: string
}

interface AnalysisRequest {
  userId: string
  analysisType: 'ivi' | 'ivm' | 'ise' | 'complete'
  data: any
}

interface PredictionRequest {
  userId: string
  predictionType: 'market' | 'property' | 'success' | 'risk'
  timeframe: 'short' | 'medium' | 'long'
  data: any
}

// GET /api/user/profile
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    
    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }

    const { data: profile, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ profile })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/user/profile
export async function POST(request: NextRequest) {
  try {
    const profileData: Partial<UserProfile> = await request.json()
    
    const { data: profile, error } = await supabase
      .from('user_profiles')
      .upsert({
        ...profileData,
        updatedAt: new Date().toISOString()
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ profile })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT /api/user/profile
export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const updateData: Partial<UserProfile> = await request.json()
    
    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }

    const { data: profile, error } = await supabase
      .from('user_profiles')
      .update({
        ...updateData,
        updatedAt: new Date().toISOString()
      })
      .eq('id', userId)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ profile })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE /api/user/profile
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    
    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }

    const { error } = await supabase
      .from('user_profiles')
      .delete()
      .eq('id', userId)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ message: 'Profile deleted successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
