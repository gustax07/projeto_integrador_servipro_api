import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";

export const createHabilidade = async (data: Prisma.HabilidadeCreateInput) => {
    try {
        const habilidade = await prisma.habilidade.create({
            data,
            select: {
                id: true
            }
        })
        if (!habilidade) {
            throw new Error('Já existe uma habilidade com este nome.')
        }

        return habilidade
    } catch (error) {
        console.error('Erro ao criar habilidade:', error)
        throw error
    }
}

export const getHabilidadeById = async (id: number) => {
    try {
        await prisma.habilidade.findFirst({
            where: {
                id,
            },
        })
    } catch (error: any) {
        if (error.code === 'P2025') {
            throw new Error('Habilidade não encontrada.')
        }
        console.error('Erro ao buscar habilidade por ID:', error)
        throw error
    }
}

export const getAllHabilidades = async (page: number = 1, limit: number = 20) => {
    try {
        const skip = (page - 1) * limit;
        const habilidades = await prisma.habilidade.findMany({
            skip,
            take: limit,
            orderBy: {
                id: 'desc'
            },
        })

        if (!habilidades) {
            throw new Error('Nenhuma habilidade encontrada.')
        }

        return habilidades
    } catch (error) {
        console.error('Erro ao buscar todas habilidades:', error)
        throw error
    }
}

export const updateHabilidade = async (id: number, data: Prisma.HabilidadeUpdateInput) => {
    try {
        const habilidade = await prisma.habilidade.update({
            where: {
                id
            },
            data,
            select: {
                id: true
            },
        })

        if (!habilidade) {
            throw new Error("Já existe uma habilidade com este nome.")
        }

        return habilidade
    } catch (error: any) {
        if (error.code === 'P2025') {
            throw new Error('Habilidade não encontrada para atualização.');
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
            console.warn('Tentativa de deletar uma habilidade que não existe:', id);
            return null;
        }
        console.error('Erro ao deletar habilidade:', error)
        throw error
    }

}