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

// Helper to upload gallery images
async function uploadGalleryImages(files: any, fields: any): Promise<string[]> {
    const galleryUrls: string[] = [];

    // Get existing gallery URLs from data
    const dataStr = Array.isArray(fields.data) ? fields.data[0] : fields.data;
    const data = JSON.parse(dataStr as string);
    const existingGallery = data.existingGallery || [];

    // Add existing gallery URLs first
    galleryUrls.push(...existingGallery);

    // Get count of new gallery images
    const galleryCountStr = Array.isArray(fields.galleryCount) ? fields.galleryCount[0] : fields.galleryCount;
    const galleryCount = parseInt(galleryCountStr as string || '0', 10);

    // Upload new gallery images
    for (let i = 0; i < galleryCount; i++) {
        const key = `gallery_${i}`;
        if (files[key]) {
            const file = Array.isArray(files[key]) ? files[key][0] : files[key];
            try {
                const url = await uploadToCloudinary(file.filepath, 'sm-grnaties/products/gallery');
                galleryUrls.push(url);
            } catch (err) {
                console.error(`Failed to upload gallery image ${i}:`, err);
            }
        }
    }

    return galleryUrls;
}

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

            // Remove existingGallery from productData (it's only used for processing)
            delete productData.existingGallery;

            // Upload main image if provided
            if (files.image) {
                const imageFile = Array.isArray(files.image) ? files.image[0] : files.image;
                const imageUrl = await uploadToCloudinary(imageFile.filepath, 'sm-grnaties/products');
                productData.image = imageUrl;
            }

            // Upload gallery images
            const galleryUrls = await uploadGalleryImages(files, fields);
            if (galleryUrls.length > 0) {
                productData.gallery = galleryUrls;
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

            // Remove existingGallery from productData (it's only used for processing)
            delete productData.existingGallery;

            // Upload main image if provided
            if (files.image) {
                const imageFile = Array.isArray(files.image) ? files.image[0] : files.image;
                const imageUrl = await uploadToCloudinary(imageFile.filepath, 'sm-grnaties/products');
                productData.image = imageUrl;
            }

            // Upload gallery images (this includes existing + new)
            const galleryUrls = await uploadGalleryImages(files, fields);
            productData.gallery = galleryUrls;

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
