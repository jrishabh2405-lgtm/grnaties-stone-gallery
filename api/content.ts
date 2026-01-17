import type { VercelRequest, VercelResponse } from '@vercel/node';
import prisma from './_lib/prisma.js';
import { handleCors } from './_lib/cors.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (handleCors(req, res)) return;

    const { type } = req.query;

    try {
        if (req.method === 'GET') {
            // Testimonials
            if (type === 'testimonials') {
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
            if (type === 'team') {
                const team = await prisma.teamMember.findMany({
                    where: { isActive: true },
                    orderBy: { order: 'asc' },
                });
                return res.json(team);
            }

            // FAQs
            if (type === 'faqs') {
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

            return res.status(400).json({ message: 'Invalid content type. Use ?type=testimonials|team|faqs' });
        }

        return res.status(405).json({ message: 'Method not allowed' });
    } catch (error) {
        console.error('Content API error:', error);
        return res.status(500).json({ message: 'Server error' });
    }
}
