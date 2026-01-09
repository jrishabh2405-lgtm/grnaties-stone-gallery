import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log('✅ PostgreSQL Connected Successfully');
  } catch (error) {
    console.error('❌ PostgreSQL Connection Error:', error);
    throw error;
  }
};

export const disconnectDB = async () => {
  await prisma.$disconnect();
};

export default prisma;
