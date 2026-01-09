import dotenv from 'dotenv';
import prisma from '../config/database';
import { connectDB, disconnectDB } from '../config/database';

dotenv.config();

// Static products data
const products = [
  {
    name: "Statuario Marble",
    category: "Marble",
    subCategory: "Italian Marble",
    origin: "Italy",
    image: "https://images.unsplash.com/photo-1545389054-cf76a0375ead?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1545389054-cf76a0375ead?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617975147774-ca80bb7f4c19?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1599619350702-30761da3f83a?q=80&w=800&auto=format&fit=crop",
    ],
    description: "Statuario Marble is a luxurious white Italian marble characterized by dramatic gray veining that creates a bold, distinctive look.",
    specifications: {
      colors: ["White with gray veining"],
      finishes: ["Polished", "Honed", "Brushed"],
      thickness: ["16mm", "18mm", "20mm", "30mm"],
      sizes: ["300x300mm", "600x600mm", "800x800mm", "Custom sizes available"]
    },
    applications: [
      { name: "Flooring", description: "Creates an opulent, luxurious ambiance" },
      { name: "Wall Cladding", description: "Perfect for feature walls" },
      { name: "Countertops", description: "Ideal for kitchen islands" },
    ],
    isImported: true,
    isPopular: true,
    inStock: true,
  },
  {
    name: "Makrana White",
    category: "Marble",
    subCategory: "Indian Marble",
    origin: "India",
    image: "https://images.unsplash.com/photo-1596731498067-13ae669a3fb3?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1596731498067-13ae669a3fb3?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1596731498064-e4b79bd35e4d?q=80&w=800&auto=format&fit=crop",
    ],
    description: "Makrana White Marble, sourced from Rajasthan, is famous for its pure white background. Same marble used in Taj Mahal.",
    specifications: {
      colors: ["Pure white with minimal veining"],
      finishes: ["Polished", "Honed", "Brushed"],
      thickness: ["16mm", "18mm", "20mm", "30mm"],
      sizes: ["300x300mm", "600x600mm", "800x800mm"]
    },
    applications: [
      { name: "Flooring", description: "Creates a bright, elegant atmosphere" },
      { name: "Wall Cladding", description: "Perfect for sophisticated wall surfaces" },
    ],
    isImported: false,
    isPopular: true,
    inStock: true,
  },
  {
    name: "Black Galaxy",
    category: "Granite",
    subCategory: "Indian Granite",
    origin: "India",
    image: "https://images.unsplash.com/photo-1559553156-2e97137af16f?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1559553156-2e97137af16f?q=80&w=800&auto=format&fit=crop",
    ],
    description: "Black Galaxy is a distinctive black granite featuring golden and silver speckles that resemble stars in the night sky.",
    specifications: {
      colors: ["Black with golden speckles"],
      finishes: ["Polished", "Flamed", "Brushed"],
      thickness: ["18mm", "20mm", "30mm"],
      sizes: ["600x600mm", "800x800mm"]
    },
    applications: [
      { name: "Countertops", description: "Durable kitchen and bathroom surfaces" },
      { name: "Flooring", description: "High-traffic areas" },
    ],
    isImported: false,
    isPopular: true,
    inStock: true,
  },
  {
    name: "Calacatta Gold",
    category: "Marble",
    subCategory: "Italian Marble",
    origin: "Italy",
    image: "https://images.unsplash.com/photo-1618220370223-3e8c7dc04aad?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1618220370223-3e8c7dc04aad?q=80&w=800&auto=format&fit=crop",
    ],
    description: "Calacatta Gold features a white background with bold golden and gray veining patterns.",
    specifications: {
      colors: ["White with gold veining"],
      finishes: ["Polished", "Honed"],
      thickness: ["18mm", "20mm", "30mm"],
      sizes: ["600x600mm", "800x800mm"]
    },
    applications: [
      { name: "Luxury Bathrooms", description: "Premium vanities and walls" },
      { name: "Feature Walls", description: "Statement pieces" },
    ],
    isImported: true,
    isPopular: true,
    inStock: true,
  },
  {
    name: "Rajasthan Black",
    category: "Granite",
    subCategory: "Indian Granite",
    origin: "India",
    image: "https://images.unsplash.com/photo-1618219944342-824e40a13285?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1618219944342-824e40a13285?q=80&w=800&auto=format&fit=crop",
    ],
    description: "Rajasthan Black is a deep black granite with subtle gray and white patterns.",
    specifications: {
      colors: ["Deep black"],
      finishes: ["Polished", "Leather"],
      thickness: ["18mm", "20mm"],
      sizes: ["600x600mm"]
    },
    applications: [
      { name: "Kitchen Counters", description: "Durable and elegant" },
      { name: "Commercial Spaces", description: "High-traffic areas" },
    ],
    isImported: false,
    isPopular: false,
    inStock: true,
  },
  {
    name: "Carrara White",
    category: "Marble",
    subCategory: "Italian Marble",
    origin: "Italy",
    image: "https://images.unsplash.com/photo-1618219965072-5ddc7a59a173?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1618219965072-5ddc7a59a173?q=80&w=800&auto=format&fit=crop",
    ],
    description: "Carrara White marble features soft white background with fine gray veining.",
    specifications: {
      colors: ["White with gray veins"],
      finishes: ["Polished", "Honed"],
      thickness: ["18mm", "20mm", "30mm"],
      sizes: ["600x600mm", "800x800mm"]
    },
    applications: [
      { name: "Bathroom Walls", description: "Classic elegance" },
      { name: "Floors", description: "Timeless beauty" },
    ],
    isImported: true,
    isPopular: true,
    inStock: true,
  },
];

async function migrateProducts() {
  try {
    await connectDB();

    console.log('🚀 Starting product migration...');

    // Check if products already exist
    const existingCount = await prisma.product.count();
    if (existingCount > 0) {
      console.log(`ℹ️  Found ${existingCount} existing products`);
      console.log('⚠️  Skipping migration to avoid duplicates');
      console.log('💡 Delete existing products first if you want to re-migrate');
      await disconnectDB();
      process.exit(0);
    }

    // Insert products
    for (const product of products) {
      await prisma.product.create({
        data: product,
      });
      console.log(`✅ Migrated: ${product.name}`);
    }

    console.log(`\n✅ Successfully migrated ${products.length} products!`);
    console.log('🎉 Your database is now populated with product data');

    await disconnectDB();
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration error:', error);
    await disconnectDB();
    process.exit(1);
  }
}

migrateProducts();
