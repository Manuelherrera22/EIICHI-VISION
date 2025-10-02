#!/bin/bash

# Script de verificación para Usuario Demo - Tabiji House
# Ejecutar después de crear el usuario demo en Supabase

echo "🚀 Verificando configuración del Usuario Demo..."
echo ""

# Verificar variables de entorno
echo "📋 Verificando variables de entorno:"
if [ -f ".env.local" ]; then
    echo "✅ Archivo .env.local encontrado"
    
    if grep -q "NEXT_PUBLIC_SUPABASE_URL" .env.local; then
        echo "✅ NEXT_PUBLIC_SUPABASE_URL configurada"
    else
        echo "❌ NEXT_PUBLIC_SUPABASE_URL no encontrada"
    fi
    
    if grep -q "NEXT_PUBLIC_SUPABASE_ANON_KEY" .env.local; then
        echo "✅ NEXT_PUBLIC_SUPABASE_ANON_KEY configurada"
    else
        echo "❌ NEXT_PUBLIC_SUPABASE_ANON_KEY no encontrada"
    fi
else
    echo "❌ Archivo .env.local no encontrado"
fi

echo ""

# Verificar archivos del proyecto
echo "📁 Verificando archivos del proyecto:"
if [ -f "src/components/LocalLogin.tsx" ]; then
    echo "✅ LocalLogin.tsx encontrado"
else
    echo "❌ LocalLogin.tsx no encontrado"
fi

if [ -f "src/app/login-local/page.tsx" ]; then
    echo "✅ Página login-local encontrada"
else
    echo "❌ Página login-local no encontrada"
fi

if [ -f "create_demo_user.sql" ]; then
    echo "✅ Script SQL encontrado"
else
    echo "❌ Script SQL no encontrado"
fi

echo ""

# Verificar dependencias
echo "📦 Verificando dependencias:"
if [ -f "package.json" ]; then
    echo "✅ package.json encontrado"
    
    if grep -q "@supabase/supabase-js" package.json; then
        echo "✅ Supabase client instalado"
    else
        echo "❌ Supabase client no instalado"
    fi
    
    if grep -q "framer-motion" package.json; then
        echo "✅ Framer Motion instalado"
    else
        echo "❌ Framer Motion no instalado"
    fi
    
    if grep -q "lucide-react" package.json; then
        echo "✅ Lucide React instalado"
    else
        echo "❌ Lucide React no instalado"
    fi
else
    echo "❌ package.json no encontrado"
fi

echo ""

# Verificar componentes del dashboard
echo "🎨 Verificando componentes del dashboard:"
components=(
    "src/components/dso/OrganizedDashboard.tsx"
    "src/components/dso/DashboardNavigation.tsx"
    "src/components/dso/RealtimeMetrics.tsx"
    "src/components/dso/SmartAlertsSystem.tsx"
    "src/components/dso/AIPredictions.tsx"
    "src/components/dso/ReportExport.tsx"
    "src/components/dso/Chatbot.tsx"
)

for component in "${components[@]}"; do
    if [ -f "$component" ]; then
        echo "✅ $(basename $component) encontrado"
    else
        echo "❌ $(basename $component) no encontrado"
    fi
done

echo ""

# Instrucciones finales
echo "🎯 PRÓXIMOS PASOS:"
echo ""
echo "1. 📊 Ejecutar el script SQL en Supabase:"
echo "   - Abrir Supabase Dashboard"
echo "   - Ir a SQL Editor"
echo "   - Copiar y pegar el contenido de create_demo_user.sql"
echo "   - Ejecutar el script"
echo ""
echo "2. 🚀 Iniciar el servidor de desarrollo:"
echo "   npm run dev"
echo ""
echo "3. 🌐 Acceder al login local:"
echo "   http://localhost:3000/login-local"
echo ""
echo "4. 🔐 Usar las credenciales demo:"
echo "   Email: demo@tabijihouse.com"
echo "   Contraseña: demo123456"
echo ""
echo "5. 🎉 ¡Explorar el dashboard completo!"
echo ""

echo "📚 Para más información, consulta:"
echo "   - USUARIO_DEMO_INSTRUCCIONES.md"
echo "   - README.md"
echo ""

echo "✨ ¡Configuración completada!"
