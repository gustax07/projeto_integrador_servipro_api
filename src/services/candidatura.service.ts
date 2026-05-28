import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";

export const createCandidatura = async (data: Prisma.CandidaturaCreateInput) => {
    try {
        return await prisma.candidatura.create({
            data,
            select: {
                id: true
            }
        })
    } catch (error) {
        console.error('Erro ao criar candidatura:', error)
        throw error
    }
}

export const getCandidaturaById = async (id: number, userId: number) => {
    try {
        const candidatura = await prisma.candidatura.findFirst({
            where: {
                id,
                userId
            },
            omit: {
                userId: true,
            },
            include: {
                servico: true,
            }
        })

        if (!candidatura) {
            throw new Error('Candidatura não encontrada ou não pertence a este usuário.')
        }

        return candidatura
    } catch (error) {
        console.error('Erro ao buscar candidatura por ID:', error)
        throw error
    }
}

export const getAllCandidaturas = async (page: number = 1, limit: number = 20) => {
    try {
        const skip = (page - 1) * limit;
        const candidaturas = await prisma.candidatura.findMany({
            skip,
            take: limit,
            orderBy: {
                id: 'desc'
            },
            omit: {
                userId: true
            },
            include: {
                servico: true,
            }
        })

        if (!candidaturas) {
            throw new Error('Nenhuma candidatura encontrada.')
        }

        return candidaturas
    } catch (error) {
        console.error('Erro ao buscar todas candidaturas:', error)
        throw error
    }
}

export const updateCandidatura = async (id: number, userId: number, data: Prisma.CandidaturaUpdateInput) => {
    try {
        await prisma.candidatura.update({
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
            throw new Error('Candidatura não encontrada para atualização.');
        }
        console.error('Erro ao atualizar candidatura:', error)
        throw error
    }
}

export const deleteCandidatura = async (id: number, userId: number) => {
    try {
        return await prisma.candidatura.delete({
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
            console.warn('Tentativa de deletar uma candidatura que não existe:', id);
            return null;
        }

        console.error('Erro ao deletar candidatura:', error)
        throw error
    }
}