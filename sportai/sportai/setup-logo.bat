@echo off
REM SportGrid Logo Setup Helper Script
REM This script helps you copy your logo to the public folder

setlocal enabledelayedexpansion

echo.
echo ========================================
echo   SportGrid Logo Installation Helper
echo ========================================
echo.

set "PUBLIC_FOLDER=c:\Users\devaprasath\OneDrive\图片\assessment\sportai\public"

echo Logo needs to be saved at:
echo %PUBLIC_FOLDER%\logo.png
echo.

if exist "%PUBLIC_FOLDER%\logo.png" (
    echo ✓ Logo file found!
    echo.
    dir "%PUBLIC_FOLDER%\logo.png"
    echo.
    echo Setup is complete. Restart the app to see your logo.
) else (
    echo ✗ Logo file not found!
    echo.
    echo Please save your SportGrit logo as:
    echo   %PUBLIC_FOLDER%\logo.png
    echo.
    echo Then run this script again.
    pause
)

echo.
echo To start the app, run:
echo   cd %PUBLIC_FOLDER% && cd .. && cd .. && npm start
echo.
pause
