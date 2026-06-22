import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { AppError } from "../utils/AppError";

export const createTelefone = async (data: Prisma.TelefoneUncheckedCreateInput, userId: number) => {
    try {
        return await prisma.telefone.create({
            data: {
                ...data,
                userId
            },
            select: {
                id: true
            }
        })
    } catch (error: any) {
        if (error.code === 'P2002') {
            throw new AppError('Telefone já cadastrado no sistema.', 409);
        }
        if (error.code === 'P2025') {
            throw new AppError('Usuário não encontrado.', 404);
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
            throw new AppError('Telefone não encontrado ou não pertence a este usuário.', 404);
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
            },
 
        })

        if (telefones.length === 0) {
            throw new AppError('Nenhum telefone encontrado.', 404);
        }

        return telefones;
    } catch (error) {
        console.error('Erro ao buscar todos telefones:', error);
        throw error;
    }
}

export const updateTelefone = async (id: number, userId: number, data: Prisma.TelefoneUpdateInput) => {
    try {
        return await prisma.telefone.update({
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
            throw new AppError('Telefone não encontrado para atualização.', 404);
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
            throw new AppError('Telefone não encontrado para deleção.', 404);
        }
        console.error('Erro ao deletar telefone:', error);
        throw error;
    }
}