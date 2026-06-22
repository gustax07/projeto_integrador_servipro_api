import z from "zod";

export const createTelefoneSchema = z.object({
    numero: z.number().min(8, 'Deve ter pelo menos 8 caracteres'),
    ddd: z.number().min(2, 'Deve ter pelo menos 2 caracteres')
});

export type CreateTelefoneInput = z.infer<typeof createTelefoneSchema>;

export const updateTelefoneSchema = z.object({
    numero: z.number().min(8, 'Deve ter pelo menos 8 caracteres'),
    ddd: z.number().min(2, 'Deve ter pelo menos 2 caracteres')
});

export type UpdateTelefoneInput = z.infer<typeof updateTelefoneSchema>;

