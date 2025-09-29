# 🔧 Configuración de Google OAuth en Supabase

## 🚨 **Error identificado: "Missing required parameter: client_id"**

### **Causa del problema:**
El `client_id` no se está pasando correctamente a Google OAuth.

### **Solución aplicada:**
- ✅ Client ID añadido a `env.local`
- ✅ Client ID añadido como fallback en `google-auth.ts`

## 📋 **Configuración en Supabase Dashboard**

### **1. Ir a Authentication > Providers**
```
URL: https://supabase.com/dashboard/project/kbqxdsqklqdsvfrwawjj/auth/providers
```

### **2. Configurar Google Provider**
- **Enable Google provider**: ✅ Activado
- **Client ID**: `553997693907-pq6q2cnfi1lntigc5t7vgj0gg5ki2k45.apps.googleusercontent.com`
- **Client Secret**: [Tu Client Secret de Google Console]

### **3. URLs de redirección en Supabase**
- **Site URL**: `http://localhost:3000`
- **Redirect URLs**: 
  ```
  http://localhost:3000/auth/callback
  https://tabijihouse.com/auth/callback
  ```

## 🔧 **Configuración en Google Cloud Console**

### **1. Orígenes autorizados de JavaScript**
```
http://localhost:3000
https://tabijihouse.com
https://www.tabijihouse.com
```

### **2. URIs de redireccionamiento autorizados**
```
http://localhost:3000/auth/callback
https://tabijihouse.com/auth/callback
https://kbqxdsqklqdsvfrwawjj.supabase.co/auth/v1/callback
```

## 🗄️ **Tablas SQL necesarias en Supabase**

### **1. Tabla de perfiles de usuario**
```sql
-- Crear tabla de perfiles
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Habilitar RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Política para que usuarios vean solo su perfil
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

-- Política para que usuarios actualicen solo su perfil
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Política para insertar perfil al registrarse
CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);
```

### **2. Función para crear perfil automáticamente**
```sql
-- Función para crear perfil cuando se registra un usuario
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para ejecutar la función al crear usuario
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

### **3. Tabla de leads (CRM)**
```sql
-- Crear tabla de leads
CREATE TABLE public.leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  email TEXT NOT NULL,
  full_name TEXT,
  source TEXT DEFAULT 'google_oauth',
  status TEXT DEFAULT 'new',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Política para que usuarios vean solo sus leads
CREATE POLICY "Users can view own leads" ON public.leads
  FOR SELECT USING (auth.uid() = user_id);

-- Política para que el equipo vea todos los leads
CREATE POLICY "Team can view all leads" ON public.leads
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() 
      AND (role = 'admin' OR role = 'agent')
    )
  );
```

## 🔄 **Actualizar configuración de Supabase**

### **1. Modificar `src/lib/supabase.ts`**
```typescript
// Añadir configuración de Google OAuth
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    ...SUPABASE_CONFIG.auth,
    providers: ['google'],
    redirectTo: `${window.location.origin}/auth/callback`
  }
})
```

### **2. Crear callback handler para Supabase**
```typescript
// src/app/auth/callback/route.ts
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

## 🧪 **Testing**

### **1. Probar autenticación**
```
URL: http://localhost:3000/auth
```

### **2. Verificar en Supabase**
- Ir a: Authentication > Users
- Confirmar que se creó el usuario
- Verificar que se creó el perfil en `public.profiles`

### **3. Verificar en Google Console**
- Revisar logs de OAuth
- Confirmar que las URLs coinciden

## 🚨 **Solución de problemas**

### **Error: "Missing required parameter: client_id"**
- ✅ Client ID añadido a variables de entorno
- ✅ Client ID añadido como fallback

### **Error: "Invalid redirect URI"**
- Verificar URLs en Google Console
- Verificar URLs en Supabase

### **Error: "User not created"**
- Verificar trigger de creación de perfil
- Verificar políticas RLS

## 📞 **Próximos pasos**

1. **Configurar Google Provider en Supabase**
2. **Ejecutar SQL para crear tablas**
3. **Probar autenticación**
4. **Verificar creación de usuario y perfil**

