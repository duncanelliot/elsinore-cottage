import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import fs from 'fs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user with full permissions
  const hashedPassword = await bcrypt.hash('seaside2024', 12);
  
  const adminUser = await prisma.user.upsert({
    where: { username: 'admin-leon' },
    update: {
      password: hashedPassword,
      lastLogin: new Date()
    },
    create: {
      email: 'leon@elsinore-cottage.com',
      username: 'admin-leon',
      password: hashedPassword,
      name: 'Leon Administrator',
      role: 'super_admin',
      isActive: true,
      permissions: {
        create: {
          canViewBookings: true,
          canEditBookings: true,
          canDeleteBookings: true,
          canViewUsers: true,
          canEditUsers: true,
          canDeleteUsers: true,
          canManageSettings: true,
          canViewReports: true,
          canManageCalendar: true,
          canManagePricing: true
        }
      }
    },
    include: {
      permissions: true
    }
  });

  console.log(`✅ Created admin user: ${adminUser.username}`);

  // Create some sample admin settings
  const settings = [
    { key: 'base_price_per_night', value: '150', type: 'number' },
    { key: 'max_guests', value: '8', type: 'number' },
    { key: 'check_in_time', value: '15:00', type: 'string' },
    { key: 'check_out_time', value: '10:00', type: 'string' },
    { key: 'booking_enabled', value: 'true', type: 'boolean' },
    { key: 'property_name', value: 'Elsinore Cottage', type: 'string' },
    { key: 'property_email', value: 'bookings@elsinore-cottage.com', type: 'string' },
    { key: 'property_phone', value: '+44 1983 400999', type: 'string' }
  ];

  for (const setting of settings) {
    await prisma.adminSetting.upsert({
      where: { key: setting.key },
      update: { value: setting.value, type: setting.type },
      create: setting
    });
  }

  console.log(`✅ Created ${settings.length} admin settings`);

  // Create some sample pricing tiers
  const pricingTiers = [
    {
      name: 'Peak Season (Summer)',
      startDate: new Date('2024-07-01'),
      endDate: new Date('2024-08-31'),
      multiplier: 1.5,
      priority: 3,
      isActive: true
    },
    {
      name: 'High Season (Spring/Early Autumn)',
      startDate: new Date('2024-05-01'),
      endDate: new Date('2024-06-30'),
      multiplier: 1.3,
      priority: 2,
      isActive: true
    },
    {
      name: 'Weekend Premium',
      multiplier: 1.2,
      priority: 1,
      isActive: true
    }
  ];

  for (const tier of pricingTiers) {
    // Check if exists first, then create if not
    const existing = await prisma.pricingTier.findFirst({
      where: { name: tier.name }
    });
    
    if (!existing) {
      await prisma.pricingTier.create({
        data: tier
      });
    }
  }

  console.log(`✅ Created pricing tiers`);

  // Clear existing furniture items first
  await prisma.furnitureItem.deleteMany({});
  console.log(`✅ Cleared existing furniture items`);

  // Load furniture items from CSV-parsed data
  const seedDataPath = '/Users/admin/Documents/housey/scripts/furniture-seed-data.js';
  const seedDataContent = fs.readFileSync(seedDataPath, 'utf-8');
  // Extract the JSON array from the file
  const jsonMatch = seedDataContent.match(/const furnitureItems = (\[[\s\S]*?\]);/);
  if (!jsonMatch) {
    throw new Error('Could not parse furniture seed data');
  }

  const furnitureItems = JSON.parse(jsonMatch[1]);

  for (const furnitureItem of furnitureItems) {
    // Check if exists first, then create if not
    const existing = await prisma.furnitureItem.findFirst({
      where: {
        item: furnitureItem.item,
        product: furnitureItem.product
      }
    });

    if (!existing) {
      await prisma.furnitureItem.create({
        data: {
          item: furnitureItem.item,
          product: furnitureItem.product,
          price: furnitureItem.price,
          link: furnitureItem.link,
          room: furnitureItem.room,
          roomDisplayName: furnitureItem.roomDisplayName,
          roomColor: furnitureItem.roomColor,
          primaryImage: furnitureItem.primaryImage,
          priority: furnitureItem.priority,
          isActive: furnitureItem.isActive,
          notes: furnitureItem.notes
        }
      });
    }
  }

  console.log(`✅ Created ${furnitureItems.length} furniture items`);

  console.log('🎉 Seeding completed!');
  console.log('\n📋 Admin Login Details:');
  console.log('Username: admin-leon');
  console.log('Password: seaside2024');
  console.log('Role: super_admin');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });