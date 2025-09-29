# 🚨 Solución: Proyecto "My Maps Project" incorrecto

## **Problema identificado:**
- **Proyecto actual**: "My Maps Project" (incorrecto)
- **Debería ser**: "Tabiji House"
- **Client ID**: `[GOOGLE_CLIENT_ID]`
- **Client Secret**: `[GOOGLE_CLIENT_SECRET]`

## **Causa del problema:**
El OAuth client está en el proyecto "My Maps Project" en lugar del proyecto "Tabiji House".

## **Solución:**

### **1. Cambiar de proyecto en Google Cloud Console**

#### **A) Ir a Google Cloud Console**
```
URL: https://console.cloud.google.com/
```

#### **B) Cambiar de proyecto**
1. Hacer clic en el selector de proyecto (parte superior)
2. Actualmente muestra: "My Maps Project"
3. Buscar proyecto de "Tabiji House"
4. Si no existe, crear uno nuevo

### **2. Crear nuevo proyecto "Tabiji House"**

#### **A) Crear proyecto**
1. Hacer clic en "New Project"
2. Nombre: "Tabiji House"
3. Crear proyecto

#### **B) Habilitar APIs**
1. Ir a APIs & Services > Library
2. Buscar "Google+ API" y habilitar
3. Buscar "People API" y habilitar

#### **C) Crear nuevo OAuth Client**
1. Ir a APIs & Services > Credentials
2. Hacer clic en "Create Credentials"
3. Seleccionar "OAuth client ID"
4. Application type: "Web application"
5. Nombre: "Tabiji House"

### **3. Configurar OAuth Client en el proyecto correcto**

#### **A) Application name**
```
Tabiji House
```

#### **B) Authorized JavaScript origins**
```
http://localhost:3000
https://tabijihouse.com
https://www.tabijihouse.com
```

#### **C) Authorized redirect URIs**
```
http://localhost:3000/auth/callback
https://tabijihouse.com/auth/callback
https://kbqxdsqklqdsvfrwawjj.supabase.co/auth/v1/callback
```

### **4. Obtener nuevas credenciales**

#### **A) Copiar nuevo Client ID**
- Anotar el nuevo Client ID generado

#### **B) Copiar nuevo Client Secret**
- Hacer clic en el icono de copiar
- Copiar el valor completo

### **5. Actualizar configuración**

#### **A) Actualizar variables de entorno**
```env
# En env.local
GOOGLE_CLIENT_ID=nuevo_client_id_aqui
GOOGLE_CLIENT_SECRET=nuevo_client_secret_aqui
GOOGLE_REDIRECT_URI=http://localhost:3000/auth/callback
```

#### **B) Actualizar Supabase**
1. Ir a: https://supabase.com/dashboard/project/kbqxdsqklqdsvfrwawjj/auth/providers
2. Configurar Google Provider:
   - **Client ID**: [Nuevo Client ID]
   - **Client Secret**: [Nuevo Client Secret]
   - **Site URL**: `http://localhost:3000`
   - **Redirect URLs**: `http://localhost:3000/auth/callback`

#### **C) Actualizar código**
```typescript
// En src/lib/google-auth.ts
export const GOOGLE_AUTH_CONFIG = {
  clientId: process.env.GOOGLE_CLIENT_ID || 'nuevo_client_id_aqui',
  // ... resto de configuración
}
```

### **6. Testing**

#### **A) Limpiar caché del navegador**
- Ctrl + Shift + Delete
- Limpiar cookies y caché

#### **B) Reiniciar servidor**
```bash
npm run dev
```

#### **C) Probar autenticación**
```
URL: http://localhost:3000/auth
```

#### **D) Verificar**
- Hacer clic en "Continuar con Google"
- Verificar que muestra "Tabiji House" (no "Kary AI")
- Autorizar la aplicación
- Verificar redirección al dashboard

## **Configuración correcta final:**

### **Google Cloud Console:**
```
Proyecto: Tabiji House (no "My Maps Project")
OAuth Client:
- Application name: Tabiji House
- Client ID: [Nuevo Client ID]
- JavaScript origins: http://localhost:3000, https://tabijihouse.com
- Redirect URIs: http://localhost:3000/auth/callback, https://kbqxdsqklqdsvfrwawjj.supabase.co/auth/v1/callback
```

### **Supabase:**
```
Google Provider: Enabled
Client ID: [Nuevo Client ID]
Client Secret: [Nuevo Client Secret]
Site URL: http://localhost:3000
Redirect URLs: http://localhost:3000/auth/callback
```

## **Por qué aparece "Kary AI":**
- El OAuth client está en el proyecto "My Maps Project"
- "Kary AI" es probablemente otro proyecto de Google Cloud
- Google está confundiendo los proyectos

## **Próximos pasos:**
1. **Cambiar a proyecto "Tabiji House" en Google Cloud Console**
2. **Crear nuevo OAuth Client en el proyecto correcto**
3. **Actualizar todas las configuraciones**
4. **Probar autenticación**
5. **Verificar que muestra "Tabiji House"**

