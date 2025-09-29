# 🚨 Solución: Error 400 redirect_uri_mismatch

## **Problema identificado:**
- Error: `Error 400: redirect_uri_mismatch`
- Aplicación: "Kary AI" (incorrecto)
- Debería ser: "Tabiji House"

## **Causa del problema:**
El OAuth client está configurado para "Kary AI" en lugar de "Tabiji House".

## **Solución paso a paso:**

### **1. Verificar en Google Cloud Console**

#### **A) Ir a Google Cloud Console**
```
URL: https://console.cloud.google.com/
```

#### **B) Seleccionar el proyecto correcto**
- Verificar que estás en el proyecto correcto
- Si no, cambiar al proyecto de "Tabiji House"

#### **C) Ir a APIs & Services > Credentials**
```
URL: https://console.cloud.google.com/apis/credentials
```

### **2. Configurar OAuth Client correctamente**

#### **A) Editar el OAuth Client existente**
- Client ID: `553997693907-pq6q2cnfi1lntigc5t7vgj0gg5ki2k45.apps.googleusercontent.com`
- O crear uno nuevo para "Tabiji House"

#### **B) Configurar Application name**
```
Application name: Tabiji House
```

#### **C) Configurar Authorized JavaScript origins**
```
http://localhost:3000
https://tabijihouse.com
https://www.tabijihouse.com
```

#### **D) Configurar Authorized redirect URIs**
```
http://localhost:3000/auth/callback
https://tabijihouse.com/auth/callback
https://kbqxdsqklqdsvfrwawjj.supabase.co/auth/v1/callback
```

### **3. Configurar en Supabase**

#### **A) Ir a Supabase Dashboard**
```
URL: https://supabase.com/dashboard/project/kbqxdsqklqdsvfrwawjj/auth/providers
```

#### **B) Configurar Google Provider**
- **Enable Google provider**: ✅ Activado
- **Client ID**: `553997693907-pq6q2cnfi1lntigc5t7vgj0gg5ki2k45.apps.googleusercontent.com`
- **Client Secret**: [Tu Client Secret de Google Console]

#### **C) Configurar URLs**
- **Site URL**: `http://localhost:3000`
- **Redirect URLs**: 
  ```
  http://localhost:3000/auth/callback
  https://tabijihouse.com/auth/callback
  ```

### **4. Verificar configuración actual**

#### **A) Verificar variables de entorno**
```env
# En env.local
GOOGLE_CLIENT_ID=553997693907-pq6q2cnfi1lntigc5t7vgj0gg5ki2k45.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=tu_client_secret_aqui
```

#### **B) Verificar configuración en código**
- `src/lib/google-auth.ts` - Client ID correcto
- `src/components/AuthForm.tsx` - Usa Supabase OAuth
- `src/app/auth/callback/route.ts` - Callback handler

### **5. Testing**

#### **A) Limpiar caché del navegador**
- Ctrl + Shift + Delete
- Limpiar cookies y caché

#### **B) Probar autenticación**
```
URL: http://localhost:3000/auth
```

#### **C) Verificar redirección**
- Hacer clic en "Continuar con Google"
- Verificar que muestra "Tabiji House" (no "Kary AI")
- Autorizar la aplicación
- Verificar redirección al dashboard

### **6. Si el problema persiste**

#### **A) Crear nuevo OAuth Client**
1. Ir a Google Cloud Console
2. Crear nuevo OAuth 2.0 Client ID
3. Configurar para "Tabiji House"
4. Actualizar variables de entorno

#### **B) Verificar dominio**
- Asegurar que el dominio esté verificado
- Configurar correctamente en Google Search Console

#### **C) Verificar permisos**
- Asegurar que la aplicación tenga permisos correctos
- Verificar que el usuario tenga acceso al proyecto

## **Configuración correcta final:**

### **Google Cloud Console:**
```
Application name: Tabiji House
Authorized JavaScript origins:
- http://localhost:3000
- https://tabijihouse.com

Authorized redirect URIs:
- http://localhost:3000/auth/callback
- https://tabijihouse.com/auth/callback
- https://kbqxdsqklqdsvfrwawjj.supabase.co/auth/v1/callback
```

### **Supabase:**
```
Google Provider: Enabled
Client ID: 553997693907-pq6q2cnfi1lntigc5t7vgj0gg5ki2k45.apps.googleusercontent.com
Client Secret: [Tu Client Secret]
Site URL: http://localhost:3000
Redirect URLs: http://localhost:3000/auth/callback
```

## **Próximos pasos:**
1. **Verificar proyecto en Google Cloud Console**
2. **Configurar OAuth Client para "Tabiji House"**
3. **Actualizar URLs de redirección**
4. **Probar autenticación**
5. **Verificar que muestra "Tabiji House"**

