import type { VercelRequest, VercelResponse } from '@vercel/node';
import * as bcrypt from 'bcryptjs';
import prisma from '../_lib/prisma.js';
import { handleCors } from '../_lib/cors.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (handleCors(req, res)) return;

    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        // Check if admin already exists
        const adminCount = await prisma.admin.count();
        if (adminCount > 0) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        const { email, password, name } = req.body;

        // Validation
        if (!email || !password || !name) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create admin
        await prisma.admin.create({
            data: {
                email: email.toLowerCase(),
                password: hashedPassword,
                name,
                role: 'super_admin',
            },
        });

        res.status(201).json({ message: 'Admin created successfully' });
    } catch (error) {
        console.error('Setup error:', error);
        res.status(500).json({ message: 'Server error' });
    }
}
