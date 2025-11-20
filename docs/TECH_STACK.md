# TerrificOCR Tech Stack

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     TerrificOCR Desktop App                  │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              Frontend (React + Electron)               │  │
│  │                                                         │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌─────────────┐ │  │
│  │  │ File Manager │  │ Batch Queue  │  │   Preview   │ │  │
│  │  └──────────────┘  └──────────────┘  └─────────────┘ │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌─────────────┐ │  │
│  │  │Output Config │  │   Progress   │  │   Search    │ │  │
│  │  └──────────────┘  └──────────────┘  └─────────────┘ │  │
│  └───────────────────────────────────────────────────────┘  │
│                            │                                 │
│                            │ IPC (Inter-Process)             │
│                            ▼                                 │
│  ┌───────────────────────────────────────────────────────┐  │
│  │           Electron Main Process (Node.js)              │  │
│  │                                                         │  │
│  │  • File System Operations                              │  │
│  │  • Process Management                                  │  │
│  │  • Python Bridge                                       │  │
│  └───────────────────────────────────────────────────────┘  │
│                            │                                 │
│                            │ spawn()                         │
│                            ▼                                 │
│  ┌───────────────────────────────────────────────────────┐  │
│  │          Python Backend (Embedded)                     │  │
│  │                                                         │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌─────────────┐ │  │
│  │  │ PDF → Images │→ │  Tesseract   │→ │  Text Out   │ │  │
│  │  │  (PyMuPDF)   │  │     OCR      │  │  (Format)   │ │  │
│  │  └──────────────┘  └──────────────┘  └─────────────┘ │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

## Technology Stack

### Frontend Layer

#### React 18.2
- **Purpose**: UI components and state management
- **Why**: Fast, component-based, large ecosystem
- **Components**:
  - `FileManager` - File selection and drag-drop
  - `BatchQueue` - Processing queue management
  - `OutputConfig` - Settings configuration
  - `ProgressTracker` - Real-time progress display
  - `OutputPreview` - Text preview with search

#### Vite 5.0
- **Purpose**: Build tool and dev server
- **Why**: Fast HMR, optimized builds, modern
- **Features**:
  - Lightning-fast dev server
  - Optimized production builds
  - Tree-shaking and code splitting

#### Custom CSS
- **Purpose**: Styling and animations
- **Why**: Full control, no framework overhead
- **Features**:
  - Gradient design system
  - Smooth transitions
  - Responsive layout
  - Modern UI patterns

### Desktop Layer

#### Electron 28.0
- **Purpose**: Desktop application framework
- **Why**: Cross-platform, web technologies, native APIs
- **Features**:
  - Window management
  - File system access
  - Native dialogs
  - Process spawning
  - IPC communication

#### Electron Builder 24.13
- **Purpose**: Application packaging and distribution
- **Why**: NSIS installer, code signing, auto-updates
- **Features**:
  - Windows installer (NSIS)
  - Resource bundling
  - Auto-update support
  - Code signing ready

### Backend Layer

#### Python 3.11 (Embedded)
- **Purpose**: OCR processing runtime
- **Why**: Tesseract bindings, PDF libraries
- **Bundled**: Portable Python runtime included
- **Size**: ~30 MB

#### PyMuPDF (fitz) 1.26
- **Purpose**: PDF to image conversion
- **Why**: Fast, accurate, feature-rich
- **Features**:
  - High-quality rendering
  - Page-by-page processing
  - Memory efficient

#### pytesseract 0.3.13
- **Purpose**: Python wrapper for Tesseract
- **Why**: Simple API, well-maintained
- **Features**:
  - Language support
  - Confidence scores
  - Multiple output formats

#### Pillow 12.0
- **Purpose**: Image processing
- **Why**: Standard Python imaging library
- **Features**:
  - Format conversion
  - Image manipulation
  - Memory efficient

### OCR Engine

#### Tesseract 5.5 (Bundled)
- **Purpose**: Text recognition engine
- **Why**: Open-source, accurate, multi-language
- **Bundled**: Complete Tesseract installation included
- **Size**: ~50 MB
- **Languages**: English, Chinese, French, German, Japanese, Korean

## Data Flow

### Processing Pipeline

```
User Action
    │
    ▼
┌─────────────────┐
│  React UI       │  User selects PDF files
│  (FileManager)  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Electron IPC   │  processPDF(filePath, options)
│  (Main Process) │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Python Spawn   │  spawn('python', ['process_pdf.py', ...])
│  (Child Process)│
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  PDF Processing │  1. Open PDF with PyMuPDF
│  (process_pdf)  │  2. Convert pages to images
└────────┬────────┘  3. Run Tesseract OCR
         │           4. Combine results
         ▼           5. Save output
┌─────────────────┐
│  Tesseract OCR  │  image_to_string(image, lang='eng')
│  (tesseract.exe)│
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Text Output    │  Save as TXT/MD/JSON
│  (File System)  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Progress Event │  IPC: ocr-progress
│  (Electron IPC) │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  React Update   │  Update UI with results
│  (State Change) │
└─────────────────┘
```

