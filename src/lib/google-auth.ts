// Configuración de Google OAuth para Tabiji House
export const GOOGLE_AUTH_CONFIG = {
  clientId: process.env.GOOGLE_CLIENT_ID || '40911110211-g2adems1p79qt9m9umd90hono5as8d3r.apps.googleusercontent.com',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || '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',
  redirectUri: process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3000/auth/callback',
  
  // URLs de autorización
  authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenUrl: 'https://oauth2.googleapis.com/token',
  userInfoUrl: 'https://www.googleapis.com/oauth2/v2/userinfo',
  
  // Scopes necesarios
  scopes: [
    'openid',
    'email',
    'profile'
  ].join(' ')
}

// Función para generar URL de autorización
export function getGoogleAuthUrl(state?: string): string {
  const params = new URLSearchParams({
    client_id: GOOGLE_AUTH_CONFIG.clientId,
    redirect_uri: GOOGLE_AUTH_CONFIG.redirectUri,
    response_type: 'code',
    scope: GOOGLE_AUTH_CONFIG.scopes,
    access_type: 'offline',
    prompt: 'consent'
  })
  
  if (state) {
    params.append('state', state)
  }
  
  return `${GOOGLE_AUTH_CONFIG.authUrl}?${params.toString()}`
}

// Función para intercambiar código por token
export async function exchangeCodeForToken(code: string) {
  const response = await fetch(GOOGLE_AUTH_CONFIG.tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: GOOGLE_AUTH_CONFIG.clientId,
      client_secret: GOOGLE_AUTH_CONFIG.clientSecret,
      code,
      grant_type: 'authorization_code',
      redirect_uri: GOOGLE_AUTH_CONFIG.redirectUri,
    }),
  })
  
  return response.json()
}

// Función para obtener información del usuario
export async function getGoogleUserInfo(accessToken: string) {
  const response = await fetch(GOOGLE_AUTH_CONFIG.userInfoUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  
  return response.json()
}
