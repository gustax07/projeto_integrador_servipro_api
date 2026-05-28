import { prisma } from '../lib/prisma'
import { Prisma } from '@prisma/client'

export const createServico = async (data: Prisma.ServicoCreateInput) => {
    try {
        const servico = await prisma.servico.create({
            data,
            select: {
                id: true
            }
        })

        if (!servico) {
            throw new Error('Já existe um serviço com este nome.')
        }

        return servico;
    } catch (error) {
        console.error('Erro ao criar serviço:', error)
        throw error
    }
}

export const getServicoById = async (id: number, userId: number) => {
    try {
        const servico = await prisma.servico.findFirst({
            where: {
                id,
                userId
            },
            omit: {
                userId: true,
                setorId: true
            }
        })
        if (!servico) {
            throw new Error('Serviço não encontrado ou não pertence a este usuário.')
        }

        return servico;
    } catch (error) {
        console.error('Erro ao buscar serviço por ID:', error)
        throw error
    }
}

export const getAllServicos = async (page: number = 1, limit: number = 20) => {
    try {
        const skip = (page - 1) * limit;
        const servicos = await prisma.servico.findMany({
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

        if (!servicos) {
            throw new Error('Nenhum serviço encontrado.')
        }

        return servicos;
    } catch (error) {
        console.error('Erro ao buscar todos serviços:', error)
        throw error
    }
}

export const updateServico = async (id: number, userId: number, data: Prisma.ServicoUpdateInput) => {
    try {
        const servico = await prisma.servico.update({
            where: {
                id,
                userId
            },
            data,
            select: {
                id: true
            },
        })
            if (!servico){
                throw new Error('Já existe um serviço com este nome.')
            }

            return servico;
    } catch (error: any) {
        if (error.code === 'P2025') {
            throw new Error('Serviço não encontrado para atualização.');
        }
        console.error('Erro ao atualizar serviço:', error)
        throw error
    }
}

export const deleteServico = async (id: number, userId: number) => {
    try {
        return await prisma.servico.delete({
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
            console.warn('Tentativa de deletar um serviço que não existe:', id);
            return null;
        }

        console.error('Erro ao deletar serviço:', error)
        throw error
    }
}