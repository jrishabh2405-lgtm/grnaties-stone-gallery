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
            // Create product
            const { fields, files } = await parseForm(req);

            const dataStr = Array.isArray(fields.data) ? fields.data[0] : fields.data;
            const productData = JSON.parse(dataStr as string);

            // Upload image to Cloudinary if provided
            if (files.image) {
                const imageFile = Array.isArray(files.image) ? files.image[0] : files.image;
                const imageUrl = await uploadToCloudinary(imageFile.filepath, 'sm-grnaties/products');
                productData.image = imageUrl;
            }

            const product = await prisma.product.create({
                data: productData,
            });

            return res.status(201).json(product);
        }

        if (req.method === 'PUT') {
            // Update product
            const { id } = req.query;
            if (!id || typeof id !== 'string') {
                return res.status(400).json({ message: 'Invalid product ID' });
            }

            const { fields, files } = await parseForm(req);

            const dataStr = Array.isArray(fields.data) ? fields.data[0] : fields.data;
            const productData = JSON.parse(dataStr as string);

            // Upload image to Cloudinary if provided
            if (files.image) {
                const imageFile = Array.isArray(files.image) ? files.image[0] : files.image;
                const imageUrl = await uploadToCloudinary(imageFile.filepath, 'sm-grnaties/products');
                productData.image = imageUrl;
            }

            const product = await prisma.product.update({
                where: { id },
                data: productData,
            });

            return res.json(product);
        }

        if (req.method === 'DELETE') {
            // Delete product
            const { id } = req.query;
            if (!id || typeof id !== 'string') {
                return res.status(400).json({ message: 'Invalid product ID' });
            }

            await prisma.product.delete({
                where: { id },
            });

            return res.json({ message: 'Product deleted successfully' });
        }

        return res.status(405).json({ message: 'Method not allowed' });
    } catch (error) {
        console.error('Admin products API error:', error);
        return res.status(500).json({ message: 'Server error' });
    }
}
