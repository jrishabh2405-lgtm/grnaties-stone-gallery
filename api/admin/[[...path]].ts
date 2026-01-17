import type { VercelRequest, VercelResponse } from '@vercel/node';
import prisma from '../_lib/prisma.js';
import { handleCors } from '../_lib/cors.js';
import { AuthRequest, requireAdmin } from '../_lib/auth.js';
import { parseForm, uploadToCloudinary } from '../_lib/upload.js';

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (handleCors(req, res)) return;

    const authReq = req as AuthRequest;
    if (!requireAdmin(authReq, res)) return;

    // Parse route from URL path (after /api/admin/)
    const url = new URL(req.url || '', `http://${req.headers.host}`);
    const pathname = url.pathname;

    // Remove /api/admin/ prefix to get the route
    let route = pathname.replace(/^\/api\/admin\//, '').replace(/\/$/, '');

    // Also check query param as fallback (for rewrites)
    if (!route && req.query.path) {
        const pathParam = req.query.path;
        if (Array.isArray(pathParam)) {
            route = pathParam.join('/');
        } else {
            route = pathParam as string;
        }
    }

    console.log('Admin API - pathname:', pathname, 'route:', route);

    try {
        // Stats
        if (route === 'stats') {
            return handleStats(req, res);
        }

        // Products routes
        if (route === 'products') {
            return handleProducts(req, res);
        }

        if (route.startsWith('products/')) {
            const id = route.replace('products/', '');
            return handleProductsWithId(req, res, id);
        }

        // Gallery routes
        if (route === 'gallery') {
            return handleGallery(req, res);
        }

        if (route.startsWith('gallery/')) {
            const id = route.replace('gallery/', '');
            return handleGalleryWithId(req, res, id);
        }

        // Contacts routes
        if (route === 'contacts') {
            return handleContacts(req, res);
        }

        if (route.startsWith('contacts/')) {
            const id = route.replace('contacts/', '');
            return handleContactsWithId(req, res, id);
        }

        // Testimonials routes
        if (route === 'testimonials') {
            return handleTestimonials(req, res);
        }

        if (route.startsWith('testimonials/')) {
            const id = route.replace('testimonials/', '');
            return handleTestimonialsWithId(req, res, id);
        }

        // Team routes
        if (route === 'team') {
            return handleTeam(req, res);
        }

        if (route.startsWith('team/')) {
            const id = route.replace('team/', '');
            return handleTeamWithId(req, res, id);
        }

        // FAQs routes
        if (route === 'faqs') {
            return handleFaqs(req, res);
        }

        if (route.startsWith('faqs/')) {
            const id = route.replace('faqs/', '');
            return handleFaqsWithId(req, res, id);
        }

        return res.status(404).json({ message: 'Not found' });
    } catch (error) {
        console.error('Admin API error:', error);
        return res.status(500).json({ message: 'Server error' });
    }
}

// Stats handler
async function handleStats(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const [productsCount, galleryCount, newContactsCount, totalContactsCount] = await Promise.all([
        prisma.product.count(),
        prisma.gallery.count(),
        prisma.contact.count({ where: { status: 'new' } }),
        prisma.contact.count(),
    ]);

    return res.json({
        productsCount,
        galleryCount,
        newContactsCount,
        totalContactsCount,
    });
}

// Products handlers
async function handleProducts(req: VercelRequest, res: VercelResponse) {
    if (req.method === 'POST') {
        const { fields, files } = await parseForm(req);
        const dataStr = Array.isArray(fields.data) ? fields.data[0] : fields.data;
        const productData = JSON.parse(dataStr as string);

        delete productData.existingGallery;

        if (files.image) {
            const imageFile = Array.isArray(files.image) ? files.image[0] : files.image;
            const imageUrl = await uploadToCloudinary(imageFile.filepath, 'sm-grnaties/products');
            productData.image = imageUrl;
        }

        const galleryUrls = await uploadGalleryImages(files, fields);
        if (galleryUrls.length > 0) {
            productData.gallery = galleryUrls;
        }

        const product = await prisma.product.create({ data: productData });
        return res.status(201).json(product);
    }

    return res.status(405).json({ message: 'Method not allowed' });
}

