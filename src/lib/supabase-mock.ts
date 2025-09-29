// Mock temporal de Supabase hasta que se instale la dependencia real
export const createClient = (url: string, key: string) => ({
  auth: {
    signUp: async (options: any) => ({
      data: { user: null, session: null },
      error: { message: 'Supabase no está configurado. Instala @supabase/supabase-js' }
    }),
    signInWithPassword: async (options: any) => ({
      data: { user: null, session: null },
      error: { message: 'Supabase no está configurado. Instala @supabase/supabase-js' }
    }),
    signOut: async () => ({
      error: null
    }),
    getUser: async () => ({
      data: { user: null },
      error: null
    }),
    onAuthStateChange: (callback: any) => ({
      data: { subscription: { unsubscribe: () => {} } }
    }),
    resetPasswordForEmail: async (email: string, options?: any) => ({
      data: null,
      error: { message: 'Supabase no está configurado. Instala @supabase/supabase-js' }
    }),
    updateUser: async (options: any) => ({
      data: null,
      error: { message: 'Supabase no está configurado. Instala @supabase/supabase-js' }
    })
  }
})

export const supabase = createClient('', '')

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

export interface Session {
  user: User
  access_token: string
  refresh_token: string
}

// Funciones de autenticación mock
export const auth = {
  signUp: async (email: string, password: string, fullName?: string) => ({
    data: null,
    error: { message: 'Instala @supabase/supabase-js para usar autenticación real' }
  }),
  signIn: async (email: string, password: string) => ({
    data: null,
    error: { message: 'Instala @supabase/supabase-js para usar autenticación real' }
  }),
  signOut: async () => ({ error: null }),
  getCurrentUser: async () => ({ user: null, error: null }),
  onAuthStateChange: (callback: any) => ({
    data: { subscription: { unsubscribe: () => {} } }
  }),
  resetPassword: async (email: string) => ({
    data: null,
    error: { message: 'Instala @supabase/supabase-js para usar autenticación real' }
  }),
  updatePassword: async (newPassword: string) => ({
    data: null,
    error: { message: 'Instala @supabase/supabase-js para usar autenticación real' }
  })
}

