#!/usr/bin/env python3

import os
from PIL import Image, ImageDraw, ImageFont
import requests
from io import BytesIO

def create_placeholder_image(width, height, text, color, filename):
    """Create a placeholder image with text"""
    # Create image with background color
    img = Image.new('RGB', (width, height), color)
    draw = ImageDraw.Draw(img)

    # Try to load a font, fallback to default if not available
    try:
        font = ImageFont.truetype("/System/Library/Fonts/Arial.ttf", 24)
    except:
        font = ImageFont.load_default()

    # Calculate text position to center it
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]

    x = (width - text_width) // 2
    y = (height - text_height) // 2

    # Draw text
    draw.text((x, y), text, fill='white', font=font)

    # Save image
    img.save(filename, 'JPEG', quality=85)
    print(f"Created: {filename}")

def download_free_image(url, filename):
    """Download an image from a URL"""
    try:
        response = requests.get(url, timeout=10)
        if response.status_code == 200:
            with open(filename, 'wb') as f:
                f.write(response.content)
            print(f"Downloaded: {filename}")
            return True
    except Exception as e:
        print(f"Failed to download {url}: {e}")
    return False

# Create directory
os.makedirs('static/images/kitchen', exist_ok=True)

print("🖼️  Creating kitchen appliance images...")

# Kettle images
create_placeholder_image(400, 400, "Smeg Electric Kettle\nKLF03CRUK", (220, 20, 60), "static/images/kitchen/kettle-1.jpg")
create_placeholder_image(400, 400, "Cream Color\nSide View", (220, 20, 60), "static/images/kitchen/kettle-2.jpg")
create_placeholder_image(400, 400, "Control Detail\nView", (220, 20, 60), "static/images/kitchen/kettle-3.jpg")

# Toaster images
create_placeholder_image(400, 400, "Smeg 2-Slice Toaster\nTSF01CRUK", (34, 139, 34), "static/images/kitchen/toaster-1.jpg")
create_placeholder_image(400, 400, "Bread Slots\nVisible", (34, 139, 34), "static/images/kitchen/toaster-2.jpg")
create_placeholder_image(400, 400, "Control Panel\nDetail", (34, 139, 34), "static/images/kitchen/toaster-3.jpg")

# French Press images
create_placeholder_image(400, 400, "French Press\nCoffee Maker", (255, 140, 0), "static/images/kitchen/coffee-machine-1.jpg")
create_placeholder_image(400, 400, "Glass Carafe\nView", (255, 140, 0), "static/images/kitchen/coffee-machine-2.jpg")
create_placeholder_image(400, 400, "Brewing\nDemonstration", (255, 140, 0), "static/images/kitchen/coffee-machine-3.jpg")

# Percolator images
create_placeholder_image(400, 400, "Stovetop\nPercolator", (128, 0, 128), "static/images/kitchen/percolator-1.jpg")
create_placeholder_image(400, 400, "Components\nView", (128, 0, 128), "static/images/kitchen/percolator-2.jpg")

# Hand Blender images
create_placeholder_image(400, 400, "Braun MultiQuick 7\nHand Blender", (75, 0, 130), "static/images/kitchen/hand-blender-1.jpg")
create_placeholder_image(400, 400, "Accessories\nIncluded", (75, 0, 130), "static/images/kitchen/hand-blender-2.jpg")
create_placeholder_image(400, 400, "In Use\nDemonstration", (75, 0, 130), "static/images/kitchen/hand-blender-3.jpg")

# Slow Cooker images
create_placeholder_image(400, 400, "Crock-Pot Digital\nSlow Cooker 3.5L", (0, 100, 100), "static/images/kitchen/slow-cooker-1.jpg")
create_placeholder_image(400, 400, "Digital Controls\nDisplay", (0, 100, 100), "static/images/kitchen/slow-cooker-2.jpg")
create_placeholder_image(400, 400, "Ceramic Pot\nInterior", (0, 100, 100), "static/images/kitchen/slow-cooker-3.jpg")

print("✅ Kitchen appliance images created!")