# TerrificOCR Distribution Guide

## Quick Build for Distribution

### Step 1: Build the Installer
```bash
npm run build:win
```

### Step 2: Find Your Installer
Look in the `dist/` folder:
- `TerrificOCR-Setup-1.0.0.exe` - This is your installer!

### Step 3: Test It
1. Copy the installer to another PC (or VM)
2. Install Python and Tesseract on that PC
3. Run your installer
4. Install Python dependencies
5. Test the app

### Step 4: Distribute
Upload `TerrificOCR-Setup-1.0.0.exe` to:
- GitHub Releases
- Your website
- Google Drive / Dropbox
- Microsoft Store (requires additional setup)

## What Gets Packaged

Your installer includes:
```
TerrificOCR-Setup-1.0.0.exe
├── Electron app (~150 MB)
├── React frontend (built)
├── Python scripts
│   ├── config.py
│   ├── process_pdf.py
│   ├── ocr_service.py
│   └── requirements.txt
└── Node.js runtime
```

## What Users Need to Install Separately

Users must install:
1. **Python 3.8+** - https://www.python.org/downloads/
2. **Tesseract OCR** - https://github.com/UB-Mannheim/tesseract/wiki
3. **Python packages** - Via pip after installing your app

## Installation Flow for Users

```
1. Download TerrificOCR-Setup-1.0.0.exe
2. Install Python (if not installed)
3. Install Tesseract (if not installed)
4. Run TerrificOCR-Setup-1.0.0.exe
5. Open Command Prompt
6. cd "C:\Program Files\TerrificOCR\resources\python"
7. py -m pip install -r requirements.txt
8. Launch TerrificOCR from desktop shortcut
```

## Creating a Release Package

### Complete Release Package Should Include:

1. **TerrificOCR-Setup-1.0.0.exe** - Main installer
2. **INSTALL_INSTRUCTIONS.md** - User installation guide
3. **README.md** - Overview and features
4. **Sample PDFs** - For testing (optional)

### Recommended Release Structure:
```
TerrificOCR-v1.0.0/
├── TerrificOCR-Setup-1.0.0.exe
├── INSTALL_INSTRUCTIONS.md
├── README.md
└── samples/
    └── sample.pdf
```

Zip this folder and upload as a release.

## GitHub Release Example

### Create a Release on GitHub:

1. Go to your repository
2. Click "Releases" → "Create a new release"
3. Tag: `v1.0.0`
4. Title: `TerrificOCR v1.0.0 - Initial Release`
5. Description:
```markdown
# TerrificOCR v1.0.0

Fast and accurate OCR for PDF documents on Windows.

## Features
- 📄 Single & batch PDF processing
- 🌍 Multi-language support
- 👁️ Output preview with search
- 🔍 Real-time text search
- 📊 Progress tracking

## Installation

### Prerequisites
1. [Python 3.8+](https://www.python.org/downloads/)
2. [Tesseract OCR](https://github.com/UB-Mannheim/tesseract/wiki)

### Install TerrificOCR
1. Download `TerrificOCR-Setup-1.0.0.exe`
2. Run the installer
3. Install Python dependencies:
   ```bash
   cd "C:\Program Files\TerrificOCR\resources\python"
   py -m pip install -r requirements.txt
   ```

See [INSTALL_INSTRUCTIONS.md](INSTALL_INSTRUCTIONS.md) for detailed steps.

## What's New
- Initial release
- Tesseract OCR integration
- Modern React UI
- Batch processing
- Output preview panel
- Search functionality
```

6. Upload files:
   - `TerrificOCR-Setup-1.0.0.exe`
   - `INSTALL_INSTRUCTIONS.md`

7. Publish release

## Alternative: Portable Version

To create a portable version (no installer):

### Update package.json:
```json
"win": {
  "target": ["portable", "nsis"]
}
```

### Build:
```bash
npm run build:win
```

### Output:
- `TerrificOCR-1.0.0-portable.exe` - Single executable, no installation needed

Users can:
1. Download the portable exe
2. Run it from any folder
3. No admin rights needed

## Creating a Complete Standalone Package

For a truly standalone version that includes everything:

### Option 1: Bundle Python Embeddable

1. Download Python embeddable: https://www.python.org/downloads/windows/
2. Extract to `python-embed/` folder
3. Install packages into it:
   ```bash
   python-embed\python.exe -m pip install -r requirements.txt
   ```
4. Update `package.json`:
   ```json
   "extraResources": [
     {
       "from": "python-embed",
       "to": "python-embed"
     }
   ]
   ```
5. Update `electron/main.js` to use bundled Python

### Option 2: Create Custom Installer

Use Inno Setup or NSIS to create an installer that:
1. Checks for Python
2. Downloads/installs Python if missing
3. Checks for Tesseract
4. Downloads/installs Tesseract if missing
5. Installs TerrificOCR
6. Installs Python packages automatically

## File Size Considerations

Current installer size: **~155 MB**

Breakdown:
- Electron runtime: 150 MB
- React app: 5 MB
- Python scripts: <1 MB

With bundled Python: **~180 MB**
With bundled Tesseract: **~220 MB**

## Code Signing (Optional but Recommended)

To avoid "Unknown Publisher" warnings:

1. Get a code signing certificate
2. Add to `package.json`:
```json
"win": {
  "certificateFile": "path/to/cert.pfx",
  "certificatePassword": "password"
}
```

## Auto-Updates (Optional)

To enable automatic updates:

1. Set up GitHub releases
2. Add to `package.json`:
```json
"publish": {
  "provider": "github",
  "owner": "your-username",
  "repo": "terrific-ocr"
}
```

3. In `electron/main.js`, add:
```javascript
const { autoUpdater } = require('electron-updater');
autoUpdater.checkForUpdatesAndNotify();
```

## Distribution Checklist

Before releasing:
- [ ] Test on clean Windows 10 machine
- [ ] Test on clean Windows 11 machine
- [ ] Verify all features work
- [ ] Test with various PDF files
- [ ] Check installation/uninstallation
- [ ] Verify Python dependency installation
- [ ] Test Tesseract integration
- [ ] Create user documentation
- [ ] Add app icon
- [ ] Update version number
- [ ] Create release notes
- [ ] Test installer on different Windows versions

## Support After Release

Provide users with:
1. **Installation guide** - INSTALL_INSTRUCTIONS.md
2. **Usage guide** - USAGE_GUIDE.md
3. **FAQ** - Common issues and solutions
4. **GitHub Issues** - For bug reports
5. **Video tutorial** - YouTube walkthrough (optional)

## Version Updates

When releasing updates:

1. Update version in `package.json`
2. Build new installer
3. Create new GitHub release
4. Update changelog
5. Notify users

## Marketing Your Release

Share on:
- Reddit (r/software, r/productivity)
- Product Hunt
- Hacker News
- Twitter/X
- LinkedIn
- Your blog/website

## Summary

**To distribute TerrificOCR:**

1. Run `npm run build:win`
2. Get `dist/TerrificOCR-Setup-1.0.0.exe`
3. Upload to GitHub Releases
4. Share download link
5. Provide installation instructions

**Users need:**
- Python 3.8+
- Tesseract OCR
- Your installer
- 5 minutes to set up

That's it! 🚀
