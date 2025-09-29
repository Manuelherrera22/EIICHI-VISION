// Intentar importar Supabase, usar mock si no está disponible
let createClient: any;
let SUPABASE_CONFIG: any;

try {
  const supabaseModule = require('@supabase/supabase-js');
  createClient = supabaseModule.createClient;
  SUPABASE_CONFIG = require('./supabase-config').SUPABASE_CONFIG;
} catch (error) {
  console.warn('⚠️ @supabase/supabase-js no está instalado. Usando implementación mock.');
  // Usar implementación mock
  createClient = (url: string, key: string, options?: any) => ({
    auth: {
      signUp: async (options: any) => ({
        data: { user: null, session: null },
        error: { message: 'Instala @supabase/supabase-js para usar autenticación real' }
      }),
      signInWithPassword: async (options: any) => ({
        data: { user: null, session: null },
        error: { message: 'Instala @supabase/supabase-js para usar autenticación real' }
      }),
      signOut: async () => ({ error: null }),
      getUser: async () => ({ data: { user: null }, error: null }),
      onAuthStateChange: (callback: any) => ({
        data: { subscription: { unsubscribe: () => {} } }
      }),
      resetPasswordForEmail: async (email: string, options?: any) => ({
        data: null,
        error: { message: 'Instala @supabase/supabase-js para usar autenticación real' }
      }),
      updateUser: async (options: any) => ({
        data: null,
        error: { message: 'Instala @supabase/supabase-js para usar autenticación real' }
      })
    }
  });
  
  SUPABASE_CONFIG = {
    url: 'https://kbqxdsqklqdsvfrwawjj.supabase.co',
    projectId: 'kbqxdsqklqdsvfrwawjj',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImticXhkc3FrbHFkc3Zmcndhd2pqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxMTYyNTUsImV4cCI6MjA3NDY5MjI1NX0.XheHxxVayJukawFGR6iUoCh2W_03kguWU973rZT--Ao',
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      flowType: 'pkce' as const
    }
  };
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || SUPABASE_CONFIG.url
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || SUPABASE_CONFIG.anonKey
const supabaseProjectId = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID || SUPABASE_CONFIG.projectId

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: SUPABASE_CONFIG.auth
})

// Export project ID for reference
export const PROJECT_ID = supabaseProjectId

// Tipos para TypeScript
export interface User {
  id: string
  email: string
  user_metadata?: {
    full_name?: string
    avatar_url?: string
  }
  created_at: string
  updated_at: string
}

export interface AuthError {
  message: string
  status?: number
}

// Funciones de autenticación
export const auth = {
  // Registro
  signUp: async (email: string, password: string, fullName?: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    })
    return { data, error }
  },

  // Inicio de sesión
  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { data, error }
  },

  // Cerrar sesión
  signOut: async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  // Obtener usuario actual
  getCurrentUser: async () => {
    const { data: { user }, error } = await supabase.auth.getUser()
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()
    return { user, session, error: error || sessionError }
  },

  // Escuchar cambios de autenticación
  onAuthStateChange: (callback: (event: string, session: any) => void) => {
    return supabase.auth.onAuthStateChange(callback)
  },

  // Restablecer contraseña
  resetPassword: async (email: string) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })
    return { data, error }
  },

  // Actualizar contraseña
  updatePassword: async (newPassword: string) => {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword
    })
    return { data, error }
  }
}
