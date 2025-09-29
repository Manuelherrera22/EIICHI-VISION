#!/bin/bash

echo "========================================"
echo " INSTALANDO SUPABASE PARA TABIJI HOUSE"
echo "========================================"
echo

cd "C:\DATOS M.2 MANUEL\Desktop\EIICHI-VISION-main"

echo "Directorio actual: $(pwd)"
echo

echo "Instalando @supabase/supabase-js..."
npm install @supabase/supabase-js

if [ $? -eq 0 ]; then
    echo
    echo "✅ Supabase instalado correctamente!"
    echo
    echo "Iniciando servidor de desarrollo..."
    npm run dev
else
    echo
    echo "❌ Error al instalar Supabase"
    echo
    echo "Intentando con --force..."
    npm install @supabase/supabase-js --force
    
    if [ $? -eq 0 ]; then
        echo
        echo "✅ Supabase instalado con --force!"
        echo
        echo "Iniciando servidor de desarrollo..."
        npm run dev
    else
        echo
        echo "❌ Error persistente. Intenta manualmente:"
        echo "npm install @supabase/supabase-js"
        echo
        read -p "Presiona Enter para continuar..."
    fi
fi
