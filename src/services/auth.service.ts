import { prisma } from '../lib/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'Yuj';

export const autenticarUsuario = async (email: string, senhaNua: string) => {
    const user = await prisma.user.findUnique({ where: { email } });
    
    if (!user) {
        throw new Error("Credenciais invalidas"); 
    }
    const senhaCorreta = await bcrypt.compare(senhaNua, String(user.senha));
    
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

export const autenticarUsuarioGoogle = async (email: string, firebase: string, nome: string, icone: string, ) =>{
    const user = await prisma.user.upsert({
      where: { email },
      update: {
        firebaseId: firebase,
        nome: nome ?? 'Usuário',
        icone: icone ?? 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
        provider: 'google',
      },
      create: {
        email,
        nome: 'Usuário',
        provider: 'google',
        firebaseId: firebase,
        icone: icone ?? 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
        dataNascimento: new Date(),
        senha: null
      },
    });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return token;
}