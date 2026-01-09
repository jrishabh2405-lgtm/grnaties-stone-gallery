import type { VercelRequest, VercelResponse } from '@vercel/node';
import prisma from '../_lib/prisma';
import { handleCors } from '../_lib/cors';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (handleCors(req, res)) return;

    const { id } = req.query;

    if (!id || typeof id !== 'string') {
        return res.status(400).json({ message: 'Invalid product ID' });
    }

    try {
        if (req.method === 'GET') {
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

        return res.status(405).json({ message: 'Method not allowed' });
    } catch (error) {
        console.error('Related products API error:', error);
        return res.status(500).json({ message: 'Server error' });
    }
}
