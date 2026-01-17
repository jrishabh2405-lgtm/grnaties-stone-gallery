import type { VercelRequest, VercelResponse } from '@vercel/node';
import prisma from '../_lib/prisma.js';
import { handleCors } from '../_lib/cors.js';
import * as nodemailer from 'nodemailer';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (handleCors(req, res)) return;

    // Get route from path - handles both string and array formats
    let route = '';

    const pathParam = req.query.path;
    if (pathParam) {
        if (Array.isArray(pathParam)) {
            route = pathParam.join('/');
        } else if (typeof pathParam === 'string') {
            route = pathParam;
        }
    }

    // Remove "public/" prefix if present (from rewrite)
    route = route.replace(/^public\//, '');

    console.log('Public API - route:', route, 'query.path:', pathParam, 'url:', req.url);

    try {
        // Products routes
        if (route === 'products' || route === '') {
            return handleProducts(req, res);
        }

        if (route.startsWith('products/related/')) {
            const id = route.replace('products/related/', '');
            return handleRelatedProducts(req, res, id);
        }

        if (route.startsWith('products/')) {
            const id = route.replace('products/', '');
            return handleProductById(req, res, id);
        }

        // Gallery routes
        if (route === 'gallery') {
            return handleGallery(req, res);
        }

        if (route.startsWith('gallery/')) {
            const id = route.replace('gallery/', '');
            return handleGalleryById(req, res, id);
        }

        // Contact route
        if (route === 'contact') {
            return handleContact(req, res);
        }

        // Testimonials route
        if (route === 'testimonials') {
            return handleTestimonials(req, res);
        }

        // Team route
        if (route === 'team') {
            return handleTeam(req, res);
        }

        // FAQs route
        if (route === 'faqs') {
            return handleFaqs(req, res);
        }

        return res.status(404).json({ message: 'Not found' });
    } catch (error) {
        console.error('Public API error:', error);
        return res.status(500).json({ message: 'Server error' });
    }
}

// Products list
async function handleProducts(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { category, subCategory, search, popular, limit } = req.query;

    const where: any = {};

    if (category) {
        where.category = category as string;
    }

    if (subCategory) {
        where.subCategory = subCategory as string;
    }

    if (popular === 'true') {
        where.isPopular = true;
    }

    if (search) {
        where.OR = [
            { name: { contains: search as string, mode: 'insensitive' } },
            { description: { contains: search as string, mode: 'insensitive' } },
            { category: { contains: search as string, mode: 'insensitive' } },
            { subCategory: { contains: search as string, mode: 'insensitive' } },
            { origin: { contains: search as string, mode: 'insensitive' } },
        ];
    }

    const products = await prisma.product.findMany({
        where,
        take: limit ? parseInt(limit as string) : undefined,
        orderBy: { createdAt: 'desc' },
    });

    return res.json(products);
}

// Single product by ID
async function handleProductById(req: VercelRequest, res: VercelResponse, id: string) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const product = await prisma.product.findUnique({
        where: { id },
    });

    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }

    return res.json(product);
}

// Related products
async function handleRelatedProducts(req: VercelRequest, res: VercelResponse, id: string) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const product = await prisma.product.findUnique({
        where: { id },
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

    return res.json(relatedProducts);
}

// Gallery list
async function handleGallery(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

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

    return res.json(items);
}

// Gallery by ID
async function handleGalleryById(req: VercelRequest, res: VercelResponse, id: string) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const item = await prisma.gallery.findUnique({
        where: { id },
    });

    if (!item) {
        return res.status(404).json({ message: 'Gallery item not found' });
    }

    return res.json(item);
}

// Contact form submission
async function handleContact(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { name, email, phone, message } = req.body;

    // Validation
    if (!name || !email || !message) {
        return res.status(400).json({ message: 'Name, email, and message are required' });
    }

    if (!email.includes('@')) {
        return res.status(400).json({ message: 'Invalid email address' });
    }

    // Create contact
    const contact = await prisma.contact.create({
        data: {
            name: name.trim(),
            email: email.toLowerCase().trim(),
            phone: phone || null,
            message: message.trim(),
        },
    });

    // Send email notification (optional - requires configuration)
    if (process.env.SMTP_HOST && process.env.SMTP_USER) {
        try {
            const transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                port: parseInt(process.env.SMTP_PORT || '587'),
                secure: process.env.SMTP_SECURE === 'true',
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS,
                },
            });

            await transporter.sendMail({
                from: process.env.SMTP_FROM || process.env.SMTP_USER,
                to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
                subject: `New Contact Form Submission from ${name}`,
                html: `
                    <h2>New Contact Form Submission</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
                    <p><strong>Message:</strong></p>
                    <p>${message}</p>
                `,
            });
        } catch (emailError) {
            console.error('Email sending error:', emailError);
            // Don't fail the request if email fails
        }
    }

    return res.status(201).json({ message: 'Message sent successfully' });
}

// Testimonials
async function handleTestimonials(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { featured } = req.query;

    const where: any = { isActive: true };
    if (featured === 'true') {
        where.featured = true;
    }

    const testimonials = await prisma.testimonial.findMany({
        where,
        orderBy: { createdAt: 'desc' },
    });

    return res.json(testimonials);
}

// Team members
async function handleTeam(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const team = await prisma.teamMember.findMany({
        where: { isActive: true },
        orderBy: { order: 'asc' },
    });

    return res.json(team);
}

// FAQs
async function handleFaqs(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { category } = req.query;

    const where: any = { isActive: true };
    if (category && typeof category === 'string') {
        where.category = category;
    }

    const faqs = await prisma.fAQ.findMany({
        where,
        orderBy: { order: 'asc' },
    });

    return res.json(faqs);
}
