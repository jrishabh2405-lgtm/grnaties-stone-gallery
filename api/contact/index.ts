import type { VercelRequest, VercelResponse } from '@vercel/node';
import prisma from '../_lib/prisma';
import { handleCors } from '../_lib/cors';
import nodemailer from 'nodemailer';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (handleCors(req, res)) return;

    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const { name, email, phone, message } = req.body;

        // Validation
        if (!name || !email || !message) {
            return res.status(400).json({ message: 'Name, email, and message are required' });
        }

        if (!email.includes('@')) {
            return res.status(400).json({ message: 'Invalid email address' });
        }

        // Create contact
        const contact = await prisma.contact.create({
            data: {
                name: name.trim(),
                email: email.toLowerCase().trim(),
                phone: phone || null,
                message: message.trim(),
            },
        });

        // Send email notification (optional - requires configuration)
        if (process.env.SMTP_HOST && process.env.SMTP_USER) {
            try {
                const transporter = nodemailer.createTransport({
                    host: process.env.SMTP_HOST,
                    port: parseInt(process.env.SMTP_PORT || '587'),
                    secure: process.env.SMTP_SECURE === 'true',
                    auth: {
                        user: process.env.SMTP_USER,
                        pass: process.env.SMTP_PASS,
                    },
                });

                await transporter.sendMail({
                    from: process.env.SMTP_FROM || process.env.SMTP_USER,
                    to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
                    subject: `New Contact Form Submission from ${name}`,
                    html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
          `,
                });
            } catch (emailError) {
                console.error('Email sending error:', emailError);
                // Don't fail the request if email fails
            }
        }

        return res.status(201).json({ message: 'Message sent successfully' });
    } catch (error) {
        console.error('Contact form error:', error);
        return res.status(500).json({ message: 'Server error' });
    }
}
