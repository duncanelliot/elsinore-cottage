#!/bin/bash

# Create images directory
mkdir -p static/images/kitchen

echo "🖼️  Downloading kitchen appliance images..."

# Download Smeg Kettle images
echo "📥 Downloading Smeg Kettle images..."
curl -s -o "static/images/kitchen/kettle-1.jpg" "https://m.media-amazon.com/images/I/71KVS9wQp0L._AC_SL1500_.jpg"
curl -s -o "static/images/kitchen/kettle-2.jpg" "https://m.media-amazon.com/images/I/71nHRtC+qCL._AC_SL1500_.jpg"
curl -s -o "static/images/kitchen/kettle-3.jpg" "https://m.media-amazon.com/images/I/71wd2a2Z2PL._AC_SL1500_.jpg"

# Download Smeg Toaster images
echo "📥 Downloading Smeg Toaster images..."
curl -s -o "static/images/kitchen/toaster-1.jpg" "https://m.media-amazon.com/images/I/71YpYI6lOHL._AC_SL1500_.jpg"
curl -s -o "static/images/kitchen/toaster-2.jpg" "https://m.media-amazon.com/images/I/71vTMSd6WGL._AC_SL1500_.jpg"
curl -s -o "static/images/kitchen/toaster-3.jpg" "https://m.media-amazon.com/images/I/71vJjwQbVQL._AC_SL1500_.jpg"

# Download French Press images
echo "📥 Downloading French Press images..."
curl -s -o "static/images/kitchen/coffee-machine-1.jpg" "https://m.media-amazon.com/images/I/71WZGcjzriL._AC_SL1500_.jpg"
curl -s -o "static/images/kitchen/coffee-machine-2.jpg" "https://m.media-amazon.com/images/I/71HGJnJKX9L._AC_SL1500_.jpg"
curl -s -o "static/images/kitchen/coffee-machine-3.jpg" "https://m.media-amazon.com/images/I/71Y4KbJNOOL._AC_SL1500_.jpg"

# Download Percolator images
echo "📥 Downloading Percolator images..."
curl -s -o "static/images/kitchen/percolator-1.jpg" "https://m.media-amazon.com/images/I/61FcGxFqOxL._AC_SL1000_.jpg"
curl -s -o "static/images/kitchen/percolator-2.jpg" "https://m.media-amazon.com/images/I/61LgFQNy8kL._AC_SL1000_.jpg"

# Download Braun Hand Blender images
echo "📥 Downloading Braun Hand Blender images..."
curl -s -o "static/images/kitchen/hand-blender-1.jpg" "https://m.media-amazon.com/images/I/71nqGFJ5eNL._AC_SL1500_.jpg"
curl -s -o "static/images/kitchen/hand-blender-2.jpg" "https://m.media-amazon.com/images/I/71TbFW0fLzL._AC_SL1500_.jpg"
curl -s -o "static/images/kitchen/hand-blender-3.jpg" "https://m.media-amazon.com/images/I/71Ob1QAM2OL._AC_SL1500_.jpg"

# Download Crock-Pot Slow Cooker images
echo "📥 Downloading Crock-Pot Slow Cooker images..."
curl -s -o "static/images/kitchen/slow-cooker-1.jpg" "https://m.media-amazon.com/images/I/71XDz0bfKoL._AC_SL1500_.jpg"
curl -s -o "static/images/kitchen/slow-cooker-2.jpg" "https://m.media-amazon.com/images/I/71WnR1qWnLL._AC_SL1500_.jpg"
curl -s -o "static/images/kitchen/slow-cooker-3.jpg" "https://m.media-amazon.com/images/I/71Tv9-g3dRL._AC_SL1500_.jpg"

echo "✅ Image download completed!"

# Show what we downloaded
echo "📊 Downloaded images:"
ls -la static/images/kitchen/