# TerrificOCR Usage Guide

## Getting Started

### 1. Launch the App
```bash
npm run dev
```

The app will open in a new window with a beautiful purple gradient header.

## Main Interface

### Left Panel - Input & Configuration

#### File Manager Card
- **Drag & Drop Zone**: Drop PDF files directly here
- **Browse Files Button**: Opens file picker for single/multiple PDFs
- **Select Folder Button**: Choose a folder to process all PDFs inside

#### Output Settings Card
- **Output Format**: Choose between TXT, Markdown, JSON, or Searchable PDF
- **Output Folder**: Click "Browse" to select where files are saved (default: same as source)
- **Language**: Select the document language for better accuracy
- **Preserve Layout**: Checkbox to maintain document structure (coming soon)

### Right Panel - Processing & Progress

#### Processing Queue Card
- Shows all files added to the queue
- **Status Icons**:
  - ⏳ Pending - Waiting to be processed
  - ⚙️ Processing - Currently being OCR'd
  - ✅ Completed - Successfully processed
  - ❌ Error - Failed with error message
- **Progress Bar**: Shows per-file progress during processing
- **Remove Button (×)**: Remove pending files from queue
- **Clear Completed Button**: Remove all completed files at once

#### Progress Tracker Card
- **Statistics Grid**: 
  - Pending count
  - Processing count
  - Completed count (green)
  - Error count (red)
- **Overall Progress Bar**: Shows total batch completion percentage
- **Start Processing Button**: Begins OCR on all pending files

## Output Preview Panel (NEW!)

### Opening the Preview
After processing completes, a floating button appears in the bottom-right:
```
📄 View Output (3)
```
Click it to open the preview panel.

### Preview Panel Features

#### File Selector
- Dropdown menu showing all completed files
- Select any file to view its extracted text

#### Search Bar
- Type any text to search within the current file
- Search is case-insensitive
- Results update in real-time as you type

#### Search Results
When matches are found:
- **Result Counter**: Shows "1 / 5" (current result / total matches)
- **Navigation Buttons**:
  - ↑ Previous result
  - ↓ Next result
- **Highlighting**:
  - All matches highlighted in yellow
  - Current match highlighted in orange with bold text

#### Text Display
- Monospace font for easy reading
- Preserves line breaks and formatting
- Scrollable for long documents
- Page markers show "--- Page X ---"

### Closing the Preview
Click the × button in the top-right of the preview panel.

## Workflow Examples

### Example 1: Single PDF Processing

1. **Add File**
   - Drag `invoice.pdf` into the drop zone
   - File appears in queue with ⏳ icon

2. **Configure**
   - Set format to "Plain Text (.txt)"
   - Keep output folder as "Same as source"
   - Select language "English"

3. **Process**
   - Click "Start Processing (1)"
   - Watch progress bar fill up
   - Status changes to ✅ when done

4. **View Results**
   - Click "📄 View Output (1)" button
   - Select "invoice.pdf" from dropdown
   - Read extracted text

5. **Search**
   - Type "total" in search bar
   - See all occurrences highlighted
   - Use ↑↓ to navigate between matches

### Example 2: Batch Processing

1. **Add Multiple Files**
   - Click "Browse Files"
   - Select 10 PDF files
   - All appear in queue

2. **Configure**
   - Set format to "Markdown (.md)"
   - Click "Browse" for output folder
   - Select "C:\OCR_Results"
   - Choose language "English"

3. **Process**
   - Click "Start Processing (10)"
   - Files process one by one
   - Watch statistics update

4. **Review**
   - Click "Clear Completed" to clean queue
   - Open preview to check results
   - Search across different files

### Example 3: Multi-Language Document

1. **Add File**
   - Drag `japanese_document.pdf`

2. **Configure**
   - Set format to "JSON (.json)"
   - Select language "Japanese"

3. **Process & View**
   - Process the file
   - Open preview
   - See structured JSON output with Japanese text

## Tips & Tricks

### For Best OCR Results:
- Use high-quality PDF scans (300 DPI or higher)
- Ensure text is clear and not too small
- Select the correct language
- Avoid heavily skewed or rotated pages

### Keyboard Shortcuts (Coming Soon):
- `Ctrl+O` - Open files
- `Ctrl+P` - Start processing
- `Ctrl+F` - Focus search bar
- `F3` - Next search result
- `Shift+F3` - Previous search result

### Performance Tips:
- Process large batches overnight
- Close preview panel when processing many files
- Use "Clear Completed" to free memory

### File Organization:
- Create separate output folders for different projects
- Use descriptive file names
- Keep original PDFs as backup

## Troubleshooting

### "Tesseract not found" Error
- Verify Tesseract is installed: `"C:\Program Files\Tesseract-OCR\tesseract.exe" --version`
- Check `python/config.py` has correct path
- Run `py python/test_ocr.py` to test

### Poor OCR Quality
- Check if correct language is selected
- Verify PDF quality (not too low resolution)
- Try preprocessing the PDF (increase contrast, remove noise)

### Preview Not Loading
- Check if file was actually created in output folder
- Verify file permissions
- Look for errors in the queue

### Search Not Working
- Make sure file is selected in dropdown
- Check if text actually contains the search term
- Try different capitalization

## Advanced Usage

### Custom Output Naming
Files are automatically named: `original_name_ocr.txt`

### Supported Languages
Install additional Tesseract language packs for more languages:
```bash
choco install tesseract-language-pack-all
```

### JSON Output Structure
```json
{
  "file": "C:\\path\\to\\document.pdf",
  "text": "Extracted text content..."
}
```

## Need Help?

- Check `FEATURES.md` for complete feature list
- See `README.md` for installation instructions
- Run `py python/test_ocr.py` to verify setup
