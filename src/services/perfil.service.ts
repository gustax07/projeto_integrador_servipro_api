import { prisma } from "../lib/prisma";
import { Prisma } from "@prisma/client";

export const createPerfil = async (data: Prisma.PerfilCreateInput) => {
    try {
        return await prisma.perfil.create({
            data,
            select: {
                id: true
            }
        })
    } catch (error) {
        console.error('Erro ao criar perfil:', error)
        throw error
    }
}

export const getPerfilById = async (id: number, userId: number) => {
    try {
        const perfil = await prisma.perfil.findFirst({
            where: {
                id,
                userId
            },
            omit: {
                userId: true,
                setorId: true
            }
        })

        if (!perfil) {
            throw new Error('Perfil não encontrado ou não pertence a este usuário.')
        }

        return perfil
    } catch (error) {
        console.error('Erro ao buscar perfil por ID:', error)
        throw error
    }
}

export const getAllPerfis = async (page: number = 1, limit: number = 20) => {
    try {
        const skip = (page - 1) * limit;
        const perfis = await prisma.perfil.findMany({
            skip,
            take: limit,
            orderBy: {
                id: 'desc'
            },
            omit: {
                userId: true,
                setorId: true
            }
        })

        if (!perfis) {
            throw new Error('Nenhum perfil encontrado.')
        }

        return perfis
    } catch (error) {
        console.error('Erro ao buscar todos perfis:', error)
        throw error
    }
}

export const updatePerfil = async (id: number, userId: number, data: Prisma.PerfilUpdateInput) => {
    try {
        return await prisma.perfil.update({
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
            throw new Error('Perfil não encontrado para atualização.');
        }
        console.error('Erro ao atualizar perfil:', error)
        throw error
    }
}

export const deletePerfil = async (id: number, userId: number) => {
    try {
        return await prisma.perfil.delete({
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
            console.warn('Tentativa de deletar um perfil que não existe:', id);
            return null;
        }

        console.error('Erro ao deletar perfil:', error)
        throw error
    }
}