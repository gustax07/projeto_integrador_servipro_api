import z from "zod";

export const HabilidadeCreateSchema = z.object({
    nome: z.string("O nome da habilidade deve ser uma string")
        .min(1, "O nome da habilidade é obrigatório."),
});

export const HabilidadeUpdateSchema = HabilidadeCreateSchema