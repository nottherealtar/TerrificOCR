"""
Tesseract OCR Service - Background service for OCR operations
"""
import sys
import json
import pytesseract
from flask import Flask, request, jsonify
from config import TESSERACT_PATH

# Set Tesseract path
pytesseract.pytesseract.tesseract_cmd = TESSERACT_PATH

app = Flask(__name__)

@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    try:
        # Verify Tesseract is accessible
        version = pytesseract.get_tesseract_version()
        return jsonify({
            'status': 'ok',
            'tesseract_version': str(version),
            'tesseract_path': TESSERACT_PATH
        })
    except Exception as e:
        return jsonify({
            'status': 'error',
            'error': str(e)
        }), 500

@app.route('/process', methods=['POST'])
def process():
    """Process PDF with Tesseract OCR"""
    data = request.json
    file_path = data.get('file_path')
    options = data.get('options', {})
    
    # This endpoint is for future REST API usage
    # Currently using direct Python script execution
    return jsonify({
        'success': True,
        'message': 'Use process_pdf.py script for processing'
    })

if __name__ == '__main__':
    print('Tesseract OCR Service starting...', flush=True)
    print(f'Tesseract path: {TESSERACT_PATH}', flush=True)
    app.run(port=5000, debug=False)
