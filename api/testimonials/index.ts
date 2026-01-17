import type { VercelRequest, VercelResponse } from '@vercel/node';
import prisma from '../_lib/prisma.js';
import { handleCors } from '../_lib/cors.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (handleCors(req, res)) return;

    try {
        if (req.method === 'GET') {
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

        return res.status(405).json({ message: 'Method not allowed' });
    } catch (error) {
        console.error('Testimonials API error:', error);
        return res.status(500).json({ message: 'Server error' });
    }
}
