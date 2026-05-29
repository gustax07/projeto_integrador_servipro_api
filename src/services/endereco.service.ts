import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";

export const createEndereco = async (data: Prisma.EnderecoCreateInput) => {
    try {
        return await prisma.endereco.create({
            data
        })
    } catch (error) {
        console.error('Erro ao criar endereço:', error);
        throw error;
    }
}

export const getEnderecoById = async (id: number, userId: number) => {
    try {
        const endereco = await prisma.endereco.findFirst({
            where: {
                id,
                userId
            },
            omit: {
                userId: true,
                latitude: true,
                longitude: true,
            }
        });
        if (!endereco) {
            throw new Error('Endereço não encontrado ou não pertence a este usuário.');
        }

        return endereco;

    } catch (error) {
        console.error('Erro ao buscar endereço por ID:', error);
        throw error;
    }
}

export const getAllEnderecos = async (page: number = 1, limit: number = 20) => {
    try {
        const skip = (page - 1) * limit;
        return await prisma.endereco.findMany({
            skip,
            take: limit,
            orderBy: {
                id: 'desc'
            },
            omit: {
                userId: true,
                latitude: true,
                longitude: true,
            }
        })
    } catch (error) {
        console.error('Erro ao buscar todos endereços:', error);
        throw error;
    }
}

export const updateEndereco = async (id: number, userId: number, data: Prisma.EnderecoUpdateInput) => {
    try {
        return await prisma.endereco.update({
            where: {
                id,
                userId
            },
            data,
            select: {
                id: true
            },
        })
    } catch (error: any) {
        if (error.code === 'P2025') {
            throw new Error('Endereço não encontrado para atualização.');
        }
        console.error('Erro ao atualizar endereço:', error);
        throw error;
    }
}

export const deleteEndereco = async (id: number, userId: number) => {
    try {
        return await prisma.endereco.delete({
            where: {
                id,
                userId
            },
            select: {
                id: true
            }
        });
    } catch (error: any) {
        if (error.code === 'P2025') {
            console.warn('Tentativa de deletar um endereço que não existe:', id);
            return null;
        }

        console.error('Erro ao deletar endereço:', error);
        throw error;
    }
}