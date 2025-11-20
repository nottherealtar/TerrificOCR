# GitHub Actions Release Checklist

## ✅ Things to Verify

### 1. Repository Settings

Go to your GitHub repo → **Settings** → **Actions** → **General**

Check these settings:

- [ ] **Workflow permissions** is set to "Read and write permissions"
  - If it's "Read repository contents and packages permissions", change it!
  - This is required for creating releases

- [ ] **Allow GitHub Actions to create and approve pull requests** is checked

### 2. Tag Push

Make sure you're pushing a tag that starts with `v`:

```bash
# Correct ✅
git tag v0.0.1
git push origin v0.0.1

# Wrong ❌
git tag 0.0.1  # Missing 'v' prefix
git push origin 0.0.1
```

### 3. Workflow Trigger

The workflow only runs on:
- Tag pushes that start with `v*` (like `v0.0.1`, `v1.0.0`)
- Manual workflow dispatch

Check if the workflow ran:
- Go to **Actions** tab
- Look for "Build and Release" workflow
- Check if it was triggered by your tag push

### 4. Build Success

The release step only runs if:
- The build completes successfully
- You pushed a tag (not just a commit)
- The `.exe` file exists in `dist-v1/`

### 5. Debug Output

In the workflow logs, check:
- "Check if files exist" step shows `.exe` files
- "GitHub ref:" shows `refs/tags/v0.0.1`
- "Is tag:" shows `true`

## 🔧 Common Issues

### Issue: "Create Release" step is skipped

**Cause**: Not triggered by a tag push

**Fix**:
```bash
git tag v0.0.1
git push origin v0.0.1
```

### Issue: "Permission denied" or "403 Forbidden"

**Cause**: Workflow doesn't have write permissions

**Fix**: 
1. Go to Settings → Actions → General
2. Set "Workflow permissions" to "Read and write permissions"
3. Save

### Issue: Build succeeds but no release

**Cause**: Files not found or wrong path

**Fix**: Check the "Check if files exist" step output

### Issue: electron-builder publish error

**Cause**: Missing GH_TOKEN (already fixed in workflow)

**Fix**: Already added `GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}`

## 📝 Manual Release (Fallback)

If automated release fails, create manually:

1. Go to your repo → **Releases** → **Create a new release**
2. Click "Choose a tag" → Type `v0.0.1` → "Create new tag"
3. Title: `TerrificOCR v0.0.1`
4. Description: Copy from workflow or write your own
5. Upload: `dist-v1/TerrificOCR-Setup-0.0.1.exe`
6. Click "Publish release"

## 🎯 Quick Test

Run this to test the workflow:

```bash
# Delete old tag if exists
git tag -d v0.0.1
git push origin :refs/tags/v0.0.1

# Create and push new tag
git tag v0.0.1
git push origin v0.0.1

# Watch the workflow
# Go to: https://github.com/YOUR_USERNAME/TerrificOCR/actions
```

## ✅ Success Indicators

You'll know it worked when:
- [ ] Workflow completes without errors
- [ ] "Create Release" step shows ✅ (not skipped)
- [ ] Release appears in the "Releases" section
- [ ] `.exe` file is attached to the release
- [ ] Release notes are generated

## 🆘 Still Not Working?

1. Check workflow logs for errors
2. Verify repository permissions
3. Ensure tag starts with `v`
4. Try manual release as fallback
5. Check if `.exe` file exists in `dist-v1/`

---

**Most Common Fix**: Go to Settings → Actions → General → Set "Workflow permissions" to "Read and write permissions"
