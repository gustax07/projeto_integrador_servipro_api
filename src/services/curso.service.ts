import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";

export const createCurso = async (data: Prisma.CursoCreateInput) => {
    try {
        const curso = await prisma.curso.create({
            data,
            select: {
                id: true
            }
        })

        if (!curso) {
            throw new Error('Já existe um curso com este nome.')
        }
        return curso
    } catch (error) {
        console.error('Erro ao criar curso:', error)
        throw error
    }
}

export const getCursoById = async (id: number, curriculoId: number) => {
    try {
        const curso = await prisma.curso.findFirst({
            where: {
                id,
                curriculoId
            },
            omit: {
                curriculoId: true,
            }
        })

        if (!curso) {
            throw new Error('Curso não encontrado ou não pertence a este usuário.')
        }

        return curso
    } catch (error) {
        console.error('Erro ao buscar curso por ID:', error)
        throw error
    }
}

export const getAllCursos = async (page: number = 1, limit: number = 20) => {
    try {
        const skip = (page - 1) * limit;
        const cursos = await prisma.curso.findMany({
            skip,
            take: limit,
            orderBy: {
                id: 'desc'
            },
            omit: {
                curriculoId: true,
            }
        })

        if (!cursos) {
            throw new Error('Nenhum curso encontrado.')
        }

        return cursos
    } catch (error) {
        console.error('Erro ao buscar todos cursos:', error)
        throw error
    }
}

export const updateCurso = async (id: number, curriculoId: number, data: Prisma.CursoUpdateInput) => {
    try {
        const curso = await prisma.curso.update({
            where: {
                id,
                curriculoId
            },
            data,
            select: {
                id: true
            },
        })
        if (!curso) {
            throw new Error('Já existe um curso com este nome.')
        }

        return curso
    } catch (error: any) {
        if (error.code === 'P2025') {
            throw new Error('Curso não encontrado para atualização.');
        }
        console.error('Erro ao atualizar curso:', error)
        throw error
    }
}

export const deleteCurso = async (id: number, curriculoId: number) => {
    try {
        return await prisma.curso.delete({
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
            console.warn('Tentativa de deletar um curso que não existe:', id);
            return null;
        }

        console.error('Erro ao deletar curso:', error)
        throw error
    }
}