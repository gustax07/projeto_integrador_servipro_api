import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";

export const createExperiencia = async (data: Prisma.ExperienciaCreateInput) => {
    try {
        return await prisma.experiencia.create({
            data,
            select: {
                id: true
            }
        })
    } catch (error) {
        console.error('Erro ao criar experiencia:', error)
        throw error
    }
}

export const getExperienciaById = async (id: number, curriculoId: number) => {
    try {
        const experiencia = await prisma.experiencia.findFirst({
            where: {
                id,
                curriculoId
            },
            omit: {
                curriculoId: true,
            }
        })

        if (!experiencia) {
            throw new Error('Experiencia não encontrada ou não pertence a este usuário.')
        }

        return experiencia
    } catch (error) {
        console.error('Erro ao buscar experiencia por ID:', error)
        throw error
    }
}

export const getAllExperiencias = async (page: number = 1, limit: number = 20) => {
    try {
        const skip = (page - 1) * limit;
        const experiencias = await prisma.experiencia.findMany({
            skip,
            take: limit,
            orderBy: {
                id: 'desc'
            },
            omit: {
                curriculoId: true,
            }
        })

        if (!experiencias) {
            throw new Error('Nenhuma experiencia encontrada.')
        }

        return experiencias
    } catch (error) {
        console.error('Erro ao buscar todas experiencias:', error)
        throw error
    }
}

export const updateExperiencia = async (id: number, curriculoId: number, data: Prisma.ExperienciaUpdateInput) => {
    try {
        return await prisma.experiencia.update({
            where: {
                id,
                curriculoId
            },
            data,
            select: {
                id: true
            },
        })
    } catch (error: any) {
        if (error.code === 'P2025') {
            throw new Error('Experiencia não encontrada para atualização.');
        }
        console.error('Erro ao atualizar experiencia:', error)
        throw error
    }
}

export const deleteExperiencia = async (id: number, curriculoId: number) => {
    try {
        return await prisma.experiencia.delete({
            where: {
                id,
                curriculoId
            },
            select: {
                id: true
            }
        });
    } catch (error: any) {
        if (error.code === 'P2025') {
            console.warn('Tentativa de deletar uma experiencia que não existe,', id);
            return null;
        }

        console.error('Erro ao deletar experiencia:', error)
        throw error
    }
}