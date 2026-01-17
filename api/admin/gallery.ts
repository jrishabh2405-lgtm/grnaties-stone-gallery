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
        if (req.method === 'POST') {
            // Create gallery item
            const { fields, files } = await parseForm(req);

            const dataStr = Array.isArray(fields.data) ? fields.data[0] : fields.data;
            const galleryData = JSON.parse(dataStr as string);

            // Upload image to Cloudinary if provided
            if (files.image) {
                const imageFile = Array.isArray(files.image) ? files.image[0] : files.image;
                const imageUrl = await uploadToCloudinary(imageFile.filepath, 'sm-grnaties/gallery');
                galleryData.image = imageUrl;
            }

            const gallery = await prisma.gallery.create({
                data: galleryData,
            });

            return res.status(201).json(gallery);
        }

        if (req.method === 'PUT') {
            // Update gallery item
            const { id } = req.query;
            if (!id || typeof id !== 'string') {
                return res.status(400).json({ message: 'Invalid gallery ID' });
            }

            const { fields, files } = await parseForm(req);

            const dataStr = Array.isArray(fields.data) ? fields.data[0] : fields.data;
            const galleryData = JSON.parse(dataStr as string);

            // Upload image to Cloudinary if provided
            if (files.image) {
                const imageFile = Array.isArray(files.image) ? files.image[0] : files.image;
                const imageUrl = await uploadToCloudinary(imageFile.filepath, 'sm-grnaties/gallery');
                galleryData.image = imageUrl;
            }

            const gallery = await prisma.gallery.update({
                where: { id },
                data: galleryData,
            });

            return res.json(gallery);
        }

        if (req.method === 'DELETE') {
            // Delete gallery item
            const { id } = req.query;
            if (!id || typeof id !== 'string') {
                return res.status(400).json({ message: 'Invalid gallery ID' });
            }

            await prisma.gallery.delete({
                where: { id },
            });

            return res.json({ message: 'Gallery item deleted successfully' });
        }

        return res.status(405).json({ message: 'Method not allowed' });
    } catch (error) {
        console.error('Admin gallery API error:', error);
        return res.status(500).json({ message: 'Server error' });
    }
}
