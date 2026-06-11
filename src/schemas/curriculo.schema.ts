import z from "zod";

export const curriculoCreateSchema = z.object({
    objetivo: z.string().nullable(),
    experiencias: z.array(z.object({
        nomeEmpresa: z.string(),
        dataInicio: z.coerce.date(),
        dataFim: z.coerce.date().nullable(),
        status: z.enum(['ATIVO', 'INATIVO']),
    })).nullable(),
    cursos: z.array(z.object({
        nomeCurso: z.string(),
        tipo: z.enum(['BACHARELADO', 'TECNÓLOGO', 'LICENCIATURA', 'TÉCNICOS', 'CURSO_LIVRE', 'OUTROS']),
        instituicao: z.string(),
        dataInicio: z.coerce.date(),
        dataFim: z.coerce.date().nullable(),
        status: z.enum(['EM_ANDAMENTO', 'CONCLUIDO', 'INTERROMPIDO']),
    })).nullable(),
    habilidades: z.array(z.object({
        nome: z.string(),
    })).nullable(),
});

export const curriculoUpdateSchema = curriculoCreateSchema.partial();