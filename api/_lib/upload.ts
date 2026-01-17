import type { VercelRequest } from '@vercel/node';
import * as formidable from 'formidable';
import { readFileSync } from 'fs';
import supabase from './supabase.js';

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

export async function uploadToSupabase(
    filePath: string,
    folder: string = 'images'
): Promise<string> {
    try {
        const fileBuffer = readFileSync(filePath);
        const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}`;

        const { data, error } = await supabase.storage
            .from('sm-grnaties')
            .upload(fileName, fileBuffer, {
                contentType: 'image/jpeg',
                upsert: true,
            });

        if (error) {
            console.error('Supabase upload error:', error);
            throw new Error('Failed to upload image');
        }

        // Get public URL
        const { data: urlData } = supabase.storage
            .from('sm-grnaties')
            .getPublicUrl(data.path);

        return urlData.publicUrl;
    } catch (error) {
        console.error('Upload error:', error);
        throw new Error('Failed to upload image');
    }
}

export async function deleteFromSupabase(filePath: string): Promise<void> {
    try {
        // Extract the path from the full URL if needed
        const path = filePath.includes('sm-grnaties/')
            ? filePath.split('sm-grnaties/')[1]
            : filePath;

        await supabase.storage.from('sm-grnaties').remove([path]);
    } catch (error) {
        console.error('Supabase delete error:', error);
        // Don't throw error, just log it
    }
}

// Keep old function names as aliases for compatibility
export const uploadToCloudinary = uploadToSupabase;
export const deleteFromCloudinary = deleteFromSupabase;
