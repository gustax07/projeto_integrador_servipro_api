import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { AppError } from "../utils/AppError";

export const createMensagem = async (data: Prisma.MensagemUncheckedCreateInput, remetenteId: number) => {
    try {
        return await prisma.mensagem.create({
            data: {
                ...data,
                remetenteId
            },
            select: {
                id: true
            }
        })
    } catch (error: any) {
        console.error('Erro ao criar mensagem:', error)
        if (error.code == 'P2003') {
            throw new AppError("Destinatario não encontrado")
        }
        throw error
    }
}

export const getMensagemById = async (id: number, remetenteId: number, destinatarioId: number) => {
    try {
        const mensagens = await prisma.mensagem.findMany({
            where: {
                id,
                remetenteId,
                destinatarioId,
            },
            select: {
                id: true,
                conteudo: true,
                remetenteId: true,
                destinatarioId: true,
                remetente: {
                    select: {
                        nome: true,
                        id: true
                    }
                },
                destinatario: {
                    select: {
                        nome: true,
                        id: true
                    }
                }
            }
        })

        if (!mensagens) {
            throw new AppError('Mensagem não encontrada ou não pertence a este usuário.', 404)
        }

        return mensagens
    } catch (error) {
        console.error('Erro ao buscar mensagem por ID:', error)
        throw error
    }
}

export const getAllMensagens = async (page: number = 1, limit: number = 20, remetenteId: number) => {
    try {
        const skip = (page - 1) * limit;
        const mensagens = await prisma.mensagem.findMany({
            where: {
                remetenteId,
            },
            skip,
            take: limit,
            orderBy: {
                criadoEm: 'desc'
            },
            select: {
                id: true,
                conteudo: true,
                lida: true,
                editado: true,
                remetente: {
                    select: {
                        nome: true,
                        id: true
                    }
                },
                destinatario: {
                    select: {
                        nome: true,
                        id: true
                    }
                }
            }
        })

        if (mensagens.length === 0) {
            throw new AppError('Nenhuma mensagem encontrada.', 404)
        }

        return mensagens
    } catch (error) {
        console.error('Erro ao buscar todas mensagens:', error)
        throw error
    }
}

export const updateMensagem = async (id: number, remetenteId: number, destinatarioId: number, data: Prisma.MensagemUpdateInput) => {
    try {
        return await prisma.mensagem.update({
            where: {
                id,
                remetenteId,
                destinatarioId
            },
            data: {
                ...data,
                editado: true
            },
            select: {
                id: true
            },
        })
    } catch (error: any) {
        if (error.code === 'P2025') {
            throw new Error('Mensagem não encontrada para atualização.');
        }
        console.error('Erro ao atualizar mensagemm:', error)
        throw error
    }
}

export const deleteMensagem = async (id: number, remetenteId: number, destinatarioId: number) => {
    try {
        return await prisma.mensagem.delete({
            where: {
                id,
                remetenteId,
                destinatarioId
            },
            select: {
                id: true
            }
        });
    } catch (error: any) {
        if (error.code === 'P2025') {
            throw new AppError('Mensagem não encontrada para deletar.', 404);
        }

        console.error('Erro ao deletar mensagem:', error)
        throw error
    }


}