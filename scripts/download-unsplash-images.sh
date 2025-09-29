#!/bin/bash

# Create images directory
mkdir -p static/images/kitchen

echo "🖼️  Downloading kitchen appliance images from Unsplash..."

# Download kitchen appliance images from Unsplash (free stock photos)
echo "📥 Downloading Kettle images..."
curl -L -o "static/images/kitchen/kettle-1.jpg" "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500&q=80"
curl -L -o "static/images/kitchen/kettle-2.jpg" "https://images.unsplash.com/photo-1563898883425-3c7e3c9e0319?w=500&q=80"
curl -L -o "static/images/kitchen/kettle-3.jpg" "https://images.unsplash.com/photo-1556909114-2693572ccf1e?w=500&q=80"

echo "📥 Downloading Toaster images..."
curl -L -o "static/images/kitchen/toaster-1.jpg" "https://images.unsplash.com/photo-1585515656915-49e8186bf890?w=500&q=80"
curl -L -o "static/images/kitchen/toaster-2.jpg" "https://images.unsplash.com/photo-1556909411-145e8e0e62b5?w=500&q=80"
curl -L -o "static/images/kitchen/toaster-3.jpg" "https://images.unsplash.com/photo-1506706435692-290e0c5b4505?w=500&q=80"

echo "📥 Downloading Coffee Machine images..."
curl -L -o "static/images/kitchen/coffee-machine-1.jpg" "https://images.unsplash.com/photo-1495321308589-43affb814eee?w=500&q=80"
curl -L -o "static/images/kitchen/coffee-machine-2.jpg" "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=500&q=80"
curl -L -o "static/images/kitchen/coffee-machine-3.jpg" "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=500&q=80"

echo "📥 Downloading Percolator images..."
curl -L -o "static/images/kitchen/percolator-1.jpg" "https://images.unsplash.com/photo-1459755486867-b55449bb39ff?w=500&q=80"
curl -L -o "static/images/kitchen/percolator-2.jpg" "https://images.unsplash.com/photo-1508736793122-f516e3ba5569?w=500&q=80"

echo "📥 Downloading Hand Blender images..."
curl -L -o "static/images/kitchen/hand-blender-1.jpg" "https://images.unsplash.com/photo-1556909114-2693572ccf1e?w=500&q=80"
curl -L -o "static/images/kitchen/hand-blender-2.jpg" "https://images.unsplash.com/photo-1574484284002-952d92456975?w=500&q=80"
curl -L -o "static/images/kitchen/hand-blender-3.jpg" "https://images.unsplash.com/photo-1556908114-4ba9d1b1ec59?w=500&q=80"

echo "📥 Downloading Slow Cooker images..."
curl -L -o "static/images/kitchen/slow-cooker-1.jpg" "https://images.unsplash.com/photo-1556908114-4ba9d1b1ec59?w=500&q=80"
curl -L -o "static/images/kitchen/slow-cooker-2.jpg" "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=500&q=80"
curl -L -o "static/images/kitchen/slow-cooker-3.jpg" "https://images.unsplash.com/photo-1556908231-4691c538b7e0?w=500&q=80"

echo "✅ Image download completed!"

# Show what we downloaded
echo "📊 Downloaded images:"
ls -lh static/images/kitchen/