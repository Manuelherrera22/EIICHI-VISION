@echo off
echo ========================================
echo TABIJI HOUSE - Development Server Check
echo ========================================
echo.

echo [1/5] Checking Node.js version...
node --version
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed or not in PATH
    pause
    exit /b 1
)
echo.

echo [2/5] Checking npm version...
npm --version
if %errorlevel% neq 0 (
    echo ERROR: npm is not installed or not in PATH
    pause
    exit /b 1
)
echo.

echo [3/5] Checking if port 3000 is available...
netstat -ano | findstr :3000 >nul
if %errorlevel% equ 0 (
    echo WARNING: Port 3000 is already in use!
    echo.
    echo Processes using port 3000:
    netstat -ano | findstr :3000
    echo.
    echo Do you want to kill these processes? (Y/N)
    set /p kill="> "
    if /i "%kill%"=="Y" (
        for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000') do (
            echo Killing process %%a...
            taskkill /PID %%a /F >nul 2>&1
        )
        echo Processes killed.
    ) else (
        echo Please free port 3000 manually or use a different port.
    )
) else (
    echo Port 3000 is available ✓
)
echo.

echo [4/5] Checking if .next folder exists...
if exist .next (
    echo .next folder exists
    echo.
    echo Do you want to clean it? (Y/N)
    set /p clean="> "
    if /i "%clean%"=="Y" (
        echo Cleaning .next folder...
        rmdir /s /q .next
        echo Cleaned ✓
    )
) else (
    echo .next folder does not exist (this is normal for first run)
)
echo.

echo [5/5] Checking node_modules...
if exist node_modules (
    echo node_modules exists ✓
) else (
    echo WARNING: node_modules does not exist!
    echo Run 'npm install' first.
    pause
    exit /b 1
)
echo.

echo ========================================
echo All checks completed!
echo ========================================
echo.
echo Starting development server...
echo Server will be available at: http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo ========================================
echo.

set FAST_REFRESH=false
set NODE_OPTIONS=--max-old-space-size=4096
npm run dev

pause

