# 🔧 Configuración de URLs en Supabase

## **Configuración necesaria en Supabase:**

### **1. Site URL**
```
http://localhost:3000
```
- Esta es la URL base de tu aplicación
- Ya está configurada correctamente

### **2. Redirect URLs**
Añadir las siguientes URLs haciendo clic en "Add URL":

#### **URL 1:**
```
http://localhost:3000/auth/callback
```

#### **URL 2:**
```
https://tabijihouse.com/auth/callback
```

#### **URL 3:**
```
https://kbqxdsqklqdsvfrwawjj.supabase.co/auth/v1/callback
```

### **3. Google Provider Configuration**
En la sección de Google Provider:

#### **Client Secret:**
- Hacer clic en el icono del ojo (👁️) para ver el Client Secret
- Copiar el valor completo
- Pegarlo en el campo "Client Secret"

#### **Skip nonce checks:**
- Mantener activado (toggle verde)
- Útil para desarrollo

#### **Callback URL:**
- Ya está configurado: `https://kbqxdsqklqdsvfrwawjj.supabase.co/auth/v1/callback`
- Hacer clic en "Copy" para copiarlo

## **Pasos para completar:**

### **1. Añadir Redirect URLs**
1. Hacer clic en "Add URL"
2. Añadir cada URL de la lista anterior
3. Hacer clic en "Save changes"

### **2. Configurar Google Provider**
1. Ir a la sección de Google Provider
2. Pegar el Client Secret completo
3. Hacer clic en "Save"

### **3. Verificar configuración**
- Site URL: `http://localhost:3000`
- Redirect URLs: Las 3 URLs añadidas
- Google Provider: Client Secret configurado

## **Configuración final:**

### **Supabase URLs:**
```
Site URL: http://localhost:3000
Redirect URLs:
- http://localhost:3000/auth/callback
- https://tabijihouse.com/auth/callback
- https://kbqxdsqklqdsvfrwawjj.supabase.co/auth/v1/callback
```

### **Google Provider:**
```
Client Secret: [Tu Client Secret completo]
Skip nonce checks: ✅ Activado
Callback URL: https://kbqxdsqklqdsvfrwawjj.supabase.co/auth/v1/callback
```

## **Testing:**
1. Guardar todas las configuraciones
2. Reiniciar servidor: `npm run dev`
3. Probar: `http://localhost:3000/auth`
4. Verificar que Google OAuth funciona correctamente

