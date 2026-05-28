import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";

export const createCurriculoHabilidade = async (data: Prisma.CurriculoHabilidadeCreateInput) => {
    try {
        return await prisma.curriculoHabilidade.create({
            data,
            select: {
                curriculoId: true
            }
        })
    } catch (error) {
        console.error('Erro ao criar curriculoHabilidade:', error)
        throw error
    }
}

export const getCurriculoHabilidadeById = async (habilidadeId: number, curriculoId: number) => {
    try {
        await prisma.curriculoHabilidade.findFirst({
            where: {
                curriculoId,
                habilidadeId
            },
            include: {
                habilidade: true,
                curriculo: true
            }
        })
    } catch (error: any) {
        if (error.code === 'P2025') {
            throw new Error('CurriculoHabilidade não encontrada.')
        }
        console.error('Erro ao buscar curriculoHabilidade por ID:', error)
        throw error
    }
}

export const getAllCurriculoHabilidades = async (page: number = 1, limit: number = 20) => {
    try {
        const skip = (page - 1) * limit;
        const curriculoHabilidades = await prisma.curriculoHabilidade.findMany({
            skip,
            take: limit,
            orderBy: {
                curriculoId: 'desc'
            },
            include: {
                habilidade: true,
                curriculo: true
            }
        })

        if (!curriculoHabilidades) {
            throw new Error('Nenhuma curriculoHabilidade encontrada.')
        }

        return curriculoHabilidades
    } catch (error) {
        console.error('Erro ao buscar todas curriculoHabilidades:', error)
        throw error
    }
}

export const updateCurriculoHabilidade = async (curriculoId: number, habilidadeId: number, data: Prisma.CurriculoHabilidadeUpdateInput) => {
    try {
        return await prisma.curriculoHabilidade.update({
            where: {
                curriculoId_habilidadeId: {
                    curriculoId,
                    habilidadeId
                }
            },
            data,
            select: {
                curriculoId: true
            }
        })
    } catch (error: any) {
        if (error.code === 'P2025') {
            throw new Error('CurriculoHabilidade não encontrada para atualização.');
        }
        console.error('Erro ao atualizar curriculoHabilidade:', error)
        throw error
    }
}

export const deleteCurriculoHabilidade = async (curriculoId: number, habilidadeId: number) => {
    try {
        return await prisma.curriculoHabilidade.delete({
            where: {
                curriculoId_habilidadeId: {
                    curriculoId,
                    habilidadeId
                }
            },
            select: {
                curriculoId: true
            }
        });
    } catch (error: any) {
        if (error.code === 'P2025') {
            console.warn('Tentativa de deletar uma curriculoHabilidade que não existe:', curriculoId);
            return null;
        }

        console.error('Erro ao deletar curriculoHabilidade:', error)
        throw error
    }
}