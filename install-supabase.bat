@echo off
echo ========================================
echo  INSTALANDO SUPABASE PARA TABIJI HOUSE
echo ========================================
echo.

cd /d "C:\DATOS M.2 MANUEL\Desktop\EIICHI-VISION-main"

echo Directorio actual: %CD%
echo.

echo Instalando @supabase/supabase-js...
npm install @supabase/supabase-js

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✅ Supabase instalado correctamente!
    echo.
    echo Iniciando servidor de desarrollo...
    npm run dev
) else (
    echo.
    echo ❌ Error al instalar Supabase
    echo.
    echo Intentando con --force...
    npm install @supabase/supabase-js --force
    
    if %ERRORLEVEL% EQU 0 (
        echo.
        echo ✅ Supabase instalado con --force!
        echo.
        echo Iniciando servidor de desarrollo...
        npm run dev
    ) else (
        echo.
        echo ❌ Error persistente. Intenta manualmente:
        echo npm install @supabase/supabase-js
        echo.
        pause
    )
)

pause
