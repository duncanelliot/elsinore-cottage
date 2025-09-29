import { PrismaClient } from '@prisma/client';
import fs from 'fs/promises';
import path from 'path';

const prisma = new PrismaClient();

interface ProductImageMapping {
  itemId: string;
  item: string;
  product: string;
  johnLewisUrls: string[];
  imageDescriptions: string[];
}

// High-quality product images from manufacturer websites and other retailers
const productImageMappings: ProductImageMapping[] = [
  {
    itemId: 'cmg2gvrhz000qucg8i62hd3h4',
    item: 'Kettle',
    product: 'Smeg KLF03CRUK Electric Kettle',
    johnLewisUrls: [
      'https://images.smeg.com/products/KLF03CRUK_2.jpg',
      'https://images.smeg.com/products/KLF03CRUK_3.jpg',
      'https://images.smeg.com/products/KLF03CRUK_4.jpg',
      'https://images.smeg.com/products/KLF03CRUK_5.jpg'
    ],
    imageDescriptions: [
      'Main product view - cream kettle',
      'Side angle view',
      'Detail view of controls and spout',
      'Lifestyle shot with kitchen setting'
    ]
  },
  {
    itemId: 'cmg2gvri0000rucg8v8m921qi',
    item: 'Toaster',
    product: 'Smeg TSF01CRUK 2-Slice Toaster',
    johnLewisUrls: [
      'https://images.smeg.com/products/TSF01CRUK_2.jpg',
      'https://images.smeg.com/products/TSF01CRUK_3.jpg',
      'https://images.smeg.com/products/TSF01CRUK_4.jpg'
    ],
    imageDescriptions: [
      'Main product view - cream toaster',
      'Side view with bread slots visible',
      'Control panel and dial detail'
    ]
  },
  {
    itemId: 'cmg2gvri0000sucg8qafar8zk',
    item: 'Coffee Machine',
    product: 'French press',
    johnLewisUrls: [
      'https://cdn.shopify.com/s/files/1/0066/2852/products/Chambord-8-cup-Chrome_1024x1024.jpg',
      'https://cdn.shopify.com/s/files/1/0066/2852/products/Chambord-8-cup-Chrome-parts_1024x1024.jpg',
      'https://cdn.shopify.com/s/files/1/0066/2852/products/Chambord-8-cup-Chrome-lifestyle_1024x1024.jpg'
    ],
    imageDescriptions: [
      'Main view of Bodum Chambord French press',
      'Exploded view showing all components',
      'Coffee brewing demonstration'
    ]
  },
  {
    itemId: 'cmg2gvri1000tucg87l5ch2a1',
    item: 'Coffee Machine',
    product: 'Percolator',
    johnLewisUrls: [
      'https://cdn.shopify.com/s/files/1/0589/7761/products/Bialetti-Venus-6-cup-front_1024x1024.jpg',
      'https://cdn.shopify.com/s/files/1/0589/7761/products/Bialetti-Venus-6-cup-side_1024x1024.jpg'
    ],
    imageDescriptions: [
      'Main view of stovetop espresso maker',
      'Side view showing construction detail'
    ]
  },
  {
    itemId: 'cmg2gvri4000wucg8ggh54apm',
    item: 'Hand Blender',
    product: 'Braun MultiQuick 7 Hand Blender MQ7087X',
    johnLewisUrls: [
      'https://images.braun.com/is/image/braun/MQ7087X_1',
      'https://images.braun.com/is/image/braun/MQ7087X_2',
      'https://images.braun.com/is/image/braun/MQ7087X_3'
    ],
    imageDescriptions: [
      'Main view of Braun MultiQuick 7 hand blender',
      'Accessories and attachments overview',
      'In-use demonstration with bowl'
    ]
  },
  {
    itemId: 'cmg2gvri4000xucg8mbqq4f7e',
    item: 'Slow Cooker',
    product: 'Crock-Pot CSC025 3.5L Digital Slow Cooker',
    johnLewisUrls: [
      'https://images.crockpot.com/image/upload/v1/products/csc025/main',
      'https://images.crockpot.com/image/upload/v1/products/csc025/alt1',
      'https://images.crockpot.com/image/upload/v1/products/csc025/alt2'
    ],
    imageDescriptions: [
      'Main view of Crock-Pot digital slow cooker',
      'Digital control panel close-up',
      'Interior ceramic pot and lid view'
    ]
  }
];

async function downloadImages() {
  console.log('🖼️  Starting John Lewis image download...');

  // Ensure images directory exists
  const imagesDir = path.join(process.cwd(), 'static', 'images', 'kitchen');
  await fs.mkdir(imagesDir, { recursive: true });

  for (const mapping of productImageMappings) {
    console.log(`\n📥 Processing ${mapping.item}: ${mapping.product}`);

    for (let i = 0; i < mapping.johnLewisUrls.length; i++) {
      const imageUrl = mapping.johnLewisUrls[i];
      const description = mapping.imageDescriptions[i];

      try {
        // Create filename based on item and image index
        const filename = `${mapping.item.toLowerCase().replace(/\s+/g, '-')}-${i + 1}.jpg`;
        const filepath = path.join(imagesDir, filename);

        console.log(`  Downloading: ${filename}`);

        // Download image using curl
        const response = await fetch(imageUrl);
        if (response.ok) {
          const buffer = await response.arrayBuffer();
          await fs.writeFile(filepath, Buffer.from(buffer));

          // Add to database
          await prisma.furnitureItemLink.create({
            data: {
              furnitureItemId: mapping.itemId,
              type: 'image',
              url: `/images/kitchen/${filename}`,
              sourceUrl: imageUrl,
              retailerName: 'John Lewis',
              description: description,
              isPrimary: i === 0, // First image is primary
              priority: i + 1
            }
          });

          console.log(`  ✅ Downloaded and saved: ${filename}`);
        } else {
          console.log(`  ❌ Failed to download: ${imageUrl} (${response.status})`);
        }
      } catch (error) {
        console.error(`  ❌ Error downloading ${imageUrl}:`, error);
      }
    }
  }

  console.log('\n🎉 John Lewis image download completed!');
}

// Run the download
downloadImages()
  .catch(console.error)
  .finally(() => prisma.$disconnect());