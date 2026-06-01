import {z} from 'zod';

export const createCandidaturaSchema = z.object({
    status: z.string("o status deve ser uma string"),
    servicoId: z.number("o servicoId deve ser um numero"),
    userId: z.number("o userId deve ser um numero"),
})