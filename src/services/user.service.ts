import { prisma } from '../lib/prisma';
import bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';

export const createUser = async (data: Prisma.UserCreateInput) => {
    try {
        const hashedPassword = await bcrypt.hash(data.senha, 10);
        return await prisma.user.create({
            data: {
                ...data,
                senha: hashedPassword,
            },
            select: {
                id: true,
            }
        });
    } catch (error: any) {
        if (error.code === 'P2002') {
            throw new Error('E-mail ou documento já cadastrado na plataforma.');
        }
        console.error('Erro ao criar usuário:', error);
        throw error;
    }
}

export const getUserById = async (id: number) => {
    try {
        return await prisma.user.findUnique({
            where: {
                id
            },
            omit: {
                senha: true,
            }
        })
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        throw error;
    }
}

export const getAllUsers = async (page: number = 1, limit: number = 20) => {
    try {
        const skip = (page - 1) * limit;
        return await prisma.user.findMany({
            skip,
            take: limit,
            orderBy: {
                id: 'desc'
            },
            omit: {
                senha: true,
                documento: true
            }
        })
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        throw error;
    }
}

export const updateUser = async (id: number, data: Prisma.UserUpdateInput) => {
    try {
        return await prisma.user.update({
            where: {
                id
            },
            data,
            select: {
                id: true
            },
        })
    } catch (error: any) {
        if (error.code === 'P2025') {
            throw new Error('Usuário não encontrado para atualização.');
        }
        console.error('Erro ao atualizar usuário:', error);
        throw error;
    }

}

export const deleteUser = async (id: number) => {
    try {
        return await prisma.user.delete({
            where: {
                id
            },
            select: {
                id: true
            }
        });
    } catch (error: any) {
        if (error.code === 'P2025') {
            console.warn('Tentativa de deletar um usuário que não existe:', id);
            return null;
        }

        console.error('Erro ao deletar usuário:', error);
        throw error;
    }
}