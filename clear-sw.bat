@echo off
echo ========================================
echo    Tabiji House Service Worker Cleanup
echo ========================================
echo.

echo This script will help you clear Service Worker issues.
echo.
echo Options:
echo 1. Open Service Worker Admin Page
echo 2. Open Browser Console for Manual Cleanup
echo 3. Clear Browser Cache Instructions
echo 4. Exit
echo.

:menu
set /p choice="Enter your choice (1-4): "

if "%choice%"=="1" (
    echo Opening Service Worker Admin Page...
    start http://localhost:3000/admin/service-worker
    goto menu
) else if "%choice%"=="2" (
    echo.
    echo ========================================
    echo    Manual Console Commands
    echo ========================================
    echo.
    echo Copy and paste these commands in your browser console:
    echo.
    echo 1. Clear all caches:
    echo caches.keys().then(names =^> Promise.all(names.map(name =^> caches.delete(name))));
    echo.
    echo 2. Unregister Service Workers:
    echo navigator.serviceWorker.getRegistrations().then(regs =^> Promise.all(regs.map(reg =^> reg.unregister())));
    echo.
    echo 3. Reload page:
    echo window.location.reload();
    echo.
    pause
    goto menu
) else if "%choice%"=="3" (
    echo.
    echo ========================================
    echo    Browser Cache Clear Instructions
    echo ========================================
    echo.
    echo Chrome/Edge:
    echo 1. Press F12 to open DevTools
    echo 2. Right-click the refresh button
    echo 3. Select "Empty Cache and Hard Reload"
    echo.
    echo Firefox:
    echo 1. Press Ctrl+Shift+R for hard refresh
    echo 2. Or press F12, go to Network tab, check "Disable cache"
    echo.
    echo Safari:
    echo 1. Press Cmd+Option+R for hard refresh
    echo 2. Or go to Develop menu ^> Empty Caches
    echo.
    pause
    goto menu
) else if "%choice%"=="4" (
    echo Goodbye!
    exit /b 0
) else (
    echo Invalid choice. Please try again.
    goto menu
)

