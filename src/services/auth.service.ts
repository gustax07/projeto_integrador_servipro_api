import { prisma } from '../lib/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'segredo-provisorio';

export const autenticarUsuario = async (email: string, senhaNua: string) => {
    const user = await prisma.user.findUnique({ where: { email } });
    
    if (!user) {
        throw new Error("Credenciais invalidas"); 
    }
    const senhaCorreta = await bcrypt.compare(senhaNua, user.senha);
    
    if (!senhaCorreta) {
        throw new Error("Credenciais invalidas");
    }
    const token = jwt.sign(
        { id: user.id},
        JWT_SECRET, 
        { expiresIn: '24h' }
    );

    return token;
}