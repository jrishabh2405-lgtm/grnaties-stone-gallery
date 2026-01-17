import type { VercelRequest, VercelResponse } from '@vercel/node';
import prisma from '../_lib/prisma.js';
import { handleCors } from '../_lib/cors.js';
import { AuthRequest, requireAdmin } from '../_lib/auth.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (handleCors(req, res)) return;

    const authReq = req as AuthRequest;
    if (!requireAdmin(authReq, res)) return;

    try {
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

        if (req.method === 'PUT') {
            const { id } = req.query;
            if (!id || typeof id !== 'string') {
                return res.status(400).json({ message: 'Invalid FAQ ID' });
            }

            const data = req.body;
            const faq = await prisma.fAQ.update({
                where: { id },
                data,
            });
            return res.json(faq);
        }

        if (req.method === 'DELETE') {
            const { id } = req.query;
            if (!id || typeof id !== 'string') {
                return res.status(400).json({ message: 'Invalid FAQ ID' });
            }

            await prisma.fAQ.delete({ where: { id } });
            return res.json({ message: 'FAQ deleted successfully' });
        }

        return res.status(405).json({ message: 'Method not allowed' });
    } catch (error) {
        console.error('Admin FAQs API error:', error);
        return res.status(500).json({ message: 'Server error' });
    }
}
