import type { VercelRequest, VercelResponse } from '@vercel/node';
import prisma from '../_lib/prisma';
import { handleCors } from '../_lib/cors';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (handleCors(req, res)) return;

    try {
        if (req.method === 'GET') {
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

        return res.status(405).json({ message: 'Method not allowed' });
    } catch (error) {
        console.error('Gallery API error:', error);
        return res.status(500).json({ message: 'Server error' });
    }
}
