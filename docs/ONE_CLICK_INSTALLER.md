# Creating a One-Click Installer for TerrificOCR

This guide shows how to create a **single installer** that includes everything users need.

## Goal

Users download ONE file (~250 MB) and:
1. Run the installer
2. Click "Install"
3. Launch TerrificOCR
4. **Done!** No prerequisites, no setup, just works.

## Quick Build (Automated)

### Step 1: Setup Bundled Components

```bash
npm run setup:bundled
```

This will:
- Download Python 3.11 embeddable (~30 MB)
- Extract and configure it
- Install pip
- Install all Python packages (pytesseract, PyMuPDF, etc.)

### Step 2: Copy Tesseract

If you have Tesseract installed:
```bash
npm run copy:tesseract
```

Or manually copy from `C:\Program Files\Tesseract-OCR\` to `bundled\tesseract\`

### Step 3: Build Standalone Installer

```bash
npm run build:standalone
```

**Output:** `dist/TerrificOCR-Setup-1.0.0.exe` (~250 MB)

## What Gets Bundled

Your installer includes:

```
TerrificOCR-Setup-1.0.0.exe
├── Electron App (~155 MB)
│   ├── React UI
│   ├── Node.js runtime
│   └── Electron framework
├── Python Embedded (~30 MB)
│   ├── python.exe
│   ├── Standard library
│   └── Installed packages
│       ├── pytesseract
│       ├── PyMuPDF
│       ├── Pillow
│       ├── Flask
│       └── numpy
└── Tesseract OCR (~50 MB)
    ├── tesseract.exe
    ├── DLL files
    └── tessdata/
        └── eng.traineddata (+ other languages)
```

## Manual Setup (If Automated Fails)

### 1. Create Bundled Directory Structure

```
bundled/
├── python-embed/
└── tesseract/
```

### 2. Download Python Embeddable

Download: https://www.python.org/ftp/python/3.11.9/python-3.11.9-embed-amd64.zip

Extract to: `bundled/python-embed/`

### 3. Configure Python

Edit `bundled/python-embed/python311._pth`:
```
python311.zip
.
Lib/site-packages

# Uncomment this line:
import site
```

### 4. Install pip

```bash
cd bundled/python-embed
curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
python.exe get-pip.py
```

### 5. Install Python Packages

```bash
cd bundled/python-embed
python.exe -m pip install pytesseract pymupdf Pillow flask numpy
```

### 6. Copy Tesseract

From: `C:\Program Files\Tesseract-OCR\`
To: `bundled\tesseract\`

Copy:
- `tesseract.exe`
- All `.dll` files
- `tessdata/` folder (with language files)

### 7. Build

```bash
npm run build:standalone
```

## File Structure After Setup

```
TerrificOCR/
├── bundled/
│   ├── python-embed/
│   │   ├── python.exe
│   │   ├── python311.dll
│   │   ├── python311.zip
│   │   ├── Lib/
│   │   │   └── site-packages/
│   │   │       ├── pytesseract/
│   │   │       ├── fitz/ (PyMuPDF)
│   │   │       ├── PIL/ (Pillow)
│   │   │       └── ...
│   │   └── Scripts/
│   │       └── pip.exe
│   └── tesseract/
│       ├── tesseract.exe
│       ├── leptonica-1.85.0.dll
│       ├── (other DLLs)
│       └── tessdata/
│           ├── eng.traineddata
│           ├── chi_sim.traineddata
│           └── ...
├── electron/
├── src/
├── python/
└── package.json
```

## How It Works

### Development Mode
- Uses system Python
- Uses system Tesseract
- Reads from `C:\Program Files\Tesseract-OCR\`

### Production Mode (Bundled)
- Uses `resources/python-embed/python.exe`
- Uses `resources/tesseract/tesseract.exe`
- Everything is self-contained

### Configuration Detection

The app automatically detects:
1. If running in development or production
2. If bundled resources exist
3. Falls back to system installation if needed

## User Experience

### Installation:
1. Download `TerrificOCR-Setup-1.0.0.exe`
2. Double-click to run
3. Choose installation location
4. Click "Install"
5. Wait 30 seconds
6. Click "Finish"

### First Launch:
1. Double-click desktop shortcut
2. App opens immediately
3. Drag PDF file
4. Click "Start Processing"
5. View results

**No configuration needed!**

## File Sizes

| Component | Size |
|-----------|------|
| Electron + React | ~155 MB |
| Python Embedded | ~30 MB |
| Python Packages | ~15 MB |
| Tesseract + Data | ~50 MB |
| **Total Installer** | **~250 MB** |

## Advantages

✅ **One-click installation** - No prerequisites
✅ **Works offline** - Everything bundled
✅ **No conflicts** - Isolated from system Python/Tesseract
✅ **Portable** - Can run from USB drive
✅ **No PATH issues** - Self-contained
✅ **Professional** - Like commercial software

## Disadvantages

❌ **Larger download** - 250 MB vs 155 MB
❌ **More complex build** - Need to bundle components
❌ **Update overhead** - Must update bundled components

## Adding More Languages

To include more Tesseract languages:

1. Download language files from: https://github.com/tesseract-ocr/tessdata
2. Copy `.traineddata` files to: `bundled/tesseract/tessdata/`
3. Rebuild: `npm run build:standalone`

Common languages:
- `fra.traineddata` - French
- `deu.traineddata` - German
- `spa.traineddata` - Spanish
- `chi_sim.traineddata` - Chinese Simplified
- `jpn.traineddata` - Japanese
- `kor.traineddata` - Korean

## Troubleshooting

### "Python not found" during build
- Run `npm run setup:bundled` first
- Check `bundled/python-embed/python.exe` exists

### "Tesseract not found" during build
- Run `npm run copy:tesseract` first
- Or manually copy to `bundled/tesseract/`

### Build fails with "extraResources not found"
- Ensure `bundled/` folder exists
- Check folder structure matches guide

### Installer too large
- Remove unused language files from `tessdata/`
- Use compression in electron-builder
- Remove unnecessary Python packages

## Testing the Standalone Build

1. Build the installer
2. Copy to a clean Windows VM
3. **Do NOT install Python or Tesseract**
4. Run the installer
5. Launch TerrificOCR
6. Test OCR functionality

If it works without prerequisites, you're done! ✅

## Distribution

Your standalone installer is ready to distribute:

```
dist/TerrificOCR-Setup-1.0.0.exe  (~250 MB)
```

Upload to:
- GitHub Releases
- Your website
- Microsoft Store
- SourceForge
- Download.com

## User Instructions (Simple!)

```
Installing TerrificOCR
======================

1. Download TerrificOCR-Setup-1.0.0.exe
2. Run the installer
3. Click "Install"
4. Launch TerrificOCR

That's it! No other software needed.
```

## Comparison

### Regular Build (155 MB)
- Users install Python
- Users install Tesseract
- Users install Python packages
- **Setup time: 10-15 minutes**

### Standalone Build (250 MB)
- Users run installer
- **Setup time: 1 minute**

**The extra 95 MB is worth it for the user experience!**

## Summary

**Build standalone installer:**
```bash
npm run setup:bundled
npm run copy:tesseract
npm run build:standalone
```

**Result:**
- One installer file
- No prerequisites
- One-click installation
- Professional user experience

**Users love it because:**
- Download once
- Install once
- Works immediately
- No technical knowledge needed

🎉 **This is the recommended approach for distribution!**
