import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";

export const createEndereco = async (data: Prisma.EnderecoCreateInput) => {
    try {
        return await prisma.endereco.create({
            data,
            select: {
                id: true
            }
        })
    } catch (error) {
        console.error('Erro ao criar endereço:', error);
        throw error;
    }
}

export const getEnderecoById = async (id: number, userId: number) => {
    try {
        const endereco = await prisma.endereco.findFirst({
            where: {
                id,
                userId
            },
            omit: {
                userId: true,
                latitude: true,
                longitude: true,
            }
        });
        if (!endereco) {
            throw new Error('Endereço não encontrado ou não pertence a este usuário.');
        }

        return endereco;

    } catch (error) {
        console.error('Erro ao buscar endereço por ID:', error);
        throw error;
    }
}

export const getAllEnderecos = async (page: number = 1, limit: number = 20, userId: number) => {
    try {
        const skip = (page - 1) * limit;
        const endereco = await prisma.endereco.findMany({
            where: {
                userId
            },
            skip,
            take: limit,
            orderBy: {
                id: 'desc'
            },
            omit: {
                userId: true,
                latitude: true,
                longitude: true,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        nome: true
                    }
                }
            }
        })

        if (endereco.length === 0) {
            throw new Error('Nenhum endereço encontrado para este usuário.');
        }

        return endereco;
    } catch (error) {
        console.error('Erro ao buscar todos endereços:', error);
        throw error;
    }
}

export const updateEndereco = async (id: number, userId: number, data: Prisma.EnderecoUpdateInput) => {
    try {
        return await prisma.endereco.update({
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
            throw new Error('Endereço ou usuário não encontrado.');
        }
        console.error('Erro ao atualizar endereço:', error);
        throw error;
    }
}

export const deleteEndereco = async (id: number, userId: number) => {
    try {
        return await prisma.endereco.delete({
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
            throw new Error('Endereço ou usuário não encontrado.');
        }

        console.error('Erro ao deletar endereço:', error);
        throw error;
    }
}