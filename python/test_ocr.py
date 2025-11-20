"""
Quick test script to verify Tesseract OCR setup
"""
import pytesseract
from config import TESSERACT_PATH
from PIL import Image, ImageDraw, ImageFont

# Set Tesseract path
pytesseract.pytesseract.tesseract_cmd = TESSERACT_PATH

def test_tesseract():
    """Test Tesseract installation"""
    print("Testing Tesseract OCR setup...")
    print(f"Tesseract path: {TESSERACT_PATH}")
    
    try:
        version = pytesseract.get_tesseract_version()
        print(f"✓ Tesseract version: {version}")
        
        # Create a simple test image with text
        img = Image.new('RGB', (400, 100), color='white')
        draw = ImageDraw.Draw(img)
        draw.text((10, 30), "Hello World! OCR Test 123", fill='black')
        
        # Run OCR
        text = pytesseract.image_to_string(img)
        print(f"✓ OCR Result: {text.strip()}")
        
        print("\n✓ All tests passed! Tesseract is ready to use.")
        return True
        
    except Exception as e:
        print(f"✗ Error: {e}")
        return False

if __name__ == '__main__':
    test_tesseract()
