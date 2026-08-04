import { prisma } from '../lib/prisma'
import { Prisma } from '@prisma/client'
import { AppError } from '../utils/AppError';

interface CreateServicoInput extends Prisma.ServicoUncheckedCreateInput {
    imagens?: { url: string; tipo: string; principal?: boolean }[];
}

export const createServico = async (data: CreateServicoInput) => {
    const { imagens, ...servicoData } = data;
    try {
        return await prisma.servico.create({
            data: {
                ...servicoData,
                imagemServicos: imagens && imagens.length > 0 ? {
                    create: imagens.map(img => ({
                        url: img.url,
                        tipo: img.tipo,
                        principal: img.principal ?? false
                    }))
                } : undefined
            },
            select: {
                id: true
            }
        });
    } catch (error: any) {
        if (error.code === 'P2002') {
            throw new AppError('Serviço já cadastrado no sistema.', 400);
        }
        if (error.code === 'P2003') {
            throw new AppError('Setor ou usuário não encontrado.', 404);
        }

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
            select: {
                id: true,
                titulo: true,
                descricao: true,
                formato: true,
                salario: true,
                tipoSalario: true,
                dataPostagem: true,
                setor: {
                    select: {
                        id: true,
                        nome: true
                    }
                },
                imagemServicos: {
                    select: {
                        id: true,
                        url: true,
                        tipo: true,
                        principal: true
                    }
                },
                user: {
                    select: {
                        id: true,
                        nome: true,
                        icone: true
                    }
                }
            }
        })
        if (!servico) {
            throw new AppError('Serviço não encontrado ou não pertence a este usuário.', 404);
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
            select: {
                id: true,
                titulo: true,
                descricao: true,
                formato: true,
                salario: true,
                tipoSalario: true,
                dataPostagem: true,
                setor: {
                    select: {
                        id: true,
                        nome: true
                    }
                },
                imagemServicos: {
                    select: {
                        id: true,
                        url: true,
                        tipo: true,
                        principal: true
                    }
                },
                user: {
                    select: {
                        id: true,
                        nome: true,
                        icone: true
                    }
                }
            }
        })

        if (servicos.length === 0) {
            throw new AppError('Nenhum serviço encontrado.', 404);
        }

        return servicos;
    } catch (error) {
        console.error('Erro ao buscar todos serviços:', error)
        throw error
    }
}

export const updateServico = async (id: number, userId: number, data: Partial<Prisma.ServicoUpdateInput>) => {
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
        if (!servico) {
            throw new AppError('Já existe um serviço com este nome.', 400)
        }

        return servico;
    } catch (error: any) {
        if (error.code === 'P2025') {
            throw new AppError('Serviço não encontrado para atualização.', 404);
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
            throw new AppError('Serviço não encontrado para exclusão.', 404);
        }

        console.error('Erro ao deletar serviço:', error)
        throw error
    }
}