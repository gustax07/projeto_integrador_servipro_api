import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { AppError } from "../utils/AppError";

export const createCandidatura = async (data: Prisma.CandidaturaCreateInput) => {
    try {
        return await prisma.candidatura.create({
            data,
            select: {
                id: true
            }
        })
    } catch (error:any) {
        if (error.code === 'P2002') {
            throw new AppError('Candidatura já cadastrada no sistema.');
        }
        if (error.code === 'P2003') {
            throw new AppError('Serviço ou usuário não encontrado.');
        }
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
            throw new AppError('Candidatura não encontrada ou não pertence a este usuário.')
        }

        return candidatura
    } catch (error) {
        console.error('Erro ao buscar candidatura por ID:', error)
        throw error
    }
}

export const getAllCandidaturas = async (userId: number, page: number = 1, limit: number = 20) => {
    try {
        const skip = (page - 1) * limit;
        const candidaturas = await prisma.candidatura.findMany({
            where: {
                userId
            },
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

        if (candidaturas.length === 0) {
            throw new AppError('Nenhuma candidatura encontrada.')
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
            throw new AppError('Candidatura não encontrada para atualização.');
        }
        if (error.code === 'P2003') {
            throw new AppError('Serviço ou usuário não encontrado.');
        }
        if (error.code === 'P2002') {
            throw new AppError('Candidatura já cadastrada no sistema.');
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
            throw new AppError('Candidatura não encontrada para exclusão.');
        }

        console.error('Erro ao deletar candidatura:', error)
        throw error
    }
}