import type { VercelRequest, VercelResponse } from '@vercel/node';
import prisma from '../_lib/prisma.js';
import { handleCors } from '../_lib/cors.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (handleCors(req, res)) return;

    const { id } = req.query;

    if (!id || typeof id !== 'string') {
        return res.status(400).json({ message: 'Invalid gallery ID' });
    }

    try {
        if (req.method === 'GET') {
            const item = await prisma.gallery.findUnique({
                where: { id },
            });

            if (!item) {
                return res.status(404).json({ message: 'Gallery item not found' });
            }

            return res.json(item);
        }

        return res.status(405).json({ message: 'Method not allowed' });
    } catch (error) {
        console.error('Gallery item API error:', error);
        return res.status(500).json({ message: 'Server error' });
    }
}
