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

    const { id } = req.query;

    try {
        if (req.method === 'POST' && id && typeof id === 'string') {
            // Upload gallery images for product
            const { files } = await parseForm(req);

            const product = await prisma.product.findUnique({
                where: { id },
            });

            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }

            if (files.images) {
                const imageFiles = Array.isArray(files.images) ? files.images : [files.images];
                const uploadPromises = imageFiles.map((file: any) =>
                    uploadToCloudinary(file.filepath, 'sm-grnaties/products/gallery')
                );

                const imagePaths = await Promise.all(uploadPromises);

                const updatedProduct = await prisma.product.update({
                    where: { id },
                    data: {
                        gallery: [...product.gallery, ...imagePaths],
                    },
                });

                return res.json(updatedProduct);
            }

            return res.json(product);
        }

        return res.status(405).json({ message: 'Method not allowed' });
    } catch (error) {
        console.error('Product gallery upload error:', error);
        return res.status(500).json({ message: 'Server error' });
    }
}
