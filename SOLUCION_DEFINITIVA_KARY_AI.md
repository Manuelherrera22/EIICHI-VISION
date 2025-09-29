# 🚨 Solución Definitiva: Error "Kary AI" persiste

## **Problema persistente:**
- Error: `Error 400: redirect_uri_mismatch`
- Aplicación: "Kary AI" (sigue apareciendo)
- Debería ser: "Tabiji House"

## **Causa raíz:**
El OAuth client está configurado para "Kary AI" en Google Cloud Console, no para "Tabiji House".

## **Solución definitiva:**

### **1. Verificar proyecto en Google Cloud Console**

#### **A) Ir a Google Cloud Console**
```
URL: https://console.cloud.google.com/
```

#### **B) Verificar proyecto seleccionado**
- En la parte superior, verificar el nombre del proyecto
- Si muestra "Kary AI" o cualquier nombre que no sea "Tabiji House", cambiar de proyecto

#### **C) Cambiar de proyecto**
1. Hacer clic en el selector de proyecto (parte superior)
2. Buscar proyecto de "Tabiji House"
3. Si no existe, crear uno nuevo

### **2. Crear nuevo proyecto (si es necesario)**

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

### **3. Configurar OAuth Client correctamente**

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
Proyecto: Tabiji House
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

## **Si el problema persiste:**

### **1. Verificar dominio**
- Asegurar que el dominio esté verificado en Google Search Console
- Configurar correctamente en Google Cloud Console

### **2. Verificar permisos**
- Asegurar que la aplicación tenga permisos correctos
- Verificar que el usuario tenga acceso al proyecto

### **3. Contactar soporte**
- Si nada funciona, contactar soporte de Google Cloud
- Proporcionar detalles del error y configuración

## **Próximos pasos:**
1. **Verificar/cambiar proyecto en Google Cloud Console**
2. **Crear nuevo OAuth Client para "Tabiji House"**
3. **Actualizar todas las configuraciones**
4. **Probar autenticación**
5. **Verificar que muestra "Tabiji House"**

