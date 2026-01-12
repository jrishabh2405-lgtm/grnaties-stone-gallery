import { v2 as cloudinary } from 'cloudinary';
import type { VercelRequest } from '@vercel/node';
import * as formidable from 'formidable';

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export interface UploadedFile {
    filepath: string;
    originalFilename: string | null;
    mimetype: string | null;
}

export async function parseForm(req: VercelRequest): Promise<{
    fields: formidable.Fields;
    files: formidable.Files;
}> {
    const form = formidable.formidable({
        maxFileSize: 10 * 1024 * 1024, // 10MB
        keepExtensions: true,
    });

    return new Promise((resolve, reject) => {
        form.parse(req as any, (err, fields, files) => {
            if (err) reject(err);
            else resolve({ fields, files });
        });
    });
}

export async function uploadToCloudinary(
    filePath: string,
    folder: string = 'sm-grnaties'
): Promise<string> {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder,
            resource_type: 'auto',
        });
        return result.secure_url;
    } catch (error) {
        console.error('Cloudinary upload error:', error);
        throw new Error('Failed to upload image');
    }
}

export async function deleteFromCloudinary(publicId: string): Promise<void> {
    try {
        await cloudinary.uploader.destroy(publicId);
    } catch (error) {
        console.error('Cloudinary delete error:', error);
        // Don't throw error, just log it
    }
}

export { cloudinary };
