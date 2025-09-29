# 🔐 Configuración de Google OAuth para Tabiji House

## 📋 **Pasos para completar la configuración**

### **1. En Google Cloud Console**

#### **A) Orígenes autorizados de JavaScript:**
```
http://localhost:3000
https://tabijihouse.com
https://www.tabijihouse.com
```

#### **B) URIs de redireccionamiento autorizados:**
```
http://localhost:3000/auth/callback/google
https://tabijihouse.com/auth/callback/google
https://www.tabijihouse.com/auth/callback/google
```

### **2. Obtener credenciales**

1. **Client ID**: Copia el ID del cliente de Google
2. **Client Secret**: Copia el secreto del cliente

### **3. Actualizar variables de entorno**

Edita el archivo `env.local` y reemplaza:

```env
# Google OAuth Configuration
GOOGLE_CLIENT_ID=tu_client_id_aqui
GOOGLE_CLIENT_SECRET=tu_client_secret_aqui
GOOGLE_REDIRECT_URI=http://localhost:3000/auth/callback/google
```

### **4. Reiniciar el servidor**

```bash
npm run dev
```

## 🚀 **Funcionalidades implementadas**

### **✅ Archivos creados:**
- `src/lib/google-auth.ts` - Configuración de Google OAuth
- `src/app/api/auth/google/route.ts` - Endpoint de autorización
- `src/app/api/auth/callback/google/route.ts` - Callback de Google
- `src/components/AuthForm.tsx` - Botón de Google añadido

### **✅ Características:**
- Botón "Continuar con Google" en el formulario de login
- Integración con Supabase para crear usuarios
- Manejo de errores y redirecciones
- Diseño responsive y accesible

## 🔧 **Flujo de autenticación**

1. **Usuario hace clic en "Continuar con Google"**
2. **Redirección a Google OAuth**
3. **Usuario autoriza la aplicación**
4. **Google redirige a `/auth/callback/google`**
5. **Intercambio de código por token**
6. **Creación de usuario en Supabase**
7. **Redirección al dashboard**

## 🛠️ **Próximos pasos**

1. **Completar la configuración en Google Cloud Console**
2. **Actualizar las variables de entorno**
3. **Probar el flujo de autenticación**
4. **Configurar el dominio de producción**

## 📱 **Testing**

### **Local:**
- `http://localhost:3000/auth`
- Hacer clic en "Continuar con Google"

### **Producción:**
- `https://tabijihouse.com/auth`
- Verificar que las URLs estén configuradas en Google Console

## 🔒 **Seguridad**

- ✅ Validación de estado (CSRF protection)
- ✅ Manejo seguro de tokens
- ✅ Integración con Supabase Auth
- ✅ Redirecciones seguras

## 📞 **Soporte**

Si tienes problemas:
1. Verifica que las URLs estén correctas en Google Console
2. Confirma que las variables de entorno estén actualizadas
3. Revisa la consola del navegador para errores
4. Verifica que el servidor esté ejecutándose en el puerto 3000

