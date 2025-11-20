# Copy Tesseract from system installation to bundled folder

$tesseractSource = "C:\Program Files\Tesseract-OCR"
$tesseractDest = "bundled\tesseract"

Write-Host "Copying Tesseract from $tesseractSource to $tesseractDest" -ForegroundColor Yellow

if (-not (Test-Path $tesseractSource)) {
    Write-Host "Error: Tesseract not found at $tesseractSource" -ForegroundColor Red
    Write-Host "Please install Tesseract first: choco install tesseract" -ForegroundColor Yellow
    exit 1
}

# Create destination
New-Item -ItemType Directory -Force -Path $tesseractDest | Out-Null

# Copy tesseract.exe
Copy-Item "$tesseractSource\tesseract.exe" -Destination $tesseractDest -Force
Write-Host "Copied tesseract.exe" -ForegroundColor Green

# Copy all DLLs
Get-ChildItem "$tesseractSource\*.dll" | ForEach-Object {
    Copy-Item $_.FullName -Destination $tesseractDest -Force
    Write-Host "Copied $($_.Name)" -ForegroundColor Gray
}

# Copy tessdata folder
Copy-Item "$tesseractSource\tessdata" -Destination $tesseractDest -Recurse -Force
Write-Host "Copied tessdata folder" -ForegroundColor Green

Write-Host ""
Write-Host "Tesseract copied successfully!" -ForegroundColor Green
Write-Host "You can now run: npm run build:standalone" -ForegroundColor Yellow
