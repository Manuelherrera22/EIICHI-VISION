# 🔐 Instrucciones para OAuth - Tabiji House

## 📋 **Pasos completados**

### ✅ **1. Google Cloud Console configurado**
- URLs de redirección añadidas
- Client ID y Client Secret obtenidos

### ✅ **2. Supabase configurado**
- Callback URL: `https://kbqxdsqklqdsvfrwawjj.supabase.co/auth/v1/callback`

## 🚀 **Instalación de dependencias**

### **Opción 1: Script automático (Windows)**
```bash
install-oauth-deps.bat
```

### **Opción 2: Script automático (Linux/Mac)**
```bash
chmod +x install-oauth-deps.sh
./install-oauth-deps.sh
```

### **Opción 3: Comandos manuales**
```bash
cd "C:\DATOS M.2 MANUEL\Desktop\EIICHI-VISION-main"
npm install @auth0/nextjs-auth0@^3.5.0
npm install next-auth@^4.24.5
```

## 🔧 **Configuración final**

### **1. Actualizar variables de entorno**
Edita `env.local` con tus credenciales reales:

```env
# Google OAuth Configuration
GOOGLE_CLIENT_ID=tu_client_id_real_aqui
GOOGLE_CLIENT_SECRET=tu_client_secret_real_aqui
GOOGLE_REDIRECT_URI=http://localhost:3000/auth/callback/google
```

### **2. Reiniciar servidor**
```bash
npm run dev
```

## 🧪 **Testing**

### **1. Probar autenticación local**
- Ir a: `http://localhost:3000/auth`
- Hacer clic en "Continuar con Google"
- Verificar que redirige correctamente

### **2. Verificar en Supabase**
- Ir al dashboard de Supabase
- Revisar la tabla `auth.users`
- Confirmar que se crean usuarios correctamente

## 🔒 **Configuración de seguridad**

### **Supabase Auth**
- ✅ Callback URL configurado
- ✅ PKCE flow habilitado
- ✅ Session management activo

### **Google OAuth**
- ✅ Scopes: openid, email, profile
- ✅ State parameter para CSRF protection
- ✅ Secure token exchange

## 📱 **Funcionalidades implementadas**

### **✅ Archivos creados:**
- `src/lib/google-auth.ts` - Configuración OAuth
- `src/app/api/auth/google/route.ts` - Endpoint autorización
- `src/app/api/auth/callback/google/route.ts` - Callback handler
- `src/components/AuthForm.tsx` - Botón Google añadido
- `install-oauth-deps.bat/.sh` - Scripts de instalación

### **✅ Características:**
- Botón "Continuar con Google" en login
- Integración completa con Supabase
- Manejo de errores y redirecciones
- Diseño responsive y accesible
- Protección CSRF con state parameter

## 🚨 **Solución de problemas**

### **Error: "Module not found"**
```bash
npm install @auth0/nextjs-auth0 next-auth
```

### **Error: "Invalid redirect URI"**
- Verificar URLs en Google Cloud Console
- Confirmar que coinciden exactamente

### **Error: "Supabase auth failed"**
- Verificar callback URL en Supabase
- Confirmar que el proyecto está activo

## 📞 **Soporte**

Si tienes problemas:
1. Verificar que las dependencias estén instaladas
2. Confirmar variables de entorno
3. Revisar consola del navegador
4. Verificar logs del servidor

## 🎯 **Próximos pasos**

1. **Instalar dependencias** (ejecutar script)
2. **Actualizar variables de entorno** con credenciales reales
3. **Probar autenticación** en localhost
4. **Configurar dominio de producción** cuando esté listo

