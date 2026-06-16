import { z } from 'zod';

export const experienciaCreateSchema = z.object({
    nomeEmpresa: z.string().min(1, 'O nome da empresa é obrigatório'),
    dataInicio: z.coerce.date().min(1, 'A data de início é obrigatória'),
    dataFim: z.coerce.date().nullable().optional(),
    status: z.enum(['CONCLUIDO', 'ATUAL']),
    curriculoId: z.number().min(1, 'O ID do currículo é obrigatório'),
});

export const experienciaUpdateSchema = experienciaCreateSchema.partial();
