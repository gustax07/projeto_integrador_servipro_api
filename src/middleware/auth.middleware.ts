import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import Logger from "../config/logger";

export interface AuthRequest extends Request {
    userId?: number;
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'Token de autenticação não fornecido no cabeçalho.' });
    }
    const partesToken = authHeader.split(' ');
    if (partesToken.length !== 2 || partesToken[0] !== 'Bearer') {
        return res.status(401).json({ error: 'Formato de token malformado. Use: Bearer <token>' });
    }

    const token = partesToken[1];

    if (!token) {
        return res.status(401).json({ error: 'Token de autenticação ausente.' });
    }
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        Logger.error('ERRO CRÍTICO: JWT_SECRET não está definido nas variáveis de ambiente.');
        return res.status(500).json({ error: 'Erro interno de configuração do servidor.' });
    }

    try {
        const decoded = jwt.verify(token, jwtSecret) as { id: number };

        req.userId = decoded.id;
        
        return next(); 

    } catch (error: any) {
        if (error.name === 'TokenExpiredError') {
            Logger.warn(`Sessão expirada para o token processado.`);
            return res.status(401).json({ error: 'Sessão expirada. Faça login novamente.', code: 'TOKEN_EXPIRED' });
        }
        
        if (error.name === 'JsonWebTokenError') {
            Logger.error(`Tentativa de uso de token inválido ou forjado.`);
            return res.status(401).json({ error: 'Token de autenticação inválido.', code: 'INVALID_TOKEN' });
        }
        
        Logger.error(`Falha inesperada na verificação do JWT: ${error.message}`);
        return res.status(401).json({ error: 'Falha na autenticação.' });
    }
}