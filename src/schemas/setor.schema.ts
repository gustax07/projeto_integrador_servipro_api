import z from "zod";

export const createSetorSchema = z.object({
    nome: z.string("o nome deve ser uma string").min(3, 'O nome é obrigatório')
});

export const updateSetorSchema = createSetorSchema;