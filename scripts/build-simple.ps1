# Simple build script that bypasses code signing issues

Write-Host "Building TerrificOCR..." -ForegroundColor Cyan

# Set environment variables to skip code signing
$env:CSC_IDENTITY_AUTO_DISCOVERY = "false"

# Build React app
Write-Host "Building React app..." -ForegroundColor Yellow
npm run build

# Package with electron-builder
Write-Host "Packaging Electron app..." -ForegroundColor Yellow
npx electron-builder --win

Write-Host "Build complete!" -ForegroundColor Green
Write-Host "Check dist/ folder for the installer" -ForegroundColor Yellow
