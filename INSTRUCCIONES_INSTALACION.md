# 🚀 INSTRUCCIONES DE INSTALACIÓN - TABIJI HOUSE

## ⚠️ PROBLEMA ACTUAL
El módulo `@supabase/supabase-js` no está instalado, causando el error:
```
Module not found: Can't resolve '@supabase/supabase-js'
```

## 🔧 SOLUCIONES DISPONIBLES

### **OPCIÓN 1: Script Automático (Recomendado)**

**Para Windows:**
1. Ejecuta el archivo `install-supabase.bat`
2. O abre PowerShell/CMD y ejecuta:
```bash
cd "C:\DATOS M.2 MANUEL\Desktop\EIICHI-VISION-main"
npm install @supabase/supabase-js
npm run dev
```

**Para Linux/Mac:**
1. Ejecuta el archivo `install-supabase.sh`
2. O abre Terminal y ejecuta:
```bash
cd "C:\DATOS M.2 MANUEL\Desktop\EIICHI-VISION-main"
npm install @supabase/supabase-js
npm run dev
```

### **OPCIÓN 2: Instalación Manual**

1. **Abrir terminal en el directorio del proyecto:**
```bash
cd "C:\DATOS M.2 MANUEL\Desktop\EIICHI-VISION-main"
```

2. **Instalar Supabase:**
```bash
npm install @supabase/supabase-js
```

3. **Si hay errores, usar --force:**
```bash
npm install @supabase/supabase-js --force
```

4. **Iniciar servidor:**
```bash
npm run dev
```

### **OPCIÓN 3: Limpiar e Instalar Todo**

Si persisten los problemas:
```bash
# Limpiar caché y node_modules
npm cache clean --force
rm -rf node_modules package-lock.json

# Reinstalar todo
npm install

# Iniciar servidor
npm run dev
```

## ✅ VERIFICACIÓN

Después de la instalación exitosa:

1. **El error desaparecerá** y verás:
```
✓ Ready in 2.3s
✓ Local: http://localhost:3000
```

2. **Funcionalidades disponibles:**
- `/auth` - Login/Registro
- `/dashboard` - Panel de control (requiere login)
- `/profile` - Perfil de usuario (requiere login)
- `/reset-password` - Restablecer contraseña

3. **Sistema de autenticación:**
- Registro con email y contraseña
- Login/logout
- Protección de rutas
- Integración con CRM
- Menú de usuario

## 🔄 IMPLEMENTACIÓN TEMPORAL

**Mientras instalas Supabase, el código usa una implementación mock que:**
- ✅ Permite que la aplicación funcione sin errores
- ⚠️ Muestra mensajes informativos en lugar de autenticación real
- 🔄 Se reemplaza automáticamente cuando instalas Supabase

## 📞 SOPORTE

Si tienes problemas:
1. Verifica que Node.js y npm estén instalados
2. Ejecuta `npm --version` para confirmar
3. Intenta con diferentes terminales (CMD, PowerShell, Git Bash)
4. Usa `--force` si hay conflictos de dependencias

## 🎯 PRÓXIMOS PASOS

Una vez instalado Supabase:
1. **Probar registro:** Ir a `/auth` y crear cuenta
2. **Verificar dashboard:** Acceder a `/dashboard`
3. **Configurar perfil:** Editar en `/profile`
4. **Probar CRM:** Verificar que se crean leads automáticamente

---

**¡El sistema está listo para funcionar una vez instalado Supabase!** 🚀
