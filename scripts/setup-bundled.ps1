# Setup script to create bundled standalone version
# Run this to prepare bundled Python and Tesseract

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  TerrificOCR Standalone Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$bundledDir = "bundled"
$pythonDir = "$bundledDir/python-embed"
$tesseractDir = "$bundledDir/tesseract"

# Create directories
Write-Host "Creating directories..." -ForegroundColor Yellow
New-Item -ItemType Directory -Force -Path $bundledDir | Out-Null
New-Item -ItemType Directory -Force -Path $pythonDir | Out-Null
New-Item -ItemType Directory -Force -Path $tesseractDir | Out-Null

# Download Python Embeddable
Write-Host ""
Write-Host "Step 1: Download Python Embeddable" -ForegroundColor Green
$pythonUrl = "https://www.python.org/ftp/python/3.11.9/python-3.11.9-embed-amd64.zip"
$pythonZip = "$bundledDir/python-embed.zip"

if (Test-Path $pythonZip) {
    Write-Host "Python zip already exists, skipping download" -ForegroundColor Gray
} else {
    Write-Host "Downloading Python 3.11.9 embeddable..." -ForegroundColor Yellow
    Invoke-WebRequest -Uri $pythonUrl -OutFile $pythonZip
    Write-Host "Downloaded!" -ForegroundColor Green
}

# Extract Python
Write-Host "Extracting Python..." -ForegroundColor Yellow
Expand-Archive -Path $pythonZip -DestinationPath $pythonDir -Force
Write-Host "Extracted!" -ForegroundColor Green

# Configure Python to use site-packages
Write-Host ""
Write-Host "Step 2: Configure Python" -ForegroundColor Green
$pthFile = Get-ChildItem -Path $pythonDir -Filter "python*._pth" | Select-Object -First 1
if ($pthFile) {
    $content = Get-Content $pthFile.FullName
    $content = $content -replace "#import site", "import site"
    $content += "`nLib/site-packages"
    Set-Content -Path $pthFile.FullName -Value $content
    Write-Host "Python configured!" -ForegroundColor Green
}

# Download and install pip
Write-Host ""
Write-Host "Step 3: Install pip" -ForegroundColor Green
$getPipUrl = "https://bootstrap.pypa.io/get-pip.py"
$getPipPath = "$pythonDir/get-pip.py"

Write-Host "Downloading get-pip.py..." -ForegroundColor Yellow
Invoke-WebRequest -Uri $getPipUrl -OutFile $getPipPath

Write-Host "Installing pip..." -ForegroundColor Yellow
& "$pythonDir/python.exe" $getPipPath
Write-Host "pip installed!" -ForegroundColor Green

# Install Python packages
Write-Host ""
Write-Host "Step 4: Install Python packages" -ForegroundColor Green
Write-Host "This may take a few minutes..." -ForegroundColor Yellow

$packages = @("pytesseract", "pymupdf", "Pillow", "flask", "numpy")
foreach ($package in $packages) {
    Write-Host "Installing $package..." -ForegroundColor Gray
    & "$pythonDir/python.exe" -m pip install $package --no-warn-script-location
}
Write-Host "All packages installed!" -ForegroundColor Green

# Download Tesseract
Write-Host ""
Write-Host "Step 5: Download Tesseract" -ForegroundColor Green
Write-Host "Please download Tesseract manually:" -ForegroundColor Yellow
Write-Host "1. Go to: https://digi.bib.uni-mannheim.de/tesseract/" -ForegroundColor Cyan
Write-Host "2. Download: tesseract-ocr-w64-setup-5.3.3.20231005.exe" -ForegroundColor Cyan
Write-Host "3. Install it temporarily" -ForegroundColor Cyan
Write-Host "4. Copy these files to $tesseractDir :" -ForegroundColor Cyan
Write-Host "   - tesseract.exe" -ForegroundColor Gray
Write-Host "   - All DLL files" -ForegroundColor Gray
Write-Host "   - tessdata folder (with language files)" -ForegroundColor Gray
Write-Host ""
Write-Host "Or run: choco install tesseract" -ForegroundColor Yellow
Write-Host "Then copy from: C:\Program Files\Tesseract-OCR\" -ForegroundColor Yellow

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Setup Complete!" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Green
Write-Host "1. Copy Tesseract files to $tesseractDir" -ForegroundColor Yellow
Write-Host "2. Run: npm run build:standalone" -ForegroundColor Yellow
Write-Host ""
