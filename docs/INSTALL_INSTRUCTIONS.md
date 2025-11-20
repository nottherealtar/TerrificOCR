# TerrificOCR Installation Instructions

## For End Users

### Prerequisites (Install These First)

#### 1. Python 3.8 or Higher
**Download:** https://www.python.org/downloads/

**Installation:**
- Run the Python installer
- ✅ **IMPORTANT:** Check "Add Python to PATH"
- Click "Install Now"
- Restart your computer

**Verify Installation:**
```bash
py --version
```
Should show: `Python 3.x.x`

#### 2. Tesseract OCR
**Option A - Using Chocolatey (Easiest):**
```bash
choco install tesseract
```

**Option B - Manual Download:**
1. Download from: https://github.com/UB-Mannheim/tesseract/wiki
2. Run `tesseract-ocr-w64-setup-5.x.x.exe`
3. Install to default location: `C:\Program Files\Tesseract-OCR`
4. Restart your computer

**Verify Installation:**
```bash
"C:\Program Files\Tesseract-OCR\tesseract.exe" --version
```
Should show: `tesseract v5.x.x`

### Installing TerrificOCR

#### Step 1: Download
Download `TerrificOCR-Setup-1.0.0.exe` from the releases page

#### Step 2: Run Installer
1. Double-click `TerrificOCR-Setup-1.0.0.exe`
2. Choose installation location (default: `C:\Program Files\TerrificOCR`)
3. Select "Create desktop shortcut"
4. Click "Install"
5. Wait for installation to complete

#### Step 3: Install Python Dependencies
Open Command Prompt (cmd) and run:
```bash
cd "C:\Program Files\TerrificOCR\resources\python"
py -m pip install -r requirements.txt
```

This installs:
- pytesseract (OCR wrapper)
- PyMuPDF (PDF processing)
- Pillow (Image handling)
- Flask (Backend service)

**Wait for installation to complete** (may take 2-3 minutes)

#### Step 4: Launch TerrificOCR
- Double-click the desktop shortcut, OR
- Search for "TerrificOCR" in Start Menu

### First Run

1. The app will open with a purple gradient header
2. Try processing a sample PDF:
   - Drag a PDF into the drop zone
   - Click "Start Processing"
   - View results in the preview panel

## Troubleshooting

### "Python not found" Error
**Solution:**
1. Verify Python is installed: `py --version`
2. If not found, reinstall Python with "Add to PATH" checked
3. Restart your computer

### "Tesseract not found" Error
**Solution:**
1. Verify Tesseract is installed
2. Check path: `"C:\Program Files\Tesseract-OCR\tesseract.exe" --version`
3. If wrong location, edit: `C:\Program Files\TerrificOCR\resources\python\config.py`

### "Module not found" Error
**Solution:**
Run the pip install command again:
```bash
cd "C:\Program Files\TerrificOCR\resources\python"
py -m pip install -r requirements.txt
```

### App Won't Start
**Solution:**
1. Check if Python is in PATH
2. Verify Tesseract is installed
3. Run from Command Prompt to see errors:
   ```bash
   "C:\Program Files\TerrificOCR\TerrificOCR.exe"
   ```

### Poor OCR Quality
**Solution:**
- Select correct language in settings
- Use high-quality PDF scans (300 DPI+)
- Ensure text is clear and not too small

## Uninstalling

### Windows 10/11:
1. Open Settings
2. Go to Apps > Installed apps
3. Find "TerrificOCR"
4. Click "Uninstall"

### Or use Control Panel:
1. Open Control Panel
2. Programs > Uninstall a program
3. Select "TerrificOCR"
4. Click "Uninstall"

## System Requirements

- **OS:** Windows 10 or Windows 11 (64-bit)
- **RAM:** 4 GB minimum, 8 GB recommended
- **Disk Space:** 500 MB for app + dependencies
- **Python:** 3.8 or higher
- **Tesseract:** 5.0 or higher

## Additional Language Support

To add more languages for OCR:

### Install Language Packs:
```bash
choco install tesseract-language-pack-all
```

### Or download specific languages:
1. Go to: https://github.com/tesseract-ocr/tessdata
2. Download language files (e.g., `spa.traineddata` for Spanish)
3. Copy to: `C:\Program Files\Tesseract-OCR\tessdata`

## Getting Help

- **Documentation:** See `USAGE_GUIDE.md` in installation folder
- **Features:** See `FEATURES.md` for complete feature list
- **Issues:** Report bugs on GitHub

## Quick Start Guide

1. **Add PDFs:** Drag & drop or click "Browse Files"
2. **Configure:** Choose output format and language
3. **Process:** Click "Start Processing"
4. **View:** Click "📄 View Output" button
5. **Search:** Use search bar to find text

Enjoy using TerrificOCR! 🚀
