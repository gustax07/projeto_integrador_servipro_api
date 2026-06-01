import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { isTokenBlacklisted } from '../services/token.service';

// Assumindo que JWT_SECRET está definido em suas variáveis de ambiente
const JWT_SECRET = process.env.JWT_SECRET || 'segredo-provisorio';

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token de autenticação não fornecido.' });
    }

    const token = authHeader.split(' ')[1];

    try {
        // 1. Verifica a validade do token (assinatura e expiração)
        jwt.verify(token, JWT_SECRET);

        // 2. Verifica se o token está na lista negra
        const blacklisted = await isTokenBlacklisted(token);
        if (blacklisted) {
            return res.status(401).json({ message: 'Token inválido ou expirado.' });
        }
        next();
    } catch (error: any) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expirado.' });
        }
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Token inválido.' });
        }
        return res.status(500).json({ message: 'Falha na autenticação do token.' });
    }
};