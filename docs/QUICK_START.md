# Quick Start - Building Your Installer

## For You (Developer)

### Build the Windows Installer:

```bash
# 1. Make sure everything works first
npm run dev

# 2. Build the installer
npm run build:win
```

### Find Your Installer:
```
dist/TerrificOCR-Setup-1.0.0.exe  ← This is it!
```

### File Size:
Approximately **155 MB**

## For Your Users

### They Need to Install (One Time):

1. **Python 3.8+**
   ```bash
   # Download from: https://www.python.org/downloads/
   # ✅ Check "Add Python to PATH" during installation
   ```

2. **Tesseract OCR**
   ```bash
   choco install tesseract
   # Or download from: https://github.com/UB-Mannheim/tesseract/wiki
   ```

3. **Your App**
   ```bash
   # Run: TerrificOCR-Setup-1.0.0.exe
   ```

4. **Python Packages**
   ```bash
   cd "C:\Program Files\TerrificOCR\resources\python"
   py -m pip install -r requirements.txt
   ```

### Then They Can Use It:
- Double-click desktop shortcut
- Start processing PDFs!

## Distribution Options

### Option 1: GitHub Release (Recommended)
1. Create release on GitHub
2. Upload `TerrificOCR-Setup-1.0.0.exe`
3. Share the release link

### Option 2: Direct Download
1. Upload to Google Drive / Dropbox
2. Share the download link
3. Include `INSTALL_INSTRUCTIONS.md`

### Option 3: Website
1. Host on your website
2. Create download page
3. Add installation guide

## What's Included in the Installer

✅ Electron app with UI  
✅ Python OCR scripts  
✅ All JavaScript dependencies  
❌ Python runtime (users install)  
❌ Tesseract OCR (users install)  
❌ Python packages (users install)  

## Making It Easier for Users

### Create a Setup Script:

Save as `setup.bat` and distribute with your installer:

```batch
@echo off
echo TerrificOCR Setup Helper
echo.

echo Step 1: Installing Python packages...
cd "C:\Program Files\TerrificOCR\resources\python"
py -m pip install -r requirements.txt

echo.
echo Setup complete! You can now launch TerrificOCR.
pause
```

Users can:
1. Install Python
2. Install Tesseract  
3. Run your installer
4. Run `setup.bat` (installs Python packages automatically)
5. Launch app

## Testing Your Installer

Before distributing:

1. **Test on a clean PC** (or VM)
2. **Install prerequisites** (Python, Tesseract)
3. **Run your installer**
4. **Install Python packages**
5. **Test all features**

## Common User Issues

### "Python not found"
→ User needs to install Python with "Add to PATH" checked

### "Tesseract not found"  
→ User needs to install Tesseract OCR

### "Module not found"
→ User needs to run: `py -m pip install -r requirements.txt`

## Next Steps

1. ✅ Build installer: `npm run build:win`
2. ✅ Test on another PC
3. ✅ Create GitHub release
4. ✅ Write installation guide
5. ✅ Share with users!

## Need Help?

- See `BUILD_GUIDE.md` for detailed build instructions
- See `DISTRIBUTION.md` for distribution options
- See `INSTALL_INSTRUCTIONS.md` for user installation guide

---

**TL;DR:**
```bash
npm run build:win
# → dist/TerrificOCR-Setup-1.0.0.exe
# → Upload and share!
```
