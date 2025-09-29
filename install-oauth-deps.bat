@echo off
echo ========================================
echo    INSTALANDO DEPENDENCIAS OAUTH
echo    TABIJI HOUSE
echo ========================================
echo.

cd /d "C:\DATOS M.2 MANUEL\Desktop\EIICHI-VISION-main"

echo Instalando @auth0/nextjs-auth0...
npm install @auth0/nextjs-auth0@^3.5.0

echo.
echo Instalando next-auth...
npm install next-auth@^4.24.5

echo.
echo ========================================
echo    INSTALACION COMPLETADA
echo ========================================
echo.
echo Presiona cualquier tecla para continuar...
pause > nul

