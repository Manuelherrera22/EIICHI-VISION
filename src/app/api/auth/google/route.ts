import { NextRequest, NextResponse } from 'next/server'
import { getGoogleAuthUrl } from '@/lib/google-auth'

export async function GET(request: NextRequest) {
  try {
    // Generar estado para seguridad
    const state = Math.random().toString(36).substring(7)
    
    // Crear URL de autorización de Google
    const authUrl = getGoogleAuthUrl(state)
    
    // Redirigir a Google OAuth
    return NextResponse.redirect(authUrl)
  } catch (error) {
    console.error('Error en Google Auth:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

