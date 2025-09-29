# 🔧 Actualizar Supabase con Nuevas Credenciales

## **Nuevas credenciales:**
- **Client ID**: `40911110211-g2adems1p79qt9m9umd90hono5as8d3r.apps.googleusercontent.com`
- **Client Secret**: `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`

## **Configuración actualizada:**

### **1. Variables de entorno actualizadas**
```env
# En env.local
GOOGLE_CLIENT_ID=40911110211-g2adems1p79qt9m9umd90hono5as8d3r.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
GOOGLE_REDIRECT_URI=http://localhost:3000/auth/callback
```

### **2. Código actualizado**
- `src/lib/google-auth.ts` - Nuevas credenciales como fallback

## **Configurar en Supabase:**

### **1. Ir a Supabase Dashboard**
```
URL: https://supabase.com/dashboard/project/kbqxdsqklqdsvfrwawjj/auth/providers
```

### **2. Configurar Google Provider**
- **Enable Google provider**: ✅ Activado
- **Client ID**: `40911110211-g2adems1p79qt9m9umd90hono5as8d3r.apps.googleusercontent.com`
- **Client Secret**: `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`
- **Site URL**: `http://localhost:3000`
- **Redirect URLs**: 
  ```
  http://localhost:3000/auth/callback
  https://tabijihouse.com/auth/callback
  ```

### **3. Guardar configuración**
- Hacer clic en "Save" para guardar los cambios

## **Testing:**

### **1. Reiniciar servidor**
```bash
npm run dev
```

### **2. Limpiar caché del navegador**
- Ctrl + Shift + Delete
- Limpiar cookies y caché

### **3. Probar autenticación**
```
URL: http://localhost:3000/auth
```

### **4. Verificar flujo**
1. Hacer clic en "Continuar con Google"
2. Verificar que muestra "Tabiji House" (no "Kary AI")
3. Autorizar la aplicación
4. Verificar redirección al dashboard

## **Configuración final:**

### **Google Cloud Console:**
```
Proyecto: Tabiji House
OAuth Client:
- Application name: Tabiji House
- Client ID: 40911110211-g2adems1p79qt9m9umd90hono5as8d3r.apps.googleusercontent.com
- Client Secret: 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
- JavaScript origins: http://localhost:3000, https://tabijihouse.com
- Redirect URIs: http://localhost:3000/auth/callback, https://kbqxdsqklqdsvfrwawjj.supabase.co/auth/v1/callback
```

### **Supabase:**
```
Google Provider: Enabled
Client ID: 40911110211-g2adems1p79qt9m9umd90hono5as8d3r.apps.googleusercontent.com
Client Secret: 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
Site URL: http://localhost:3000
Redirect URLs: http://localhost:3000/auth/callback
```

## **Próximos pasos:**
1. **Configurar Google Provider en Supabase**
2. **Reiniciar servidor**
3. **Probar autenticación**
4. **Verificar que muestra "Tabiji House"**

