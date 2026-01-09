import express from 'express';
import prisma from '../config/database';

const router = express.Router();

// Get all gallery items
router.get('/', async (req, res) => {
  try {
    const { category, featured } = req.query;

    const where: any = {};

    if (category) {
      where.category = category as string;
    }

    if (featured === 'true') {
      where.featured = true;
    }

    const items = await prisma.gallery.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    res.json(items);
  } catch (error) {
    console.error('Get gallery error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get gallery item by ID
router.get('/:id', async (req, res) => {
  try {
    const item = await prisma.gallery.findUnique({
      where: { id: req.params.id },
    });

    if (!item) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }

    res.json(item);
  } catch (error) {
    console.error('Get gallery item error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
