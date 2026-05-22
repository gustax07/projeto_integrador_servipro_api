import { prisma } from '../lib/prisma';
import bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';



export const createUser = async (data: Prisma.UserCreateInput) => {
    try {

        const existingUser = await prisma.user.findUnique({
            where: { email: data.email },
        });
        if (existingUser) {
            throw new Error('Usuário já existe');
        }

        const hashedPassword = await bcrypt.hash(data.senha, 10);
        const user = await prisma.user.create({
            data: {
                ...data,
                senha: hashedPassword,
            },
            select: {
                id: true,
                nome: true,
                email: true,
            }
        });
        return user;
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        throw error;
    }
}

export const getUserById = async (id: number) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id
            },
            select: {
                id: true,
                nome: true,
                email: true,
            }
        })
        return user;
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        throw error;
    }
}