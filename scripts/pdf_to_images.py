#!/usr/bin/env python3
import os
import sys
from pdf2image import convert_from_path

# Input and output paths
pdf_path = "/Users/admin/Documents/housey/Documents/CAD drawings PDF.pdf"
output_dir = "/Users/admin/Documents/housey/static/cad-drawings"

# Create output directory if it doesn't exist
os.makedirs(output_dir, exist_ok=True)

# Convert PDF to images
try:
    images = convert_from_path(pdf_path, dpi=150)

    for i, image in enumerate(images, start=1):
        image_path = os.path.join(output_dir, f"floor-plan-{i}.png")
        image.save(image_path, "PNG")
        print(f"Saved: {image_path}")

    print(f"Successfully converted {len(images)} pages")
except Exception as e:
    print(f"Error: {e}")
    sys.exit(1)