import type { VercelRequest, VercelResponse } from '@vercel/node';
import prisma from '../_lib/prisma.js';
import { handleCors } from '../_lib/cors.js';
import { AuthRequest, requireAdmin } from '../_lib/auth.js';
import { parseForm, uploadToCloudinary } from '../_lib/upload.js';

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (handleCors(req, res)) return;

    const authReq = req as AuthRequest;
    if (!requireAdmin(authReq, res)) return;

    try {
        if (req.method === 'GET') {
            const team = await prisma.teamMember.findMany({
                orderBy: { order: 'asc' },
            });
            return res.json(team);
        }

        if (req.method === 'POST') {
            const { fields, files } = await parseForm(req);
            const dataStr = Array.isArray(fields.data) ? fields.data[0] : fields.data;
            const data = JSON.parse(dataStr as string);

            if (files.image) {
                const imageFile = Array.isArray(files.image) ? files.image[0] : files.image;
                const imageUrl = await uploadToCloudinary(imageFile.filepath, 'sm-grnaties/team');
                data.image = imageUrl;
            }

            const member = await prisma.teamMember.create({ data });
            return res.status(201).json(member);
        }

        if (req.method === 'PUT') {
            const { id } = req.query;
            if (!id || typeof id !== 'string') {
                return res.status(400).json({ message: 'Invalid team member ID' });
            }

            const { fields, files } = await parseForm(req);
            const dataStr = Array.isArray(fields.data) ? fields.data[0] : fields.data;
            const data = JSON.parse(dataStr as string);

            if (files.image) {
                const imageFile = Array.isArray(files.image) ? files.image[0] : files.image;
                const imageUrl = await uploadToCloudinary(imageFile.filepath, 'sm-grnaties/team');
                data.image = imageUrl;
            }

            const member = await prisma.teamMember.update({
                where: { id },
                data,
            });
            return res.json(member);
        }

        if (req.method === 'DELETE') {
            const { id } = req.query;
            if (!id || typeof id !== 'string') {
                return res.status(400).json({ message: 'Invalid team member ID' });
            }

            await prisma.teamMember.delete({ where: { id } });
            return res.json({ message: 'Team member deleted successfully' });
        }

        return res.status(405).json({ message: 'Method not allowed' });
    } catch (error) {
        console.error('Admin team API error:', error);
        return res.status(500).json({ message: 'Server error' });
    }
}
