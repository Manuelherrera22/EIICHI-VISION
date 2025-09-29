# 🚨 Solución: Error 500 en /auth/callback

## **Problema identificado:**
- **Error**: HTTP ERROR 500
- **URL**: `localhost:3000/auth/callback?code=bf04ed8b-b397-4bfe-9fc8-4d38fcf3b752`
- **Causa**: El callback handler no está funcionando correctamente

## **Solución:**

### **1. Verificar callback handler**

#### **A) Verificar archivo existe**
```
src/app/auth/callback/route.ts
```

#### **B) Verificar contenido del archivo**
```typescript
import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'

  if (code) {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  return NextResponse.redirect(`${origin}/auth?error=auth_callback_error`)
}
```

### **2. Verificar variables de entorno**

#### **A) Verificar env.local**
```env
NEXT_PUBLIC_SUPABASE_URL=https://kbqxdsqklqdsvfrwawjj.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImticXhkc3FrbHFkc3Zmcndhd2pqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxMTYyNTUsImV4cCI6MjA3NDY5MjI1NX0.XheHxxVayJukawFGR6iUoCh2W_03kguWU973rZT--Ao
```

### **3. Verificar dashboard**

#### **A) Verificar archivo existe**
```
src/app/dashboard/page.tsx
```

#### **B) Verificar contenido del archivo**
```typescript
'use client'

import { useAuth } from '@/contexts/AuthContext'
import ProtectedRoute from '@/components/ProtectedRoute'
import { useEffect } from 'react'

export default function Dashboard() {
  const { user, signOut } = useAuth()

  useEffect(() => {
    document.title = 'Dashboard - Tabiji House | Panel de Control'
  }, [])

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-primary mb-8">
            Dashboard - Tabiji House
          </h1>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-primary mb-4">
              Bienvenido, {user?.email}
            </h2>
            
            <p className="text-secondary mb-6">
              Este es tu panel de control personalizado.
            </p>
            
            <button
              onClick={signOut}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
```

### **4. Verificar ProtectedRoute**

#### **A) Verificar archivo existe**
```
src/components/ProtectedRoute.tsx
```

#### **B) Verificar contenido del archivo**
```typescript
'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-secondary">Cargando...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return <>{children}</>
}
```

### **5. Testing**

#### **A) Reiniciar servidor**
```bash
npm run dev
```

#### **B) Probar autenticación**
```
URL: http://localhost:3000/auth
```

#### **C) Verificar flujo**
1. Hacer clic en "Continuar con Google"
2. Autorizar la aplicación
3. Verificar redirección al dashboard
4. Confirmar que el dashboard carga correctamente

### **6. Si el error persiste**

#### **A) Verificar logs del servidor**
- Revisar la consola del terminal
- Buscar errores específicos

#### **B) Verificar redirección**
- Cambiar la redirección a `/` en lugar de `/dashboard`
- Probar si funciona

#### **C) Verificar AuthContext**
- Confirmar que el contexto de autenticación funciona
- Verificar que el usuario se crea correctamente

## **Configuración correcta:**

### **Callback Handler:**
```
src/app/auth/callback/route.ts - Funcional
```

### **Dashboard:**
```
src/app/dashboard/page.tsx - Funcional
```

### **ProtectedRoute:**
```
src/components/ProtectedRoute.tsx - Funcional
```

## **Próximos pasos:**
1. **Verificar archivos del callback y dashboard**
2. **Reiniciar servidor**
3. **Probar autenticación completa**
4. **Verificar que el dashboard carga**