## File Structure

```
TerrificOCR/
├── electron/                   # Electron main process
│   ├── main.js                # Main process entry
│   └── preload.js             # IPC bridge
│
├── src/                       # React frontend
│   ├── components/            # UI components
│   │   ├── FileManager.jsx
│   │   ├── BatchQueue.jsx
│   │   ├── OutputConfig.jsx
│   │   ├── ProgressTracker.jsx
│   │   └── OutputPreview.jsx
│   ├── App.jsx                # Main app component
│   ├── App.css                # App styles
│   └── main.jsx               # React entry
│
├── python/                    # Python backend
│   ├── config.py              # Configuration
│   ├── process_pdf.py         # PDF processing
│   ├── ocr_service.py         # Background service
│   └── requirements.txt       # Python dependencies
│
├── bundled/                   # Bundled resources
│   ├── python-embed/          # Python runtime
│   └── tesseract/             # Tesseract OCR
│
├── build/                     # React build output
├── dist-v1/                   # Electron build output
├── docs/                      # Documentation
└── package.json               # NPM configuration
```

## Communication Protocols

### IPC (Inter-Process Communication)

```javascript
// Frontend → Main Process
window.electronAPI.processPDF(filePath, options)
window.electronAPI.selectFiles()
window.electronAPI.readOutputFile(path)

// Main Process → Frontend
event.sender.send('ocr-progress', progressData)
```

### Python Communication

```javascript
// Electron spawns Python
const childProcess = spawn(pythonPath, [scriptPath, ...args])

// Python sends JSON progress
console.log(JSON.stringify({
  progress: 50,
  status: 'processing',
  currentPage: 5
}))

// Electron parses and forwards to UI
```

## Performance Optimizations

### Frontend
- ✅ React.memo for component optimization
- ✅ Lazy loading for large file lists
- ✅ Debounced search input
- ✅ Virtual scrolling for long lists

### Backend
- ✅ Page-by-page processing (memory efficient)
- ✅ Streaming progress updates
- ✅ Parallel processing ready
- ✅ Efficient image conversion

### Build
- ✅ Tree-shaking (Vite)
- ✅ Code splitting
- ✅ Minification
- ✅ Asset optimization

## Security

### Electron Security
- ✅ Context isolation enabled
- ✅ Node integration disabled
- ✅ Preload script for IPC
- ✅ Content Security Policy ready

### File System
- ✅ Sandboxed file access
- ✅ User-selected paths only
- ✅ No arbitrary code execution

## Scalability

### Current Limits
- **Files**: Unlimited (processed sequentially)
- **File Size**: Limited by available RAM
- **Pages**: Unlimited (processed one at a time)

### Future Improvements
- Parallel processing (multiple files)
- Worker threads for UI responsiveness
- Streaming for large files
- Cloud processing option

## Dependencies

### Production Dependencies
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0"
}
```

### Development Dependencies
```json
{
  "electron": "^28.0.0",
  "electron-builder": "^24.9.1",
  "vite": "^5.0.8",
  "@vitejs/plugin-react": "^4.2.1"
}
```

### Python Dependencies
```
pytesseract>=0.3.10
pymupdf>=1.23.0
Pillow>=10.0.0
flask>=3.0.0
numpy>=1.21.0
```

## Build Sizes

| Component | Size |
|-----------|------|
| Electron + React | ~155 MB |
| Python Embedded | ~30 MB |
| Tesseract + Data | ~50 MB |
| Python Packages | ~15 MB |
| **Total Installer** | **~250 MB** |

## Platform Support

### Current
- ✅ Windows 10/11 (64-bit)

### Planned
- ⏳ macOS (Intel + Apple Silicon)
- ⏳ Linux (Ubuntu, Fedora)

## Technology Choices

### Why Electron?
- Cross-platform desktop apps
- Web technologies (React, CSS)
- Native OS integration
- Large ecosystem

### Why React?
- Component-based architecture
- Fast rendering
- Large community
- Easy state management

### Why Tesseract?
- Open-source
- High accuracy
- Multi-language support
- Active development

### Why Python?
- Best Tesseract bindings
- Excellent PDF libraries
- Easy to embed
- Fast development

## Summary

TerrificOCR uses a modern, layered architecture:
- **Frontend**: React + Electron for beautiful UI
- **Backend**: Python + Tesseract for powerful OCR
- **Communication**: IPC for seamless integration
- **Distribution**: Standalone with everything bundled

**Result**: Fast, accurate, and easy-to-use OCR application! 🚀