async function handleProductsWithId(req: VercelRequest, res: VercelResponse, id: string) {
    if (req.method === 'PUT') {
        const { fields, files } = await parseForm(req);
        const dataStr = Array.isArray(fields.data) ? fields.data[0] : fields.data;
        const productData = JSON.parse(dataStr as string);

        delete productData.existingGallery;

        if (files.image) {
            const imageFile = Array.isArray(files.image) ? files.image[0] : files.image;
            const imageUrl = await uploadToCloudinary(imageFile.filepath, 'sm-grnaties/products');
            productData.image = imageUrl;
        }

        const galleryUrls = await uploadGalleryImages(files, fields);
        productData.gallery = galleryUrls;

        const product = await prisma.product.update({ where: { id }, data: productData });
        return res.json(product);
    }

    if (req.method === 'DELETE') {
        await prisma.product.delete({ where: { id } });
        return res.json({ message: 'Product deleted successfully' });
    }

    return res.status(405).json({ message: 'Method not allowed' });
}

// Helper to upload gallery images
async function uploadGalleryImages(files: any, fields: any): Promise<string[]> {
    const galleryUrls: string[] = [];

    const dataStr = Array.isArray(fields.data) ? fields.data[0] : fields.data;
    const data = JSON.parse(dataStr as string);
    const existingGallery = data.existingGallery || [];

    galleryUrls.push(...existingGallery);

    const galleryCountStr = Array.isArray(fields.galleryCount) ? fields.galleryCount[0] : fields.galleryCount;
    const galleryCount = parseInt(galleryCountStr as string || '0', 10);

    for (let i = 0; i < galleryCount; i++) {
        const key = `gallery_${i}`;
        if (files[key]) {
            const file = Array.isArray(files[key]) ? files[key][0] : files[key];
            try {
                const url = await uploadToCloudinary(file.filepath, 'sm-grnaties/products/gallery');
                galleryUrls.push(url);
            } catch (err) {
                console.error(`Failed to upload gallery image ${i}:`, err);
            }
        }
    }

    return galleryUrls;
}

// Gallery handlers
async function handleGallery(req: VercelRequest, res: VercelResponse) {
    if (req.method === 'POST') {
        const { fields, files } = await parseForm(req);
        const dataStr = Array.isArray(fields.data) ? fields.data[0] : fields.data;
        const galleryData = JSON.parse(dataStr as string);

        if (files.image) {
            const imageFile = Array.isArray(files.image) ? files.image[0] : files.image;
            const imageUrl = await uploadToCloudinary(imageFile.filepath, 'sm-grnaties/gallery');
            galleryData.image = imageUrl;
        }

        const gallery = await prisma.gallery.create({ data: galleryData });
        return res.status(201).json(gallery);
    }

    return res.status(405).json({ message: 'Method not allowed' });
}

async function handleGalleryWithId(req: VercelRequest, res: VercelResponse, id: string) {
    if (req.method === 'PUT') {
        const { fields, files } = await parseForm(req);
        const dataStr = Array.isArray(fields.data) ? fields.data[0] : fields.data;
        const galleryData = JSON.parse(dataStr as string);

        if (files.image) {
            const imageFile = Array.isArray(files.image) ? files.image[0] : files.image;
            const imageUrl = await uploadToCloudinary(imageFile.filepath, 'sm-grnaties/gallery');
            galleryData.image = imageUrl;
        }

        const gallery = await prisma.gallery.update({ where: { id }, data: galleryData });
        return res.json(gallery);
    }

    if (req.method === 'DELETE') {
        await prisma.gallery.delete({ where: { id } });
        return res.json({ message: 'Gallery item deleted successfully' });
    }

    return res.status(405).json({ message: 'Method not allowed' });
}

// Contacts handlers
async function handleContacts(req: VercelRequest, res: VercelResponse) {
    if (req.method === 'GET') {
        const { status } = req.query;
        const where: any = {};
        if (status) {
            where.status = status as string;
        }

        const contacts = await prisma.contact.findMany({
            where,
            orderBy: { createdAt: 'desc' },
        });

        return res.json(contacts);
    }

    return res.status(405).json({ message: 'Method not allowed' });
}

async function handleContactsWithId(req: VercelRequest, res: VercelResponse, id: string) {
    if (req.method === 'PATCH') {
        const { status } = req.body;
        const contact = await prisma.contact.update({
            where: { id },
            data: { status },
        });
        return res.json(contact);
    }

    if (req.method === 'DELETE') {
        await prisma.contact.delete({ where: { id } });
        return res.json({ message: 'Contact deleted successfully' });
    }

    return res.status(405).json({ message: 'Method not allowed' });
}

