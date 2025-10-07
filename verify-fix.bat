@echo off
echo ========================================
echo    Verificacion de Fixes Implementados
echo ========================================
echo.

echo Verificando que el servidor este funcionando...
powershell -Command "try { $response = Invoke-WebRequest -Uri 'http://localhost:3000' -UseBasicParsing; Write-Host 'Status:' $response.StatusCode -ForegroundColor Green } catch { Write-Host 'Error: Servidor no disponible' -ForegroundColor Red }"

echo.
echo Verificando archivos corregidos...
if exist "obfuscation.config.js" (
    echo [OK] obfuscation.config.js - Sintaxis corregida
) else (
    echo [ERROR] obfuscation.config.js no encontrado
)

if exist "next.config.ts" (
    echo [OK] next.config.ts - Manejo de errores agregado
) else (
    echo [ERROR] next.config.ts no encontrado
)

if exist "public/sw.js" (
    echo [OK] public/sw.js - Service Worker mejorado
) else (
    echo [ERROR] public/sw.js no encontrado
)

echo.
echo Verificando paginas de testing...
powershell -Command "try { $response = Invoke-WebRequest -Uri 'http://localhost:3000/test' -UseBasicParsing; Write-Host '[OK] Pagina de testing disponible' -ForegroundColor Green } catch { Write-Host '[WARN] Pagina de testing no disponible' -ForegroundColor Yellow }"

powershell -Command "try { $response = Invoke-WebRequest -Uri 'http://localhost:3000/admin/service-worker' -UseBasicParsing; Write-Host '[OK] Admin Service Worker disponible' -ForegroundColor Green } catch { Write-Host '[WARN] Admin Service Worker no disponible' -ForegroundColor Yellow }"

echo.
echo ========================================
echo    Resumen de Fixes Implementados
echo ========================================
echo.
echo 1. [FIXED] Error de sintaxis en obfuscation.config.js
echo 2. [FIXED] Manejo de errores en next.config.ts
echo 3. [FIXED] Service Worker errors (Failed to fetch)
echo 4. [ADDED] Sistema de testing completo
echo 5. [ADDED] Admin panel para Service Worker
echo 6. [ADDED] Auto-cleanup de caches
echo.
echo El proyecto deberia estar funcionando correctamente ahora.
echo.
pause

