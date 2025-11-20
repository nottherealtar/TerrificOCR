@echo off
title TerrificOCR Setup Helper
color 0A

echo ========================================
echo   TerrificOCR Setup Helper
echo ========================================
echo.

echo This script will install Python dependencies for TerrificOCR.
echo.
echo Prerequisites:
echo   - Python 3.8+ installed
echo   - Tesseract OCR installed
echo   - TerrificOCR installed
echo.
pause

echo.
echo Checking Python installation...
py --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Python not found!
    echo Please install Python from: https://www.python.org/downloads/
    echo Make sure to check "Add Python to PATH" during installation.
    pause
    exit /b 1
)
echo [OK] Python found!

echo.
echo Checking Tesseract installation...
"C:\Program Files\Tesseract-OCR\tesseract.exe" --version >nul 2>&1
if errorlevel 1 (
    echo [WARNING] Tesseract not found at default location.
    echo Please install Tesseract from: https://github.com/UB-Mannheim/tesseract/wiki
    echo Or install via: choco install tesseract
    pause
)
echo [OK] Tesseract found!

echo.
echo Installing Python packages...
echo This may take 2-3 minutes...
echo.

cd /d "%ProgramFiles%\TerrificOCR\resources\python"
if errorlevel 1 (
    echo [ERROR] TerrificOCR installation folder not found!
    echo Please install TerrificOCR first.
    pause
    exit /b 1
)

py -m pip install -r requirements.txt

if errorlevel 1 (
    echo.
    echo [ERROR] Failed to install Python packages!
    echo Please check your internet connection and try again.
    pause
    exit /b 1
)

echo.
echo ========================================
echo   Setup Complete!
echo ========================================
echo.
echo TerrificOCR is ready to use!
echo You can now launch it from the desktop shortcut.
echo.
pause
