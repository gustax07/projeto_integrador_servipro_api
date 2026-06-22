import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { AppError } from "../utils/AppError";

export const createHabilidade = async (data: Prisma.HabilidadeCreateInput) => {
    try {
        return await prisma.habilidade.create({
            data,
            select: {
                id: true
            }
        })
    } catch (error: any) {
        console.error('Erro ao criar habilidade:', error)
        if (error.code === 'P2002') {
            throw new AppError('Habilidade já cadastrada no sistema.', 400);
        }
        throw error
    }
}

export const getHabilidadeById = async (id: number) => {
    try {
        return await prisma.habilidade.findFirst({
            where: {
                id,
            },
        })
    } catch (error: any) {
        if (error.code === 'P2025') {
            throw new AppError('Habilidade não encontrada.', 404)
        }
        console.error('Erro ao buscar habilidade por ID:', error)
        throw error
    }
}

export const getAllHabilidades = async (page: number = 1, limit: number = 20) => {
    try {
        const skip = (page - 1) * limit;
        return await prisma.habilidade.findMany({
            skip,
            take: limit,
            orderBy: {
                id: 'desc'
            },
        })

    } catch (error: any) {
        console.error('Erro ao buscar todas habilidades:', error)
        if (error.code === 'P2025') {
            throw new AppError('Nenhuma habilidade encontrada.', 404)
        }
        throw error
    }
}

export const updateHabilidade = async (id: number, data: Prisma.HabilidadeUpdateInput) => {
    try {
        return await prisma.habilidade.update({
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
            throw new AppError('Habilidade não encontrada para atualização.', 404);
        }
        if (error.code === 'P2002') {
            throw new AppError('Já existe uma habilidade com este nome.', 400);
        }
        console.error('Erro ao atualizar habilidade:', error)
        throw error
    }
}

export const deleteHabilidade = async (id: number) => {
    try {
        return await prisma.habilidade.delete({
            where: {
                id
            },
            select: {
                id: true
            }
        });
    } catch (error: any) {
        if (error.code === 'P2025') {
            throw new AppError('Habilidade não encontrada para exclusão.', 404);
        }
        console.error('Erro ao deletar habilidade:', error)
        throw error
    }

}