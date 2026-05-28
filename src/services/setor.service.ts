import { prisma } from '../lib/prisma'
import { Prisma } from '@prisma/client'

export const createSetor = async (data: Prisma.SetorCreateInput) => {
    try {
        const setor = await prisma.setor.create({
            data,
            select: {
                id: true
            }
        })

        if (!setor) {
            throw new Error('Já existe um setor com este nome.')
        }

        return setor;
    } catch (error) {
        console.error('Erro ao criar setor:', error)
        throw error
    }
}

export const getSetorById = async (id: number) => {
    try {
        const setor = await prisma.setor.findUnique({
            where: {
                id
            }
        })

        if (!setor) {
            throw new Error('Setor não encontrado.')
        }

        return setor;
    } catch (error) {
        console.error('Erro ao buscar setor por ID:', error)
        throw error
    }
}

export const getAllSetores = async (page: number = 1, limit: number = 20) => {
    try {
        const skip = (page - 1) * limit;
        const setores = await prisma.setor.findMany({
            skip,
            take: limit,
            orderBy: {
                id: 'desc'
            }
        })

        if (!setores) {
            throw new Error('Nenhum setor encontrado.')
        }

        return setores;
    } catch (error) {
        console.error('Erro ao buscar todos setores:', error)
        throw error
    }
}

export const updateSetor = async (id: number, data: Prisma.SetorUpdateInput) => {
    try {
        return await prisma.setor.update({
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
            throw new Error('Setor não encontrado para atualização.');
        }
        console.error('Erro ao atualizar setor:', error)
        throw error
    }
}

export const deleteSetor = async (id: number) => {
    try {
        return await prisma.setor.delete({
            where: {
                id
            },
            select: {
                id: true
            }
        });
    } catch (error: any) {
        if (error.code === 'P2025') {
            console.warn('Tentativa de deletar um setor que não existe:', id);
            return null;
        }

        console.error('Erro ao deletar setor:', error)
        throw error
    }
}