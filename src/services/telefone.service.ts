import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";

export const createTelefone = async (data: Prisma.TelefoneCreateInput) => {
    try {
        const telefone = await prisma.telefone.create({
            data,
            select: {
                id: true
            }
        })
    } catch (error: any) {
        if (error.code === 'P2002') {
            throw new Error('Telefone já cadastrado no sistema.');
        }
        console.error('Erro ao criar telefone:', error);
        throw error;
    }
}

export const getTelefoneById = async (userId: number, id: number) => {
    try {
        const telefone = await prisma.telefone.findFirst({
            where: {
                id,
                userId
            },
            omit: {
                userId: true,
            }
        });

        if (!telefone) {
            throw new Error('Telefone não encontrado ou não pertence a este usuário.');
        }

        return telefone;
    } catch (error) {
        console.error('Erro ao buscar telefone por ID:', error);
        throw error;
    }
}

export const getAllTelefones = async (page: number = 1, limit: number = 20) => {
    try {
        const skip = (page - 1) * limit;
        const telefones = await prisma.telefone.findMany({
            skip,
            take: limit,
            orderBy: {
                id: 'desc'
            },
            omit: {
                userId: true,
            }
        })

        if (!telefones) {
            throw new Error('Nenhum telefone encontrado.');
        }

        return telefones;
    } catch (error) {
        console.error('Erro ao buscar todos telefones:', error);
        throw error;
    }
}

export const updateTelefone = async (id: number, userId: number, data: Prisma.TelefoneUpdateInput) => {
    try {
        const telefone = await prisma.telefone.update({
            where: {
                id,
                userId
            },
            data,
            select: {
                id: true
            },
        })

        if (!telefone) {
            throw new Error('Já existe um usuario com este número.')
        }
    } catch (error: any) {
        if (error.code === 'P2025') {
            throw new Error('Telefone não encontrado para atualização.');
        }
        console.error('Erro ao atualizar telefone:', error);
        throw error;
    }
}

export const deleteTelefone = async (id: number, userId: number) => {
    try {
        return await prisma.telefone.delete({
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
            console.warn('Tentativa de deletar um telefone que não existe:', id);
            return null;
        }

        console.error('Erro ao deletar telefone:', error);
        throw error;
    }
}