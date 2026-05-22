import z from "zod";

export const createUserSchema = z.object({
    nome: z.string().min(3, 'O nome é obrigatório'),
    email: z.string().email('Digite um formato de e-mail válido'),
    senha: z.string().min(6, 'A senha precisa ter no mínimo 6 caracteres'),
})