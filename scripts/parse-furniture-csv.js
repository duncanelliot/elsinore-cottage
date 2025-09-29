import fs from 'fs';
import path from 'path';

// Read the CSV file
const csvPath = '/Users/admin/Documents/housey/src/routes/furniture/data.csv.csv';
const csvContent = fs.readFileSync(csvPath, 'utf-8');

// Parse CSV manually since the data has some formatting issues
const lines = csvContent.split('\n');
const header = lines[0].split(',');

// Find the relevant columns
const roomIndex = 0;
const whatIndex = 1;
const productIndex = 2;
const priceIndex = 3;
const quantityIndex = 4;
const commentsIndex = 5;
const imageIndex = 6;

const furnitureItems = [];
const seenItems = new Set(); // To deduplicate

// Process each line
for (let i = 1; i < lines.length; i++) {
  const line = lines[i].trim();
  if (!line) continue;

  // Split by comma but handle quoted values
  const columns = [];
  let current = '';
  let inQuotes = false;

  for (let j = 0; j < line.length; j++) {
    const char = line[j];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      columns.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  columns.push(current.trim()); // Add the last column

  const room = columns[roomIndex]?.trim() || '';
  const what = columns[whatIndex]?.trim() || '';
  const product = columns[productIndex]?.trim() || '';
  const price = columns[priceIndex]?.trim() || '';
  const quantity = columns[quantityIndex]?.trim() || '';
  const comments = columns[commentsIndex]?.trim() || '';
  const image = columns[imageIndex]?.trim() || '';

  // Skip empty rows or rows without room/what
  if (!room || !what || room === 'Room' || what === 'What') continue;

  // Skip duplicate items (same room + what + product)
  const itemKey = `${room}-${what}-${product}`;
  if (seenItems.has(itemKey)) continue;
  seenItems.add(itemKey);

  // Map room names to enum values
  const roomMap = {
    'Living Room': 'LIVING_ROOM',
    'Dining Room': 'DINING_ROOM',
    'Kitchen': 'KITCHEN',
    'Bedroom - Main': 'BEDROOM_MAIN',
    'Bathrooms': 'BATHROOMS',
    'Utility': 'UTILITY'
  };

  const roomEnum = roomMap[room];
  if (!roomEnum) {
    console.log(`Skipping unknown room: ${room}`);
    continue;
  }

  // Clean up price
  let cleanPrice = price;
  if (price.includes('"')) {
    cleanPrice = price.replace(/"/g, '');
  }
  if (!cleanPrice || cleanPrice === 'TBD' || cleanPrice === '') {
    cleanPrice = 'TBD';
  }

  // Map room to color
  const roomColorMap = {
    'LIVING_ROOM': 'blue',
    'DINING_ROOM': 'green',
    'KITCHEN': 'orange',
    'BEDROOM_MAIN': 'purple',
    'BATHROOMS': 'cyan',
    'UTILITY': 'gray'
  };

  const roomDisplayMap = {
    'LIVING_ROOM': 'Living Room',
    'DINING_ROOM': 'Dining Room',
    'KITCHEN': 'Kitchen',
    'BEDROOM_MAIN': 'Bedroom - Main',
    'BATHROOMS': 'Bathrooms',
    'UTILITY': 'Utility'
  };

  furnitureItems.push({
    item: what,
    product: product || what, // Use item name if no product specified
    price: cleanPrice,
    link: '#', // Default link since most don't have URLs in CSV
    room: roomEnum,
    roomDisplayName: roomDisplayMap[roomEnum],
    roomColor: roomColorMap[roomEnum],
    priority: furnitureItems.filter(item => item.room === roomEnum).length + 1,
    isActive: true,
    notes: comments || null,
    primaryImage: image || null
  });
}

console.log(`Parsed ${furnitureItems.length} unique furniture items`);

// Group by room for summary
const byRoom = furnitureItems.reduce((acc, item) => {
  if (!acc[item.room]) acc[item.room] = [];
  acc[item.room].push(item);
  return acc;
}, {});

console.log('\nItems by room:');
Object.keys(byRoom).forEach(room => {
  console.log(`${room}: ${byRoom[room].length} items`);
});

// Generate the seed data
const seedData = `// Parsed from CSV data
const furnitureItems = ${JSON.stringify(furnitureItems, null, 2)};

export default furnitureItems;`;

// Write to file
fs.writeFileSync('/Users/admin/Documents/housey/scripts/furniture-seed-data.js', seedData);
console.log('\n✅ Seed data written to scripts/furniture-seed-data.js');