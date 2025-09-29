import { NextRequest, NextResponse } from 'next/server'
import { exchangeCodeForToken, getGoogleUserInfo } from '@/lib/google-auth'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')
    const error = searchParams.get('error')
    
    // Verificar si hay error
    if (error) {
      console.error('Error de Google OAuth:', error)
      return NextResponse.redirect('/auth?error=google_auth_failed')
    }
    
    // Verificar que tenemos el código
    if (!code) {
      return NextResponse.redirect('/auth?error=no_code')
    }
    
    // Intercambiar código por token
    const tokenData = await exchangeCodeForToken(code)
    
    if (tokenData.error) {
      console.error('Error al intercambiar código:', tokenData.error)
      return NextResponse.redirect('/auth?error=token_exchange_failed')
    }
    
    // Obtener información del usuario
    const userInfo = await getGoogleUserInfo(tokenData.access_token)
    
    // Crear o actualizar usuario en Supabase
    const { data: authData, error: authError } = await supabase.auth.signInWithIdToken({
      provider: 'google',
      token: tokenData.id_token,
      nonce: 'tabiji-house'
    })
    
    if (authError) {
      console.error('Error al crear usuario en Supabase:', authError)
      return NextResponse.redirect('/auth?error=supabase_auth_failed')
    }
    
    // Redirigir al dashboard
    return NextResponse.redirect('/dashboard')
    
  } catch (error) {
    console.error('Error en callback de Google:', error)
    return NextResponse.redirect('/auth?error=callback_failed')
  }
}

