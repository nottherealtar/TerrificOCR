"""
PDF Processing Script - Handles individual PDF OCR processing with Tesseract
"""
import sys
import json
import os
from pathlib import Path

# Add the script's directory to Python path so it can find config.py
script_dir = os.path.dirname(os.path.abspath(__file__))
if script_dir not in sys.path:
    sys.path.insert(0, script_dir)

import pytesseract
import fitz  # PyMuPDF
from PIL import Image
import io
from config import TESSERACT_PATH

# Set Tesseract path
pytesseract.pytesseract.tesseract_cmd = TESSERACT_PATH

def pdf_to_text(file_path, options):
    """Extract text from PDF using Tesseract OCR"""
    language = options.get('language', 'en')
    
    # Map language codes to Tesseract format
    lang_map = {
        'en': 'eng',
        'ch': 'chi_sim',
        'fr': 'fra',
        'german': 'deu',
        'japan': 'jpn',
        'korean': 'kor'
    }
    tesseract_lang = lang_map.get(language, 'eng')
    
    # Open PDF
    pdf_document = fitz.open(file_path)
    total_pages = len(pdf_document)
    all_text = []
    
    for page_num in range(total_pages):
        # Convert page to image
        page = pdf_document[page_num]
        pix = page.get_pixmap(matrix=fitz.Matrix(2, 2))  # 2x zoom for better quality
        img_data = pix.tobytes("png")
        img = Image.open(io.BytesIO(img_data))
        
        # Run OCR
        try:
            page_text = pytesseract.image_to_string(img, lang=tesseract_lang)
            all_text.append(f"--- Page {page_num + 1} ---\n{page_text}\n")
        except Exception as e:
            all_text.append(f"--- Page {page_num + 1} ---\nError: {str(e)}\n")
        
        # Send progress
        progress = {
            'fileId': file_path,
            'progress': int((page_num + 1) / total_pages * 100),
            'status': 'processing',
            'currentPage': page_num + 1,
            'totalPages': total_pages
        }
        print(json.dumps(progress), flush=True)
    
    pdf_document.close()
    return '\n'.join(all_text)

def save_output(text, file_path, options):
    """Save extracted text to output file"""
    output_format = options.get('format', 'txt')
    output_folder = options.get('outputFolder', '')
    
    # Determine output path
    input_path = Path(file_path)
    if output_folder:
        output_dir = Path(output_folder)
    else:
        output_dir = input_path.parent
    
    output_file = output_dir / f"{input_path.stem}_ocr.{output_format}"
    
    # Save based on format
    if output_format == 'txt':
        output_file.write_text(text, encoding='utf-8')
    elif output_format == 'markdown':
        output_file = output_dir / f"{input_path.stem}_ocr.md"
        output_file.write_text(text, encoding='utf-8')
    elif output_format == 'json':
        data = {'file': str(file_path), 'text': text}
        output_file.write_text(json.dumps(data, indent=2, ensure_ascii=False), encoding='utf-8')
    
    return str(output_file)

def process_pdf(file_path, options):
    """
    Process a PDF file with Tesseract OCR
    
    Args:
        file_path: Path to PDF file
        options: Processing options (format, language, etc.)
    """
    try:
        # Extract text
        text = pdf_to_text(file_path, options)
        
        # Save output
        output_path = save_output(text, file_path, options)
        
        # Send completion
        progress = {
            'fileId': file_path,
            'progress': 100,
            'status': 'completed',
            'outputPath': output_path
        }
        print(json.dumps(progress), flush=True)
        
        return True
    except Exception as e:
        print(f"Error: {str(e)}", file=sys.stderr)
        return False

if __name__ == '__main__':
    if len(sys.argv) < 3:
        print("Usage: python process_pdf.py <file_path> <options_json>", file=sys.stderr)
        sys.exit(1)
    
    file_path = sys.argv[1]
    options = json.loads(sys.argv[2])
    
    success = process_pdf(file_path, options)
    sys.exit(0 if success else 1)
