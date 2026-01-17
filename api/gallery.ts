import type { VercelRequest, VercelResponse } from '@vercel/node';
import prisma from './_lib/prisma.js';
import { handleCors } from './_lib/cors.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (handleCors(req, res)) return;

    const { id } = req.query;

    try {
        if (req.method === 'GET') {
            // If id is provided, get single gallery item
            if (id && typeof id === 'string') {
                const item = await prisma.gallery.findUnique({
                    where: { id },
                });

                if (!item) {
                    return res.status(404).json({ message: 'Gallery item not found' });
                }

                return res.json(item);
            }

            // Get all gallery items with optional filters
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
