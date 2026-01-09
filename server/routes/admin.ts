import express from 'express';
import prisma from '../config/database';
import { authenticateToken, isAdmin } from '../middleware/auth';
import { upload } from '../middleware/upload';

const router = express.Router();

// Apply auth middleware to all admin routes
router.use(authenticateToken);
router.use(isAdmin);

// ========== PRODUCTS ==========

// Create product
router.post('/products', upload.single('image'), async (req, res) => {
  try {
    const productData = JSON.parse(req.body.data);

    if (req.file) {
      productData.image = `/uploads/${req.file.filename}`;
    }

    const product = await prisma.product.create({
      data: productData,
    });

    res.status(201).json(product);
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update product
router.put('/products/:id', upload.single('image'), async (req, res) => {
  try {
    const productData = JSON.parse(req.body.data);

    if (req.file) {
      productData.image = `/uploads/${req.file.filename}`;
    }

    const product = await prisma.product.update({
      where: { id: req.params.id },
      data: productData,
    });

    res.json(product);
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete product
router.delete('/products/:id', async (req, res) => {
  try {
    await prisma.product.delete({
      where: { id: req.params.id },
    });

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Upload gallery images for product
router.post('/products/:id/gallery', upload.array('images', 10), async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.params.id },
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (req.files && Array.isArray(req.files)) {
      const imagePaths = req.files.map((file) => `/uploads/${file.filename}`);
      const updatedProduct = await prisma.product.update({
        where: { id: req.params.id },
        data: {
          gallery: [...product.gallery, ...imagePaths],
        },
      });
      return res.json(updatedProduct);
    }

    res.json(product);
  } catch (error) {
    console.error('Upload gallery error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ========== GALLERY ==========

// Create gallery item
router.post('/gallery', upload.single('image'), async (req, res) => {
  try {
    const galleryData = JSON.parse(req.body.data);

    if (req.file) {
      galleryData.image = `/uploads/${req.file.filename}`;
    }

    const gallery = await prisma.gallery.create({
      data: galleryData,
    });

    res.status(201).json(gallery);
  } catch (error) {
    console.error('Create gallery error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update gallery item
router.put('/gallery/:id', upload.single('image'), async (req, res) => {
  try {
    const galleryData = JSON.parse(req.body.data);

    if (req.file) {
      galleryData.image = `/uploads/${req.file.filename}`;
    }

    const gallery = await prisma.gallery.update({
      where: { id: req.params.id },
      data: galleryData,
    });

    res.json(gallery);
  } catch (error) {
    console.error('Update gallery error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete gallery item
router.delete('/gallery/:id', async (req, res) => {
  try {
    await prisma.gallery.delete({
      where: { id: req.params.id },
    });

    res.json({ message: 'Gallery item deleted successfully' });
  } catch (error) {
    console.error('Delete gallery error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ========== CONTACTS ==========

// Get all contacts
router.get('/contacts', async (req, res) => {
  try {
    const { status } = req.query;

    const where: any = {};
    if (status) {
      where.status = status as string;
    }

    const contacts = await prisma.contact.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    res.json(contacts);
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update contact status
router.patch('/contacts/:id', async (req, res) => {
  try {
    const { status } = req.body;

    const contact = await prisma.contact.update({
      where: { id: req.params.id },
      data: { status },
    });

    res.json(contact);
  } catch (error) {
    console.error('Update contact error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete contact
router.delete('/contacts/:id', async (req, res) => {
  try {
    await prisma.contact.delete({
      where: { id: req.params.id },
    });

    res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.error('Delete contact error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ========== DASHBOARD STATS ==========

router.get('/stats', async (req, res) => {
  try {
    const [productsCount, galleryCount, newContactsCount, totalContactsCount] = await Promise.all([
      prisma.product.count(),
      prisma.gallery.count(),
      prisma.contact.count({ where: { status: 'new' } }),
      prisma.contact.count(),
    ]);

    res.json({
      productsCount,
      galleryCount,
      newContactsCount,
      totalContactsCount,
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
