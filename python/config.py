"""
Configuration for OCR processing
"""
import os
import sys

def get_resource_path(relative_path):
    """Get absolute path to resource, works for dev and for bundled app"""
    try:
        # PyInstaller creates a temp folder and stores path in _MEIPASS
        base_path = sys._MEIPASS
    except Exception:
        # Running in development or from Electron resources
        if os.path.exists(os.path.join(os.path.dirname(__file__), '..', 'tesseract')):
            # Electron bundled resources
            base_path = os.path.join(os.path.dirname(__file__), '..')
        else:
            # Development mode
            base_path = os.path.dirname(__file__)
    
    return os.path.join(base_path, relative_path)

# Try bundled Tesseract first
TESSERACT_PATH = get_resource_path(os.path.join('tesseract', 'tesseract.exe'))

# If bundled doesn't exist, try system installation
if not os.path.exists(TESSERACT_PATH):
    alternatives = [
        r"C:\Program Files\Tesseract-OCR\tesseract.exe",
        r"C:\Program Files (x86)\Tesseract-OCR\tesseract.exe",
        r"C:\Tesseract-OCR\tesseract.exe",
    ]
    for alt in alternatives:
        if os.path.exists(alt):
            TESSERACT_PATH = alt
            break
