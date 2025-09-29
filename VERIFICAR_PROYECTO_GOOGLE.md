# 🔍 Verificar Proyecto Google Cloud Console

## **Problema actual:**
- Error: `Error 400: redirect_uri_mismatch`
- Aplicación mostrada: "Kary AI" (incorrecto)
- Debería mostrar: "Tabiji House"

## **Pasos para verificar y corregir:**

### **1. Verificar proyecto actual en Google Cloud Console**

#### **A) Ir a Google Cloud Console**
```
URL: https://console.cloud.google.com/
```

#### **B) Verificar proyecto seleccionado**
- En la parte superior, verificar el nombre del proyecto
- Debería mostrar "Tabiji House" o similar
- Si muestra "Kary AI" o otro nombre, cambiar de proyecto

#### **C) Cambiar de proyecto si es necesario**
1. Hacer clic en el selector de proyecto (parte superior)
2. Buscar proyecto de "Tabiji House"
3. Seleccionar el proyecto correcto

### **2. Verificar OAuth Client**

#### **A) Ir a APIs & Services > Credentials**
```
URL: https://console.cloud.google.com/apis/credentials
```

#### **B) Buscar el Client ID**
- Client ID: `553997693907-pq6q2cnfi1lntigc5t7vgj0gg5ki2k45.apps.googleusercontent.com`
- Verificar que esté en el proyecto correcto

#### **C) Editar OAuth Client**
1. Hacer clic en el Client ID
2. Verificar "Application name"
3. Debería mostrar "Tabiji House"

### **3. Configurar correctamente**

#### **A) Application name**
```
Application name: Tabiji House
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

### **4. Si no encuentras el proyecto correcto**

#### **A) Crear nuevo proyecto**
1. Ir a Google Cloud Console
2. Hacer clic en "New Project"
3. Nombre: "Tabiji House"
4. Crear proyecto

#### **B) Habilitar APIs necesarias**
1. Ir a APIs & Services > Library
2. Buscar "Google+ API"
3. Habilitar API
4. Buscar "People API"
5. Habilitar API

#### **C) Crear nuevo OAuth Client**
1. Ir a APIs & Services > Credentials
2. Hacer clic en "Create Credentials"
3. Seleccionar "OAuth client ID"
4. Application type: "Web application"
5. Configurar como se indica arriba

### **5. Actualizar variables de entorno**

#### **A) Si creaste nuevo Client ID**
```env
# En env.local
GOOGLE_CLIENT_ID=nuevo_client_id_aqui
GOOGLE_CLIENT_SECRET=nuevo_client_secret_aqui
```

#### **B) Si usas el mismo Client ID**
```env
# En env.local
GOOGLE_CLIENT_ID=553997693907-pq6q2cnfi1lntigc5t7vgj0gg5ki2k45.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=tu_client_secret_aqui
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
- Verificar que muestra "Tabiji House"
- Autorizar la aplicación
- Verificar redirección al dashboard

## **Configuración correcta final:**

### **Google Cloud Console:**
```
Proyecto: Tabiji House
OAuth Client:
- Application name: Tabiji House
- Client ID: 553997693907-pq6q2cnfi1lntigc5t7vgj0gg5ki2k45.apps.googleusercontent.com
- Authorized JavaScript origins: http://localhost:3000, https://tabijihouse.com
- Authorized redirect URIs: http://localhost:3000/auth/callback, https://kbqxdsqklqdsvfrwawjj.supabase.co/auth/v1/callback
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

