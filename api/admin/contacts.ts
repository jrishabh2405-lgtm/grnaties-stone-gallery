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
            // Get all contacts
            const { status } = req.query;

            const where: any = {};
            if (status) {
                where.status = status as string;
            }

            const contacts = await prisma.contact.findMany({
                where,
                orderBy: { createdAt: 'desc' },
            });

            return res.json(contacts);
        }

        if (req.method === 'PATCH') {
            // Update contact status
            const { id } = req.query;
            if (!id || typeof id !== 'string') {
                return res.status(400).json({ message: 'Invalid contact ID' });
            }

            const { status } = req.body;

            const contact = await prisma.contact.update({
                where: { id },
                data: { status },
            });

            return res.json(contact);
        }

        if (req.method === 'DELETE') {
            // Delete contact
            const { id } = req.query;
            if (!id || typeof id !== 'string') {
                return res.status(400).json({ message: 'Invalid contact ID' });
            }

            await prisma.contact.delete({
                where: { id },
            });

            return res.json({ message: 'Contact deleted successfully' });
        }

        return res.status(405).json({ message: 'Method not allowed' });
    } catch (error) {
        console.error('Admin contacts API error:', error);
        return res.status(500).json({ message: 'Server error' });
    }
}
