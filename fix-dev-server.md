# Solución para ERR_CONNECTION_REFUSED

## ¿Qué significa este error?

El error `ERR_CONNECTION_REFUSED` significa que el navegador está intentando conectarse al servidor de desarrollo de Next.js, pero el servidor no está respondiendo o no está corriendo.

Los archivos que fallan son:
- `webpack.js`
- `main-app.js`
- `app-pages-internals.js`
- `layout.js`
- `page.js`

Estos son archivos generados por Next.js durante el desarrollo.

## Soluciones (en orden de prioridad)

### 1. Verificar que el servidor esté corriendo

Abre una terminal y ejecuta:
```bash
npm run dev
```

O si estás usando Windows:
```bash
start-dev.bat
```

El servidor debería iniciarse en `http://localhost:3000`

### 2. Verificar que el puerto 3000 esté disponible

Si otro proceso está usando el puerto 3000, el servidor no podrá iniciarse.

**En Windows:**
```powershell
# Ver qué proceso usa el puerto 3000
netstat -ano | findstr :3000

# Matar el proceso (reemplaza PID con el número que aparece)
taskkill /PID <PID> /F
```

**En Mac/Linux:**
```bash
# Ver qué proceso usa el puerto 3000
lsof -i :3000

# Matar el proceso
kill -9 <PID>
```

### 3. Limpiar caché de Next.js

A veces el caché de Next.js puede causar problemas:

```bash
# Eliminar carpeta .next
rm -rf .next

# O en Windows PowerShell
Remove-Item -Recurse -Force .next

# Luego reiniciar el servidor
npm run dev
```

### 4. Verificar variables de entorno

Asegúrate de que las variables de entorno necesarias estén configuradas en `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=tu_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_key
```

### 5. Reinstalar dependencias

Si el problema persiste:

```bash
# Eliminar node_modules y package-lock.json
rm -rf node_modules package-lock.json

# Reinstalar
npm install

# Reiniciar servidor
npm run dev
```

### 6. Verificar configuración de Next.js

El archivo `next.config.ts` tiene configuración para deshabilitar Fast Refresh. Si estás experimentando problemas, puedes intentar:

1. Verificar que no haya errores de sintaxis en `next.config.ts`
2. Temporalmente simplificar la configuración de webpack

### 7. Usar un puerto diferente

Si el puerto 3000 está ocupado, puedes usar otro:

```bash
# En package.json, cambiar el script dev a:
"dev": "next dev -p 3001"

# O ejecutar directamente:
npx next dev -p 3001
```

Luego acceder a `http://localhost:3001`

## Checklist de Diagnóstico

- [ ] ¿El servidor está corriendo? (deberías ver "Ready" en la terminal)
- [ ] ¿Puedes acceder a `http://localhost:3000` directamente?
- [ ] ¿Hay algún error en la terminal del servidor?
- [ ] ¿El puerto 3000 está libre?
- [ ] ¿Has limpiado la caché de Next.js (.next folder)?
- [ ] ¿Las dependencias están instaladas correctamente?

## Errores Comunes Relacionados

### Error: "Port 3000 is already in use"
**Solución**: Usar otro puerto o matar el proceso que usa el puerto 3000

### Error: "Cannot find module"
**Solución**: Ejecutar `npm install` para reinstalar dependencias

### Error: "Fast Refresh" o "HMR" issues
**Solución**: Ya está deshabilitado en tu configuración, pero si persiste, reinicia el servidor

## Script de Diagnóstico Rápido

Crea un archivo `check-dev-server.bat` (Windows) o `check-dev-server.sh` (Mac/Linux):

**Windows (check-dev-server.bat):**
```batch
@echo off
echo Checking development server status...
echo.

echo 1. Checking if port 3000 is in use:
netstat -ano | findstr :3000
echo.

echo 2. Checking Node.js version:
node --version
echo.

echo 3. Checking if .next folder exists:
if exist .next (
    echo .next folder exists
) else (
    echo .next folder does not exist
)
echo.

echo 4. Ready to start server? Press any key to start...
pause
npm run dev
```

## Si Nada Funciona

1. **Cerrar todas las terminales y procesos de Node.js**
2. **Eliminar completamente `.next` y `node_modules`**
3. **Reinstalar todo**: `npm install`
4. **Iniciar servidor limpio**: `npm run dev`
5. **Abrir navegador en modo incógnito** para evitar problemas de caché del navegador

## Contacto

Si el problema persiste después de intentar todas estas soluciones, comparte:
- El mensaje de error completo de la terminal
- Tu versión de Node.js (`node --version`)
- Tu versión de npm (`npm --version`)
- El contenido de `next.config.ts` si ha sido modificado

