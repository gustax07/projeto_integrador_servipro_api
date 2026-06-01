import { prisma } from '../lib/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Prisma } from '@prisma/client';
import { blacklistToken } from './token.service';

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
            throw new Error('E-mail ou documento já cadastrado na plataforma.');
        }
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
            omit: {
                senha: true,
            }
        })

        if (!user) {
            throw new Error('Usuário não encontrado.')
        }
        return user;
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
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
                documento: true
            }
        })

        if (!user) {
            throw new Error('Nenhum usuário encontrado.')
        }
        return user;
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        throw error;
    }
}

export const updateUser = async (id: number, data: Prisma.UserUpdateInput) => {
    try {
        const dataToUpdate: Prisma.UserUpdateInput = { ...data };

        // Verifica se a senha foi fornecida antes de fazer o hash
        if (data.senha && typeof data.senha === 'string' && data.senha.trim() !== '') {
            dataToUpdate.senha = await bcrypt.hash(data.senha, 10);
        } else {
            delete dataToUpdate.senha;
        }

        // Verifica se a data de nascimento foi fornecida e é válida antes de converter
        if (data.dataNascimento) {
            const date = new Date(String(data.dataNascimento));
            if (isNaN(date.getTime())) {
                throw new Error('Formato de data de nascimento inválido.');
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
            throw new Error('Usuário não encontrado para atualização.');
        }
        if (error.message === 'Formato de data de nascimento inválido.') {
            throw error; 
        }
        console.error('Erro ao atualizar usuário:', error);
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
                console.log('Token blacklisted:', token);
            }
        }
        return deletedUser;
    } catch (error: any) {
        if (error.code === 'P2025') {
            console.warn('Tentativa de deletar um usuário que não existe:', id);
            return null;
        }

        console.error('Erro ao deletar usuário:', error);
        throw error;
    }
}