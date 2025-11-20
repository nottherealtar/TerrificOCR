# Build Issue Workaround - Symlink Error

## The Problem

You're seeing this error when building:
```
ERROR: Cannot create symbolic link : A required privilege is not held by the client.
```

This is a known electron-builder issue on Windows. It's trying to extract macOS code signing tools (which you don't need for Windows builds) but fails due to Windows symlink restrictions.

## Solution 1: Run as Administrator (Easiest)

1. Open PowerShell **as Administrator**
2. Navigate to your project:
   ```powershell
   cd C:\Users\nottherealtarPC\Documents\Github\TerrificOCR
   ```
3. Run the build:
   ```powershell
   npm run build:standalone
   ```

This will allow the symlinks to be created (even though they're not needed).

## Solution 2: Enable Developer Mode (Permanent Fix)

1. Open Windows Settings
2. Go to **Update & Security** → **For developers**
3. Turn on **Developer Mode**
4. Restart your computer
5. Run `npm run build:standalone`

Developer Mode allows symlinks without admin rights.

## Solution 3: Manual Cache Fix

Delete the problematic cache and let it rebuild:

```powershell
Remove-Item -Recurse -Force "$env:LOCALAPPDATA\electron-builder\Cache"
npm run build:standalone
```

## Solution 4: Use Portable Build

Instead of NSIS installer, create a portable version:

Update `package.json`:
```json
"win": {
  "target": ["portable"]
}
```

Then run:
```bash
npm run build:standalone
```

This creates a single `.exe` file that doesn't need installation.

## Solution 5: Build Without Bundled Components

If you just want to test the build process, build without the bundled Python/Tesseract:

```bash
npm run build:win
```

This creates a smaller installer (~155 MB) that requires users to install Python and Tesseract separately.

## What's Actually Happening

- electron-builder downloads code signing tools for all platforms
- The macOS tools include symlinks
- Windows requires admin rights or Developer Mode for symlinks
- The build **might still work** despite the errors

## Check If Build Succeeded Anyway

Even with the errors, check if the installer was created:

```powershell
dir dist\*.exe
```

If you see `TerrificOCR-Setup-1.0.0.exe`, the build succeeded!

## Recommended Approach

**For development/testing:**
- Use Solution 1 (run as admin once)
- Or use Solution 2 (enable Developer Mode)

**For distribution:**
- Build on a machine with Developer Mode enabled
- Or use a CI/CD service (GitHub Actions, etc.) which has proper permissions

## Alternative: GitHub Actions

Create `.github/workflows/build.yml`:
```yaml
name: Build
on: [push]
jobs:
  build:
    runs-on: windows-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install
      - run: npm run setup:bundled
      - run: npm run copy:tesseract
      - run: npm run build:standalone
      - uses: actions/upload-artifact@v3
        with:
          name: installer
          path: dist/*.exe
```

This builds in the cloud with proper permissions.

## Summary

**Quick Fix:** Run PowerShell as Administrator and build.

**Permanent Fix:** Enable Windows Developer Mode.

**The error is annoying but doesn't always prevent the build from completing!**
