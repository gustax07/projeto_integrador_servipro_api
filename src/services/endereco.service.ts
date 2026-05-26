import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";

export const createEndereco = async (data: Prisma.EnderecoCreateInput) => {
    try {
        return await prisma.endereco.create({
            data
        })
    } catch (error) {
        console.error('Erro ao criar endereço:', error);
        throw error;
    }
}

export const getEnderecoById = async (userId: number, id: number) => {
    try {
        const endereco = await prisma.endereco.findFirst({
            where: {
                id,
                userId
            },
        });
        if (!endereco) {
            throw new Error('Endereço não encontrado ou não pertence a este usuário.');
        }

        return endereco;

    } catch (error) {
        console.error('Erro ao buscar endereço:', error);
        throw error;
    }
}