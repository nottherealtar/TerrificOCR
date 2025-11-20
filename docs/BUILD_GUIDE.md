# Building TerrificOCR for Distribution

This guide explains how to create a standalone Windows installer that can be distributed to other users.

## Prerequisites

Before building, ensure you have:
- ✅ Node.js installed
- ✅ Python installed
- ✅ All dependencies installed (`npm install`)
- ✅ App tested and working (`npm run dev`)

## Quick Build

### Build Windows Installer:
```bash
npm run build:win
```

This will:
1. Build the React frontend
2. Package the Electron app
3. Create a Windows installer in `dist/` folder

### Output:
- `dist/TerrificOCR-Setup-1.0.0.exe` - Windows installer (NSIS)

## Distribution Package

The installer includes:
- ✅ Electron app with React UI
- ✅ Python scripts for OCR processing
- ✅ All dependencies bundled
- ❌ **Does NOT include:**
  - Python runtime (users need Python installed)
  - Tesseract OCR (users need to install separately)

## What Users Need to Install

Users downloading your app will need:

### 1. Python 3.8+
Download from: https://www.python.org/downloads/

### 2. Tesseract OCR
```bash
choco install tesseract
```
Or download from: https://github.com/UB-Mannheim/tesseract/wiki

### 3. Python Dependencies
After installing your app, users need to run:
```bash
cd "C:\Program Files\TerrificOCR\resources\python"
py -m pip install -r requirements.txt
```

## Creating a Fully Portable Version

To create a version that includes Python and Tesseract:

### Option 1: Bundle Python (Recommended)

1. Download Python embeddable package:
   - https://www.python.org/downloads/windows/
   - Get "Windows embeddable package (64-bit)"

2. Update `package.json` to include Python:
```json
"extraResources": [
  {
    "from": "python-embed",
    "to": "python-embed"
  }
]
```

3. Update `electron/main.js` to use bundled Python:
```javascript
const pythonPath = path.join(process.resourcesPath, 'python-embed', 'python.exe');
```

### Option 2: Create Installer with Prerequisites

Create a custom installer that:
1. Checks for Python
2. Checks for Tesseract
3. Installs them if missing
4. Installs Python dependencies
5. Installs TerrificOCR

## Build Configuration

### Icon
Place your app icon at `build/icon.ico` (256x256 recommended)

### Version
Update version in `package.json`:
```json
"version": "1.0.0"
```

### App Name
Already set to "TerrificOCR" in `package.json`

## Advanced Build Options

### Build for Different Architectures:
```bash
# 64-bit only (default)
npm run build:win

# 32-bit
electron-builder --win --ia32

# Both
electron-builder --win --x64 --ia32
```

### Portable Version (No Installer):
```json
"win": {
  "target": ["portable", "nsis"]
}
```

### Auto-Update Support:
Add to `package.json`:
```json
"publish": {
  "provider": "github",
  "owner": "your-username",
  "repo": "terrific-ocr"
}
```

## Testing the Installer

1. Build the installer:
   ```bash
   npm run build:win
   ```

2. Find installer in `dist/` folder

3. Test on a clean Windows VM:
   - Install Python
   - Install Tesseract
   - Run your installer
   - Install Python dependencies
   - Test the app

## Distribution Checklist

Before distributing:
- [ ] Test installer on clean Windows machine
- [ ] Verify all features work
- [ ] Create user documentation
- [ ] Include installation instructions
- [ ] Test with sample PDFs
- [ ] Check file associations
- [ ] Verify uninstaller works

## Creating Installation Instructions

Create a `INSTALL.md` for users:

```markdown
# Installing TerrificOCR

## Step 1: Install Prerequisites

1. Install Python 3.8+
2. Install Tesseract OCR
3. Restart your computer

## Step 2: Install TerrificOCR

1. Download `TerrificOCR-Setup-1.0.0.exe`
2. Run the installer
3. Follow the installation wizard

## Step 3: Install Python Dependencies

Open Command Prompt and run:
```bash
cd "C:\Program Files\TerrificOCR\resources\python"
py -m pip install -r requirements.txt
```

## Step 4: Launch

Double-click the TerrificOCR desktop icon!
```

## Troubleshooting Build Issues

### "electron-builder not found"
```bash
npm install --save-dev electron-builder
```

### "Python scripts not included"
Check `extraResources` in `package.json`

### "App won't start after install"
- Verify Python is in PATH
- Check Tesseract installation
- Run from command line to see errors

### Large installer size
- Remove unnecessary files from `python/` folder
- Exclude `node_modules` properly
- Use compression in NSIS settings

## File Size Optimization

Current size breakdown:
- Electron runtime: ~150 MB
- React app: ~5 MB
- Python scripts: <1 MB
- **Total: ~155 MB**

To reduce:
- Use `electron-builder` compression
- Remove unused Electron features
- Minimize React bundle

## Next Steps

After building:
1. Upload to GitHub Releases
2. Create download page
3. Write user documentation
4. Set up auto-updates (optional)
5. Create video tutorial

## Support

For build issues:
- Check electron-builder docs: https://www.electron.build/
- Verify all paths in `package.json`
- Test in development first: `npm run dev`
