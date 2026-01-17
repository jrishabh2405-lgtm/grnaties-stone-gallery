import type { VercelRequest, VercelResponse } from '@vercel/node';
import prisma from '../_lib/prisma.js';
import { handleCors } from '../_lib/cors.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (handleCors(req, res)) return;

    try {
        if (req.method === 'GET') {
            const team = await prisma.teamMember.findMany({
                where: { isActive: true },
                orderBy: { order: 'asc' },
            });

            return res.json(team);
        }

        return res.status(405).json({ message: 'Method not allowed' });
    } catch (error) {
        console.error('Team API error:', error);
        return res.status(500).json({ message: 'Server error' });
    }
}
