import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

interface KitchenImageMapping {
  itemId: string;
  item: string;
  product: string;
  images: Array<{
    filename: string;
    description: string;
    isPrimary: boolean;
    priority: number;
  }>;
}

// Map the kitchen items to their downloaded images (updated with current database IDs)
const kitchenImageMappings: KitchenImageMapping[] = [
  {
    itemId: 'cmg2m00tb000qucpzjo0tql27',
    item: 'Kettle',
    product: 'Smeg KLF03CRUK Electric Kettle',
    images: [
      { filename: 'kettle-1.jpg', description: 'Electric kettle - main view', isPrimary: true, priority: 1 }
    ]
  },
  {
    itemId: 'cmg2m00tc000rucpzeoh5xuff',
    item: 'Toaster',
    product: 'Smeg TSF01CRUK 2-Slice Toaster',
    images: [
      { filename: 'toaster-3.jpg', description: '2-slice toaster - main view', isPrimary: true, priority: 1 }
    ]
  },
  {
    itemId: 'cmg2m00td000sucpz8x4vfibe',
    item: 'Coffee Machine',
    product: 'French press',
    images: [
      { filename: 'coffee-machine-1.jpg', description: 'French press coffee maker - main view', isPrimary: true, priority: 1 },
      { filename: 'coffee-machine-2.jpg', description: 'French press coffee maker - side view', isPrimary: false, priority: 2 },
      { filename: 'coffee-machine-3.jpg', description: 'French press coffee maker - brewing', isPrimary: false, priority: 3 }
    ]
  },
  {
    itemId: 'cmg2m00te000tucpznb3j7xc3',
    item: 'Coffee Machine',
    product: 'Percolator',
    images: [
      { filename: 'percolator-1.jpg', description: 'Stovetop percolator - main view', isPrimary: true, priority: 1 },
      { filename: 'percolator-2.jpg', description: 'Stovetop percolator - detail view', isPrimary: false, priority: 2 }
    ]
  },
  {
    itemId: 'cmg2m00tg000wucpzkkhebe4g',
    item: 'Hand Blender',
    product: 'Braun MultiQuick 7 Hand Blender MQ7087X',
    images: [
      { filename: 'hand-blender-2.jpg', description: 'Hand blender - main view', isPrimary: true, priority: 1 }
    ]
  },
  {
    itemId: 'cmg2m00th000xucpz18xl8ve4',
    item: 'Slow Cooker',
    product: 'Crock-Pot CSC025 3.5L Digital Slow Cooker',
    images: [
      { filename: 'slow-cooker-2.jpg', description: 'Digital slow cooker - main view', isPrimary: true, priority: 1 }
    ]
  }
];

async function addImagesToDatabase() {
  console.log('🗄️  Adding kitchen appliance images to database...');

  const imagesDir = path.join(process.cwd(), 'static', 'images', 'kitchen');
  console.log(`📁 Images directory: ${imagesDir}`);

  for (const mapping of kitchenImageMappings) {
    console.log(`\n📝 Processing ${mapping.item}: ${mapping.product}`);

    // Clear existing images for this item
    await prisma.furnitureItemLink.deleteMany({
      where: {
        furnitureItemId: mapping.itemId,
        type: 'image'
      }
    });

    for (const image of mapping.images) {
      const filepath = path.join(imagesDir, image.filename);
      console.log(`🔍 Checking file: ${filepath}`);

      // Check if file exists and has reasonable size
      try {
        const stats = fs.statSync(filepath);
        console.log(`  📊 File stats: ${image.filename} - ${(stats.size / 1024).toFixed(1)}KB`);

        if (stats.size > 1000) { // Only add files larger than 1KB
          await prisma.furnitureItemLink.create({
            data: {
              furnitureItemId: mapping.itemId,
              type: 'image',
              url: `/images/kitchen/${image.filename}`,
              sourceUrl: 'Unsplash',
              retailerName: 'Stock Photos',
              description: image.description,
              isPrimary: image.isPrimary,
              priority: image.priority
            }
          });

          console.log(`  ✅ Added: ${image.filename} (${(stats.size / 1024).toFixed(1)}KB)`);
        } else {
          console.log(`  ⚠️  Skipped: ${image.filename} (too small - ${stats.size} bytes)`);
        }
      } catch (error) {
        console.log(`  ❌ Error with file ${image.filename}:`, error);
      }
    }

    // Update the furniture item's primary image
    const primaryImage = mapping.images.find(img => img.isPrimary);
    if (primaryImage) {
      const filepath = path.join(imagesDir, primaryImage.filename);
      try {
        const stats = fs.statSync(filepath);
        if (stats.size > 1000) {
          await prisma.furnitureItem.update({
            where: { id: mapping.itemId },
            data: {
              primaryImage: `/images/kitchen/${primaryImage.filename}`
            }
          });
          console.log(`  🖼️  Set primary image: ${primaryImage.filename}`);
        }
      } catch (error) {
        console.log(`  ❌ Could not set primary image: ${primaryImage.filename}`);
      }
    }
  }

  console.log('\n🎉 Kitchen appliance images added to database!');
}

// Run the script
addImagesToDatabase()
  .catch(console.error)
  .finally(() => prisma.$disconnect());