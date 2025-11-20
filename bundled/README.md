# Bundled Components for Standalone Build

This folder contains Python and Tesseract that will be bundled into the installer.

## Setup

Run the automated setup:
```bash
npm run setup:bundled
npm run copy:tesseract
```

Or follow manual instructions in `ONE_CLICK_INSTALLER.md`

## Structure

```
bundled/
├── python-embed/          Python 3.11 embeddable
│   ├── python.exe
│   ├── python311.dll
│   ├── Lib/
│   │   └── site-packages/  (installed packages)
│   └── Scripts/
│       └── pip.exe
└── tesseract/             Tesseract OCR binaries
    ├── tesseract.exe
    ├── *.dll files
    └── tessdata/
        └── *.traineddata   (language files)
```

## What Gets Bundled

### Python Embedded (~30 MB)
- Python 3.11 runtime
- pip package manager
- Installed packages:
  - pytesseract
  - PyMuPDF (fitz)
  - Pillow (PIL)
  - Flask
  - numpy

### Tesseract OCR (~50 MB)
- tesseract.exe
- Required DLL files
- Language data files (tessdata/)

## Adding Languages

To add more OCR languages:

1. Download from: https://github.com/tesseract-ocr/tessdata
2. Copy `.traineddata` files to: `bundled/tesseract/tessdata/`
3. Rebuild the installer

## File Sizes

- Python: ~30 MB
- Python packages: ~15 MB
- Tesseract: ~50 MB
- **Total: ~95 MB** (added to base 155 MB app)

## Notes

- These files are NOT committed to git (see .gitignore)
- You must run setup scripts before building standalone
- Files are copied to `resources/` folder in the built app
- App automatically detects and uses bundled components
