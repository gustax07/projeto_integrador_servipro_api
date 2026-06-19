import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { AppError } from "../utils/AppError";

export const createCurso = async (data: Prisma.CursoCreateInput) => {
    try {
        const curso = await prisma.curso.create({
            data,
            select: {
                id: true
            }
        })

        if (!curso) {
            throw new AppError('Já existe um curso com este nome.', 404)
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
            throw new AppError('Curso não encontrado ou não pertence a este usuário.', 404)
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

        if (cursos.length === 0) {
            throw new AppError('Nenhum curso encontrado.', 404)
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
            throw new AppError('Já existe um curso com este nome.', 404)
        }

        return curso
    } catch (error: any) {
        if (error.code === 'P2025') {
            throw new AppError('Curso não encontrado para atualização.', 404);
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
            throw new AppError('Curso não encontrado para deletar.', 404);
        }
        console.error('Erro ao deletar curso:', error)
        throw error
    }
}