// Testimonials handlers
async function handleTestimonials(req: VercelRequest, res: VercelResponse) {
    if (req.method === 'GET') {
        const testimonials = await prisma.testimonial.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return res.json(testimonials);
    }

    if (req.method === 'POST') {
        const { fields, files } = await parseForm(req);
        const dataStr = Array.isArray(fields.data) ? fields.data[0] : fields.data;
        const data = JSON.parse(dataStr as string);

        if (files.image) {
            const imageFile = Array.isArray(files.image) ? files.image[0] : files.image;
            const imageUrl = await uploadToCloudinary(imageFile.filepath, 'sm-grnaties/testimonials');
            data.image = imageUrl;
        }

        const testimonial = await prisma.testimonial.create({ data });
        return res.status(201).json(testimonial);
    }

    return res.status(405).json({ message: 'Method not allowed' });
}

async function handleTestimonialsWithId(req: VercelRequest, res: VercelResponse, id: string) {
    if (req.method === 'PUT') {
        const { fields, files } = await parseForm(req);
        const dataStr = Array.isArray(fields.data) ? fields.data[0] : fields.data;
        const data = JSON.parse(dataStr as string);

        if (files.image) {
            const imageFile = Array.isArray(files.image) ? files.image[0] : files.image;
            const imageUrl = await uploadToCloudinary(imageFile.filepath, 'sm-grnaties/testimonials');
            data.image = imageUrl;
        }

        const testimonial = await prisma.testimonial.update({ where: { id }, data });
        return res.json(testimonial);
    }

    if (req.method === 'DELETE') {
        await prisma.testimonial.delete({ where: { id } });
        return res.json({ message: 'Testimonial deleted successfully' });
    }

    return res.status(405).json({ message: 'Method not allowed' });
}

// Team handlers
async function handleTeam(req: VercelRequest, res: VercelResponse) {
    if (req.method === 'GET') {
        const team = await prisma.teamMember.findMany({
            orderBy: { order: 'asc' },
        });
        return res.json(team);
    }

    if (req.method === 'POST') {
        const { fields, files } = await parseForm(req);
        const dataStr = Array.isArray(fields.data) ? fields.data[0] : fields.data;
        const data = JSON.parse(dataStr as string);

        if (files.image) {
            const imageFile = Array.isArray(files.image) ? files.image[0] : files.image;
            const imageUrl = await uploadToCloudinary(imageFile.filepath, 'sm-grnaties/team');
            data.image = imageUrl;
        }

        const member = await prisma.teamMember.create({ data });
        return res.status(201).json(member);
    }

    return res.status(405).json({ message: 'Method not allowed' });
}

async function handleTeamWithId(req: VercelRequest, res: VercelResponse, id: string) {
    if (req.method === 'PUT') {
        const { fields, files } = await parseForm(req);
        const dataStr = Array.isArray(fields.data) ? fields.data[0] : fields.data;
        const data = JSON.parse(dataStr as string);

        if (files.image) {
            const imageFile = Array.isArray(files.image) ? files.image[0] : files.image;
            const imageUrl = await uploadToCloudinary(imageFile.filepath, 'sm-grnaties/team');
            data.image = imageUrl;
        }

        const member = await prisma.teamMember.update({ where: { id }, data });
        return res.json(member);
    }

    if (req.method === 'DELETE') {
        await prisma.teamMember.delete({ where: { id } });
        return res.json({ message: 'Team member deleted successfully' });
    }

    return res.status(405).json({ message: 'Method not allowed' });
}

// FAQs handlers
async function handleFaqs(req: VercelRequest, res: VercelResponse) {
    if (req.method === 'GET') {
        const faqs = await prisma.fAQ.findMany({
            orderBy: { order: 'asc' },
        });
        return res.json(faqs);
    }

    if (req.method === 'POST') {
        const data = req.body;
        const faq = await prisma.fAQ.create({ data });
        return res.status(201).json(faq);
    }

    return res.status(405).json({ message: 'Method not allowed' });
}

async function handleFaqsWithId(req: VercelRequest, res: VercelResponse, id: string) {
    if (req.method === 'PUT') {
        const data = req.body;
        const faq = await prisma.fAQ.update({ where: { id }, data });
        return res.json(faq);
    }

    if (req.method === 'DELETE') {
        await prisma.fAQ.delete({ where: { id } });
        return res.json({ message: 'FAQ deleted successfully' });
    }

    return res.status(405).json({ message: 'Method not allowed' });
}
