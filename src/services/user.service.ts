import { prisma } from '../lib/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Prisma } from '@prisma/client';
import { blacklistToken } from './token.service';
import { AppError } from '../utils/AppError';

export const createUser = async (data: Prisma.UserCreateInput) => {
    try {
        const hashedPassword = await bcrypt.hash(data.senha, 10);
        return await prisma.user.create({
            data: {
                ...data,
                senha: hashedPassword,
                dataNascimento: new Date(data.dataNascimento),
            },
            select: {
                id: true,
            }
        });
    } catch (error: any) {
        if (error.code === 'P2002') {
            throw new AppError('E-mail ou documento já cadastrado na plataforma.', 404);
        }
        throw error;
    }
}

export const getUserById = async (id: number) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id
            },
            omit: {
                senha: true,
            }
        })

        if (!user) {
            throw new AppError('Usuário não encontrado.', 404)
        }
        return user;
    } catch (error) {
        throw error;
    }
}

export const getAllUsers = async (page: number = 1, limit: number = 20) => {
    try {
        const skip = (page - 1) * limit;
        const user = await prisma.user.findMany({
            skip,
            take: limit,
            orderBy: {
                id: 'desc'
            },
            omit: {
                senha: true,
            }
        })

        if (user.length === 0) {
            throw new AppError('Nenhum usuário encontrado.', 404)
        }
        return user;
    } catch (error) {
        throw error;
    }
}

export const updateUser = async (id: number, data: Prisma.UserUpdateInput) => {
    try {
        const dataToUpdate: Prisma.UserUpdateInput = { ...data };
        if (data.senha && typeof data.senha === 'string' && data.senha.trim() !== '') {
            dataToUpdate.senha = await bcrypt.hash(data.senha, 10);
        } else {
            delete dataToUpdate.senha;
        }
        if (data.dataNascimento) {
            const date = new Date(String(data.dataNascimento));
            if (isNaN(date.getTime())) {
                throw new AppError('Formato de data de nascimento inválido.', 404);
            }
            dataToUpdate.dataNascimento = date;
        } else {
            delete dataToUpdate.dataNascimento;
        }

        return await prisma.user.update({
            where: { id },
            data: dataToUpdate,
            select: {
                id: true
            },
        })
    } catch (error: any) {
        if (error.code === 'P2025') {
            throw new AppError('Usuário não encontrado para atualização.', 404);
        }
        throw error;
    }

}

export const deleteUser = async (id: number, token?: string) => {
    try {
        const deletedUser = await prisma.user.delete({
            where: {
                id
            },
            select: {
                id: true
            }
        });
        if (token) {
            const decodedToken: any = jwt.decode(token);
            if (decodedToken && decodedToken.exp) {
                const expiresAt = new Date(decodedToken.exp * 1000);
                await blacklistToken(token, expiresAt);
            }
        }
        return deletedUser;
    } catch (error: any) {
        if (error.code === 'P2025') {
            throw new AppError('Usuário não encontrado para exclusão.', 404);
        }
        throw error
    }
}