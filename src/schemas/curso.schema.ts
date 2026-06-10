
import z from "zod";

export const cursoCreateSchema = z.object({
    tipo: z.string().min(1, "O tipo do curso é obrigatório." ),
    nomeCurso: z.string().min(1, "O nome do curso é obrigatório." ),
    instituicao: z.string().min(1, "A instituição do curso é obrigatória." ),
    dataInicio: z.coerce.date().min(1, "A data de início do curso é obrigatória." ),
    dataFim: z.coerce.date().min(1, "A data de fim do curso é obrigatória." ),
    curriculoId: z.number("O ID do currículo deve ser um número." ),
    status: z.enum(["Em andamento", "Concluído", "Interrompido"])
});

export const cursoUpdateSchema = cursoCreateSchema.partial();