# ✅ Completar Configuración Google OAuth

## **Estado actual:**
- ✅ **Nombre**: "Tabiji House" (correcto)
- ✅ **Client ID**: `553997693907-pq6q2cnfi1lntigc5t7vgj0gg5ki2k45.apps.googleusercontent.com`
- ✅ **JavaScript origins**: Configurados correctamente
- ❌ **Redirect URIs**: Faltan (sección vacía)

## **Pasos para completar:**

### **1. Añadir URIs de redireccionamiento autorizados**

En la sección "URIs de redireccionamiento autorizados", añadir:

```
URI 1: http://localhost:3000/auth/callback
URI 2: https://tabijihouse.com/auth/callback
URI 3: https://kbqxdsqklqdsvfrwawjj.supabase.co/auth/v1/callback
```

### **2. Obtener Client Secret**

En la sección "Secretos del cliente":
- Hacer clic en el icono de copiar (📋) junto al Client Secret
- Copiar el valor completo (no solo `****5IWG`)

### **3. Actualizar variables de entorno**

Editar `env.local`:
```env
# Google OAuth Configuration
GOOGLE_CLIENT_ID=553997693907-pq6q2cnfi1lntigc5t7vgj0gg5ki2k45.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=tu_client_secret_completo_aqui
GOOGLE_REDIRECT_URI=http://localhost:3000/auth/callback
```

### **4. Configurar en Supabase**

Ir a: https://supabase.com/dashboard/project/kbqxdsqklqdsvfrwawjj/auth/providers

**Configurar Google Provider:**
- **Enable Google provider**: ✅ Activado
- **Client ID**: `553997693907-pq6q2cnfi1lntigc5t7vgj0gg5ki2k45.apps.googleusercontent.com`
- **Client Secret**: [Pegar el Client Secret completo]
- **Site URL**: `http://localhost:3000`
- **Redirect URLs**: 
  ```
  http://localhost:3000/auth/callback
  https://tabijihouse.com/auth/callback
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
2. Verificar que muestra "Tabiji House"
3. Autorizar la aplicación
4. Verificar redirección al dashboard

## **Configuración final correcta:**

### **Google Cloud Console:**
```
Nombre: Tabiji House
Client ID: 553997693907-pq6q2cnfi1lntigc5t7vgj0gg5ki2k45.apps.googleusercontent.com
JavaScript origins:
- http://localhost:3000
- https://tabijihouse.com
- https://www.tabijihouse.com

Redirect URIs:
- http://localhost:3000/auth/callback
- https://tabijihouse.com/auth/callback
- https://kbqxdsqklqdsvfrwawjj.supabase.co/auth/v1/callback
```

### **Supabase:**
```
Google Provider: Enabled
Client ID: 553997693907-pq6q2cnfi1lntigc5t7vgj0gg5ki2k45.apps.googleusercontent.com
Client Secret: [Tu Client Secret completo]
Site URL: http://localhost:3000
Redirect URLs: http://localhost:3000/auth/callback
```

## **Próximos pasos:**
1. **Añadir Redirect URIs en Google Console**
2. **Copiar Client Secret completo**
3. **Actualizar variables de entorno**
4. **Configurar en Supabase**
5. **Probar autenticación**

