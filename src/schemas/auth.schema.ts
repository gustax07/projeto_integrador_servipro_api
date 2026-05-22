import { z } from 'zod';

export const loginContaSchema = z.object({
    email: z.string()
        .min(1, "O e-mail é obrigatório")
        .email("Digite um formato de e-mail válido"),
    senha: z.string()
        .min(6, "A senha precisa ter no mínimo 6 caracteres")
});