import type { VercelRequest, VercelResponse } from '@vercel/node';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends VercelRequest {
    admin?: {
        id: string;
        email: string;
        role: string;
    };
}

export function authenticateToken(req: AuthRequest): { authenticated: boolean; admin?: any; error?: string } {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return { authenticated: false, error: 'Access token required' };
    }

    const secret = process.env.JWT_SECRET || 'your-secret-key-change-this';

    try {
        const decoded = jwt.verify(token, secret) as any;
        return { authenticated: true, admin: decoded };
    } catch (error) {
        return { authenticated: false, error: 'Invalid or expired token' };
    }
}

export function requireAuth(req: AuthRequest, res: VercelResponse): boolean {
    const auth = authenticateToken(req);

    if (!auth.authenticated) {
        res.status(401).json({ message: auth.error || 'Unauthorized' });
        return false;
    }

    req.admin = auth.admin;
    return true;
}

export function requireAdmin(req: AuthRequest, res: VercelResponse): boolean {
    if (!requireAuth(req, res)) {
        return false;
    }

    if (req.admin?.role !== 'admin' && req.admin?.role !== 'super_admin') {
        res.status(403).json({ message: 'Admin access required' });
        return false;
    }

    return true;
}
