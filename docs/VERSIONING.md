# Versioning Guide for TerrificOCR

## Current Version: 0.0.1

We use **Semantic Versioning** (SemVer): `MAJOR.MINOR.PATCH`

## Version Format

```
0.0.1
│ │ │
│ │ └─ PATCH: Bug fixes, small changes
│ └─── MINOR: New features, backwards compatible
└───── MAJOR: Breaking changes, major releases
```

## Automatic Version Bumping

### Patch Version (0.0.1 → 0.0.2)
For bug fixes and small changes:
```bash
npm run version:patch
```

This will:
1. Increment patch version (0.0.1 → 0.0.2)
2. Update `package.json`
3. Create a git commit
4. Create a git tag (v0.0.2)
5. Build the installer automatically

### Minor Version (0.0.1 → 0.1.0)
For new features:
```bash
npm run version:minor
```

This will:
1. Increment minor version (0.0.1 → 0.1.0)
2. Reset patch to 0
3. Update, commit, tag, and build

### Major Version (0.0.1 → 1.0.0)
For breaking changes or major releases:
```bash
npm run version:major
```

This will:
1. Increment major version (0.0.1 → 1.0.0)
2. Reset minor and patch to 0
3. Update, commit, tag, and build

## Manual Version Update

If you just want to update the version without building:

```bash
npm version patch   # 0.0.1 → 0.0.2
npm version minor   # 0.0.1 → 0.1.0
npm version major   # 0.0.1 → 1.0.0
```

Then build separately:
```bash
npm run build:standalone
```

## Version Workflow

### Example: Bug Fix Release

1. Fix the bug in your code
2. Test it: `npm run dev`
3. Bump version and build:
   ```bash
   npm run version:patch
   ```
4. Installer created: `dist-v1/TerrificOCR-Setup-0.0.2.exe`
5. Push to git:
   ```bash
   git push && git push --tags
   ```

### Example: New Feature Release

1. Develop the new feature
2. Test it: `npm run dev`
3. Bump version and build:
   ```bash
   npm run version:minor
   ```
4. Installer created: `dist-v1/TerrificOCR-Setup-0.1.0.exe`
5. Push to git with tags

### Example: Major Release

1. Complete major changes
2. Test thoroughly
3. Bump to 1.0.0:
   ```bash
   npm run version:major
   ```
4. Installer created: `dist-v1/TerrificOCR-Setup-1.0.0.exe`
5. Create GitHub release

## Version History

### 0.0.1 (Initial Release)
- ✅ PDF OCR processing
- ✅ Batch processing
- ✅ Output preview with search
- ✅ Multi-language support
- ✅ Bundled Python & Tesseract

### Future Versions

**0.0.2** - Bug fixes
- Fix any issues found in 0.0.1

**0.1.0** - New features
- Add more output formats
- Improve UI/UX
- Add more languages

**1.0.0** - Stable release
- Production ready
- All features tested
- Documentation complete

## Git Tags

Each version bump creates a git tag:
```bash
git tag                    # List all tags
git show v0.0.1           # Show tag details
git push origin v0.0.1    # Push specific tag
git push --tags           # Push all tags
```

## Installer Naming

The installer name automatically includes the version:
```
TerrificOCR-Setup-0.0.1.exe
TerrificOCR-Setup-0.0.2.exe
TerrificOCR-Setup-0.1.0.exe
TerrificOCR-Setup-1.0.0.exe
```

## Pre-release Versions

For beta/alpha releases:
```bash
npm version prerelease --preid=beta
# 0.0.1 → 0.0.2-beta.0

npm version prerelease --preid=alpha
# 0.0.1 → 0.0.2-alpha.0
```

## Quick Reference

| Command | Version Change | Use Case |
|---------|---------------|----------|
| `npm run version:patch` | 0.0.1 → 0.0.2 | Bug fixes |
| `npm run version:minor` | 0.0.1 → 0.1.0 | New features |
| `npm run version:major` | 0.0.1 → 1.0.0 | Breaking changes |

## Best Practices

1. **Always test before versioning**
   ```bash
   npm run dev  # Test in dev mode first
   ```

2. **Commit your changes first**
   ```bash
   git add .
   git commit -m "Add new feature"
   npm run version:minor
   ```

3. **Push tags to GitHub**
   ```bash
   git push && git push --tags
   ```

4. **Create GitHub releases**
   - Go to GitHub → Releases → New Release
   - Select the tag (e.g., v0.0.2)
   - Upload the installer
   - Write release notes

## Rollback

If you need to undo a version bump:
```bash
git tag -d v0.0.2              # Delete local tag
git push origin :refs/tags/v0.0.2  # Delete remote tag
git reset --hard HEAD~1        # Undo commit
```

## Summary

**To release a new version:**
```bash
# 1. Make your changes
# 2. Test them
npm run dev

# 3. Bump version and build
npm run version:patch  # or minor/major

# 4. Push to git
git push && git push --tags

# 5. Create GitHub release
# Upload dist-v1/TerrificOCR-Setup-X.X.X.exe
```

That's it! Automatic versioning is set up! 🚀
