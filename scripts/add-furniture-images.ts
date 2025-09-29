import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function addFurnitureImages() {
  console.log('🖼️  Adding furniture images...');

  // Define image mappings for kitchen items
  const imageData = [
    {
      itemName: 'Food Processor',
      productName: 'ThermoMix',
      images: [
        { url: '/images/furniture/thermomix-1.png', isPrimary: true, description: 'Main product view' },
        { url: '/images/furniture/thermomix-2.png', isPrimary: false, description: 'Side view' },
        { url: '/images/furniture/thermomix-3.png', isPrimary: false, description: 'Detail view' }
      ]
    },
    {
      itemName: 'Hand Blender',
      productName: 'Braun MultiQuick 7 Hand Blender MQ7087X',
      images: [
        { url: '/images/furniture/braun-handblender-1.jpg', isPrimary: true, description: 'Main product view' },
        { url: '/images/furniture/braun-handblender-2.jpg', isPrimary: false, description: 'Front view' },
        { url: '/images/furniture/braun-handblender-3.jpg', isPrimary: false, description: 'Detail view' }
      ]
    },
    {
      itemName: 'Slow Cooker',
      productName: 'Crock-Pot CSC025 3.5L Digital Slow Cooker',
      images: [
        { url: '/images/furniture/crockpot-1.jpg', isPrimary: true, description: 'Main product view' }
      ]
    },
    {
      itemName: 'Electric Scales',
      productName: 'Salter Disc Electronic Kitchen Scales',
      images: [
        { url: '/images/furniture/scales-1.jpg', isPrimary: true, description: 'Main product view' }
      ]
    }
  ];

  for (const itemData of imageData) {
    console.log(`Looking for furniture item: ${itemData.itemName} - ${itemData.productName}`);

    // Find the furniture item
    const furnitureItem = await prisma.furnitureItem.findFirst({
      where: {
        AND: [
          { item: { contains: itemData.itemName } },
          { product: { contains: itemData.productName.split(' ')[0] } } // Match first word of product name
        ]
      }
    });

    if (!furnitureItem) {
      console.log(`❌ Could not find furniture item: ${itemData.itemName} - ${itemData.productName}`);
      continue;
    }

    console.log(`✅ Found furniture item: ${furnitureItem.item} - ${furnitureItem.product}`);

    // Clear existing images
    await prisma.furnitureItemLink.deleteMany({
      where: { furnitureItemId: furnitureItem.id }
    });

    // Add new images
    for (const [index, imageInfo] of itemData.images.entries()) {
      await prisma.furnitureItemLink.create({
        data: {
          furnitureItemId: furnitureItem.id,
          url: imageInfo.url,
          type: 'image',
          description: imageInfo.description,
          isPrimary: imageInfo.isPrimary,
          priority: index + 1
        }
      });

      console.log(`  📸 Added image: ${imageInfo.url} (${imageInfo.isPrimary ? 'PRIMARY' : 'secondary'})`);
    }

    // Update the primaryImage field in the furniture item
    const primaryImage = itemData.images.find(img => img.isPrimary);
    if (primaryImage) {
      await prisma.furnitureItem.update({
        where: { id: furnitureItem.id },
        data: { primaryImage: primaryImage.url }
      });
      console.log(`  🎯 Set primary image: ${primaryImage.url}`);
    }
  }

  console.log('🎉 Furniture images added successfully!');
}

addFurnitureImages()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });