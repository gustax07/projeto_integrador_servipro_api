import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { tr } from "zod/locales";

export const createCurriculo = async (data: Prisma.CurriculoCreateInput) => {
    try {
        return await prisma.curriculo.create({
            data,
            select: {
                id: true
            }
        })
    } catch (error) {
        console.error('Erro ao criar curriculo:', error)
        throw error
    }
}

export const getCurriculoById = async (id: number, userId: number) => {
    try {
        const curriculo = await prisma.curriculo.findFirst({
            where: {
                id,
                userId
            },
            include: {
                user: true,
                experiencias: true,
                cursos: true,
                habilidades: true
            }
        })
        if (!curriculo) {
            throw new Error('Curriculo não encontrado ou não pertence a este usuário.')
        }

        return curriculo
    } catch (error) {
        console.error('Erro ao buscar curriculo por ID:', error)
        throw error
    }
}

export const getAllCurriculos = async (page: number = 1, limit: number = 20) => {
    try {
        const skip = (page - 1) * limit;
        const curriculos = await prisma.curriculo.findMany({
            skip,
            take: limit,
            orderBy: {
                id: 'desc'
            },
        })

        if (!curriculos) {
            throw new Error('Nenhum curriculo encontrado.')
        }

        return curriculos
    } catch (error) {
        console.error('Erro ao buscar todos curriculos:', error)
        throw error
    }
}

export const updateCurriculo = async (id: number, userId: number, data: Prisma.CurriculoUpdateInput) => {
    try {
        return await prisma.curriculo.update({
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
            throw new Error('Curriculo não encontrado para atualização.');
        }
        console.error('Erro ao atualizar curriculo:', error)
        throw error
    }
}

export const deleteCurriculo = async (id: number, userId: number) => {
    try {
        return await prisma.curriculo.delete({
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
            console.warn('Tentativa de deletar um curriculo que não existe:', id);
            return null;
        }

        console.error('Erro ao deletar curriculo:', error)
        throw error
    }
}