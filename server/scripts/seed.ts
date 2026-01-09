import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import prisma from '../config/database';
import { connectDB, disconnectDB } from '../config/database';

dotenv.config();

async function seedDatabase() {
  try {
    await connectDB();

    console.log('🌱 Starting database seeding...');

    // Create admin user
    const adminExists = await prisma.admin.findUnique({
      where: { email: 'admin@smgrnaties.com' },
    });

    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('admin123456', 10);
      await prisma.admin.create({
        data: {
          email: 'admin@smgrnaties.com',
          password: hashedPassword,
          name: 'Admin User',
          role: 'super_admin',
        },
      });
      console.log('✅ Admin user created: admin@smgrnaties.com / admin123456');
    } else {
      console.log('ℹ️  Admin user already exists');
    }

    // Check counts
    const productsCount = await prisma.product.count();
    const galleryCount = await prisma.gallery.count();

    console.log(`ℹ️  Found ${productsCount} products in database`);
    console.log(`ℹ️  Found ${galleryCount} gallery items in database`);

    console.log('✅ Database seeding completed!');
    console.log('\n📝 Next steps:');
    console.log('1. Run the backend server: npm run server:watch');
    console.log('2. Frontend is already running at http://localhost:8080');
    console.log('3. Login to admin panel at http://localhost:8080/admin/login');
    console.log('4. Use email: admin@smgrnaties.com and password: admin123456');

    await disconnectDB();
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    await disconnectDB();
    process.exit(1);
  }
}

seedDatabase();
