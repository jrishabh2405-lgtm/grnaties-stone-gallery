import type { VercelRequest, VercelResponse } from '@vercel/node';
import prisma from '../_lib/prisma';
import { handleCors } from '../_lib/cors';
import { AuthRequest, requireAdmin } from '../_lib/auth';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (handleCors(req, res)) return;

    const authReq = req as AuthRequest;
    if (!requireAdmin(authReq, res)) return;

    try {
        if (req.method === 'GET') {
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

        return res.status(405).json({ message: 'Method not allowed' });
    } catch (error) {
        console.error('Admin stats API error:', error);
        return res.status(500).json({ message: 'Server error' });
    }
}
