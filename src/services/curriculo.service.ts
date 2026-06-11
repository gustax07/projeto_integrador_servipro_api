import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";

export const createCurriculo = async (data: any) => {
    try {
        const { experiencias, cursos, habilidades, ...curriculoData } = data;

        return await prisma.curriculo.create({
            data: {
                ...curriculoData,
                experiencias: experiencias?.length ? {
                    create: experiencias,
                } : undefined,
                cursos: cursos?.length ? {
                    create: cursos,
                } : undefined,
                habilidades: habilidades?.length ? {
                    create: habilidades.map((h: { nome: string }) => ({
                        habilidade: {
                            connectOrCreate: {
                                where: {
                                    nome: h.nome
                                },
                                create: { nome: h.nome }
                            }
                        },
                    })),
                } : undefined,
            },
            select: {
                id: true
            },
        })
    } catch (error: any) {
        if (error.code === 'P2002') {
            throw new Error('O usuário já possui um currículo cadastrado.');
        }
        console.error('Erro ao criar curriculo:', error)
        throw error
    }
}

export const getCurriculoById = async (id: number, userId: number) => {
    try {
        const curriculo = await prisma.curriculo.findFirst({
            where: {
                id,
                userId
            },
            omit: {
                userId: true,
            },
            include: {
                user: {
                    omit: {
                        senha: true,

                    }
                },
                experiencias: true,
                cursos: true,
                habilidades: {
                    omit: {
                        curriculoId: true,
                        habilidadeId: true
                    },
                    include: {
                        habilidade: true
                    }
                }
            }
        })
        if (!curriculo) {
            throw new Error('Curriculo não encontrado ou não pertence a este usuário.')
        }

        return curriculo
    } catch (error) {
        console.error('Erro ao buscar curriculo por ID:', error)
        throw error
    }
}

export const getAllCurriculos = async (page: number = 1, limit: number = 20) => {
    try {
        const skip = (page - 1) * limit;
        const curriculos = await prisma.curriculo.findMany({
            skip,
            take: limit,
            orderBy: {
                id: 'desc'
            },
            omit: {
                userId: true,
            },
            include: {
                user: {
                    omit: {
                        senha: true,

                    }
                },
                experiencias: true,
                cursos: true,
                habilidades: {
                    omit: {
                        curriculoId: true,
                        habilidadeId: true
                    },
                    include: {
                        habilidade: true
                    }
                }
            }
        })

        if (!curriculos) {
            throw new Error('Nenhum curriculo encontrado.')
        }

        return curriculos
    } catch (error) {
        console.error('Erro ao buscar todos curriculos:', error)
        throw error
    }
}

export const updateCurriculo = async (id: number, userId: number, data: any, 
    idExperencia?: number, idCurso?: number) => {
    try {
        const { experiencias, cursos, habilidades, ...curriculoData } = data;
        return await prisma.curriculo.update({
            where: {
                id,
                userId
            },
            data: {
                ...curriculoData,
                experiencias: experiencias?.length ? {
                    upsert: {
                        where: {
                            id: idExperencia ? idExperencia : -1
                        },
                        create: experiencias,
                        update: experiencias
                    }
                } : undefined,
                cursos: cursos?.length ? {
                    upsert: {
                        where: {
                            id: idCurso ? idCurso : -1
                        },
                        create: cursos,
                        update: cursos
                    }
                } : undefined,
                habilidades: habilidades?.length ? {
                    create: habilidades.map((h: { nome: string }) => ({
                        habilidade: {
                            connectOrCreateOrUpdate: {
                                where: {
                                    nome: h.nome
                                },
                                create: { nome: h.nome },
                                update: { nome: h.nome }
                            }
                        },
                    })),
                } : undefined,
            },
            select: {
                id: true
            },
        })

    } catch (error: any) {
        if (error.code === 'P2025') {
            throw new Error('Curriculo não encontrado para atualização.');
        }
        console.error('Erro ao atualizar curriculo:', error)
        throw error
    }
}

export const deleteCurriculo = async (id: number, userId: number) => {
    try {
        return await prisma.curriculo.delete({
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
            console.warn('Tentativa de deletar um curriculo que não existe:', id);
            return null;
        }

        console.error('Erro ao deletar curriculo:', error)
        throw error
    }
}