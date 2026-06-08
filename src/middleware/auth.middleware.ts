import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// 1. Estendemos a interface nativa do Request para o TypeScript aceitar nosso userId
export interface AuthRequest extends Request {
    userId?: number;
}

// 2. Criamos o formato do Payload que guardamos dentro do token na hora do login
interface TokenPayload {
    id: number;
    iat: number;
    exp: number;
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction): void => {
    // Busca o token no cabeçalho (Formato esperado: "Bearer eyJhbGciOiJIUzI1Ni...")
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(401).json({ error: 'Token não fornecido.' });
        return;
    }

    // Separa a palavra "Bearer" do token em si
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        res.status(401).json({ error: 'Erro de formatação do Token.' });
        return;
    }

    const token = parts[1];

    try {
        // Verifica a validade do token usando a sua chave secreta
        const secret = process.env.JWT_SECRET || 'sua_senha_secreta_padrao';
        const decoded = jwt.verify(token, secret) as TokenPayload;

        // Injeta o ID do usuário de volta na requisição!
        req.userId = decoded.id;

        // Libera a requisição para seguir para o Controller
        return next();
    } catch (error) {
        res.status(401).json({ error: 'Token inválido ou expirado.' });
        return;
    }
};