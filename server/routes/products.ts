import express from 'express';
import prisma from '../config/database';

const router = express.Router();

// Get all products with optional filters
router.get('/', async (req, res) => {
  try {
    const { category, search, popular, limit } = req.query;

    const where: any = {};

    if (category) {
      where.category = category as string;
    }

    if (popular === 'true') {
      where.isPopular = true;
    }

    if (search) {
      where.OR = [
        { name: { contains: search as string, mode: 'insensitive' } },
        { description: { contains: search as string, mode: 'insensitive' } },
        { category: { contains: search as string, mode: 'insensitive' } },
      ];
    }

    const products = await prisma.product.findMany({
      where,
      take: limit ? parseInt(limit as string) : undefined,
      orderBy: { createdAt: 'desc' },
    });

    res.json(products);
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.params.id },
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get related products
router.get('/:id/related', async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.params.id },
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const relatedProducts = await prisma.product.findMany({
      where: {
        id: { not: product.id },
        category: product.category,
      },
      take: 4,
    });

    res.json(relatedProducts);
  } catch (error) {
    console.error('Get related products error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
