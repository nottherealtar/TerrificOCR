# TerrificOCR

<div align="center">

![TerrificOCR Logo](https://img.shields.io/badge/TerrificOCR-v0.0.1-purple?style=for-the-badge)

**Fast, Accurate, and Beautiful OCR for PDF Documents**

[![Windows](https://img.shields.io/badge/Windows-0078D6?style=flat&logo=windows&logoColor=white)](https://github.com/nottherealtar/TerrificOCR/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Electron](https://img.shields.io/badge/Electron-28.0-47848F?style=flat&logo=electron&logoColor=white)](https://www.electronjs.org/)
[![React](https://img.shields.io/badge/React-18.2-61DAFB?style=flat&logo=react&logoColor=black)](https://reactjs.org/)
[![Tesseract](https://img.shields.io/badge/Tesseract-5.5-blue?style=flat)](https://github.com/tesseract-ocr/tesseract)

[Download](https://github.com/nottherealtar/TerrificOCR/releases) • [Documentation](docs/) • [Report Bug](https://github.com/nottherealtar/TerrificOCR/issues) • [Request Feature](https://github.com/nottherealtar/TerrificOCR/issues)

</div>

---

## ✨ Features

- 📄 **Single & Batch Processing** - Process one PDF or hundreds at once
- 🎯 **Drag & Drop Interface** - Simply drag PDFs into the app
- 🌍 **Multi-Language Support** - English, Chinese, French, German, Japanese, Korean
- 👁️ **Live Preview** - View extracted text instantly with syntax highlighting
- 🔍 **Smart Search** - Find and navigate through extracted text
- 📊 **Real-Time Progress** - Track processing status for each file
- 💾 **Multiple Formats** - Export as TXT, Markdown, JSON, or Searchable PDF
- ⚡ **Fast & Accurate** - Powered by Tesseract 5.5 OCR engine
- 🎨 **Modern UI** - Beautiful gradient design with smooth animations
- 📦 **Standalone** - No prerequisites needed, everything bundled

## 🚀 Quick Start

### Download & Install

1. Download the latest release: [TerrificOCR-Setup-0.0.1.exe](https://github.com/nottherealtar/TerrificOCR/releases)
2. Run the installer
3. Launch TerrificOCR
4. Start processing PDFs!

**That's it!** No Python, no Tesseract, no configuration needed.

### First Use

1. **Add Files** - Drag PDF files into the app or click "Browse Files"
2. **Configure** - Choose output format and language
3. **Process** - Click "Start Processing" and watch the magic happen
4. **View Results** - Click "View Output" to see extracted text
5. **Search** - Use the search bar to find specific text

## 📸 Screenshots

<div align="center">

### Main Interface
![Main Interface](docs/screenshots/main-interface.png)

### Processing Queue
![Processing](docs/screenshots/processing.png)

### Output Preview with Search
![Preview](docs/screenshots/preview-search.png)

</div>

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite
- **Desktop**: Electron 28
- **OCR Engine**: Tesseract 5.5
- **PDF Processing**: PyMuPDF (fitz)
- **Backend**: Python 3.11 (embedded)
- **UI Framework**: Custom CSS with gradient design

## 📦 What's Included

The standalone installer bundles everything you need:

- ✅ Electron app with React UI
- ✅ Python 3.11 runtime (embedded)
- ✅ Tesseract OCR 5.5 with language data
- ✅ All Python packages pre-installed
- ✅ No external dependencies required

**Download Size**: ~250 MB  
**Installation Size**: ~260 MB

## 🌍 Supported Languages

- 🇬🇧 English
- 🇨🇳 Chinese (Simplified)
- 🇫🇷 French
- 🇩🇪 German
- 🇯🇵 Japanese
- 🇰🇷 Korean

More languages can be added easily!

## 📖 Documentation

- [Installation Guide](docs/INSTALL_INSTRUCTIONS.md)
- [Usage Guide](docs/USAGE_GUIDE.md)
- [Features Overview](docs/FEATURES.md)
- [Build Instructions](docs/BUILD_GUIDE.md)
- [Distribution Guide](docs/DISTRIBUTION.md)
- [Versioning](docs/VERSIONING.md)

## 🔧 For Developers

### Prerequisites

- Node.js 18+
- Python 3.8+
- Tesseract OCR

### Setup

```bash
# Clone the repository
git clone https://github.com/nottherealtar/TerrificOCR.git
cd TerrificOCR

# Install dependencies
npm install

# Setup bundled components (for standalone build)
npm run setup:bundled
npm run copy:tesseract

# Run in development mode
npm run dev
```

### Build

```bash
# Build standalone installer
npm run build:standalone

# Output: dist-v1/TerrificOCR-Setup-0.0.1.exe
```

### Version Management

```bash
# Bug fixes (0.0.1 → 0.0.2)
npm run version:patch

# New features (0.0.1 → 0.1.0)
npm run version:minor

# Major release (0.0.1 → 1.0.0)
npm run version:major
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.txt) file for details.

## 🙏 Acknowledgments

- [Tesseract OCR](https://github.com/tesseract-ocr/tesseract) - OCR engine
- [Electron](https://www.electronjs.org/) - Desktop framework
- [React](https://reactjs.org/) - UI library
- [PyMuPDF](https://pymupdf.readthedocs.io/) - PDF processing

## 📊 Project Stats

![GitHub release (latest by date)](https://img.shields.io/github/v/release/nottherealtar/TerrificOCR)
![GitHub all releases](https://img.shields.io/github/downloads/nottherealtar/TerrificOCR/total)
![GitHub stars](https://img.shields.io/github/stars/nottherealtar/TerrificOCR?style=social)
![GitHub forks](https://img.shields.io/github/forks/nottherealtar/TerrificOCR?style=social)

## 🐛 Known Issues

See the [Issues](https://github.com/nottherealtar/TerrificOCR/issues) page for known bugs and feature requests.

## 📮 Contact

- Create an [Issue](https://github.com/nottherealtar/TerrificOCR/issues)
- Start a [Discussion](https://github.com/nottherealtar/TerrificOCR/discussions)

---

<div align="center">

**Made with ❤️ for the OCR community**

[⬆ Back to Top](#terrificocr)

</div>
