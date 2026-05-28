import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";

export const createMensagem = async (data: Prisma.MensagemCreateInput) => {
    try {
        return await prisma.mensagem.create({
            data,
            select: {
                id: true
            }
        })
    } catch (error) {
        console.error('Erro ao criar mensagem:', error)
        throw error
    }
}

export const getMensagemById = async (id: number, remetenteId: number, destinatarioId: number) => {
    try {
        const mensagem = await prisma.mensagem.findFirst({
            where: {
                id,
                remetenteId,
                destinatarioId
            },
        })

        if (!mensagem) {
            throw new Error('Mensagem não encontrada ou não pertence a este usuário.')
        }

        return mensagem
    } catch (error) {
        console.error('Erro ao buscar mensagem por ID:', error)
        throw error
    }
}

export const getAllMensagens = async (page: number = 1, limit: number = 20) => {
    try {
        const skip = (page - 1) * limit;
        const mensagens = await prisma.mensagem.findMany({
            skip,
            take: limit,
            orderBy: {
                id: 'desc'
            },
        })

        if (!mensagens) {
            throw new Error('Nenhuma mensagem encontrada.')
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
            data,
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
            console.warn('Tentativa de deletar uma mensagem que não existe:', id);
            return null;
        }

        console.error('Erro ao deletar mensagem:', error)
        throw error
    }


}