import type { VercelRequest, VercelResponse } from '@vercel/node';
import prisma from '../_lib/prisma.js';
import { handleCors } from '../_lib/cors.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (handleCors(req, res)) return;

    try {
        if (req.method === 'GET') {
            // Get all products with optional filters
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

        return res.status(405).json({ message: 'Method not allowed' });
    } catch (error) {
        console.error('Products API error:', error);
        return res.status(500).json({ message: 'Server error' });
    }
}
