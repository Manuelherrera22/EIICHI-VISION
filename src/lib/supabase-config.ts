// Configuración de Supabase para Tabiji House
export const SUPABASE_CONFIG = {
  // URL del proyecto Supabase
  url: 'https://kbqxdsqklqdsvfrwawjj.supabase.co',
  
  // ID del proyecto
  projectId: 'kbqxdsqklqdsvfrwawjj',
  
  // Clave anónima (pública)
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImticXhkc3FrbHFkc3Zmcndhd2pqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxMTYyNTUsImV4cCI6MjA3NDY5MjI1NX0.XheHxxVayJukawFGR6iUoCh2W_03kguWU973rZT--Ao',
  
  // Clave de servicio (privada - solo para server-side)
  serviceRoleKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImticXhkc3FrbHFkc3Zmcndhd2pqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTExNjI1NSwiZXhwIjoyMDc0NjkyMjU1fQ.2GzBXC_7u4yCwTVzMl7W4bbLXkH6r-JlkZ--EkYc1Bg',
  
  // Configuración de autenticación
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce' as const
  }
}

// URLs de redirección para autenticación
export const AUTH_REDIRECTS = {
  signUp: '/auth?mode=register',
  signIn: '/auth?mode=login',
  resetPassword: '/reset-password',
  dashboard: '/dashboard',
  profile: '/profile',
  googleCallback: 'https://kbqxdsqklqdsvfrwawjj.supabase.co/auth/v1/callback'
}

// Configuración de la base de datos
export const DATABASE_CONFIG = {
  // Tablas principales
  tables: {
    users: 'auth.users',
    profiles: 'public.profiles',
    leads: 'public.leads',
    properties: 'public.properties',
    bookings: 'public.bookings'
  },
  
  // Políticas RLS (Row Level Security)
  policies: {
    // Los usuarios solo pueden ver/editar sus propios datos
    userOwnData: 'user_id = auth.uid()',
    // Los leads son visibles para el equipo
    teamLeads: 'role = "admin" OR role = "agent"'
  }
}

// Configuración de email
export const EMAIL_CONFIG = {
  from: 'noreply@tabijihouse.com',
  templates: {
    welcome: 'welcome-email',
    resetPassword: 'reset-password-email',
    bookingConfirmation: 'booking-confirmation-email'
  }
}
