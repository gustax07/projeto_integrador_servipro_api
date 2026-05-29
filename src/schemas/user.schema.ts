import z from "zod";

export const createUserSchema = z.object({
    nome: z.string().min(3, 'O nome é obrigatório'),
    email: z.string().email('Digite um formato de e-mail válido'),
    senha: z.string().min(6, 'A senha precisa ter no mínimo 6 caracteres'),
    dataNascimento: z.coerce.date('Digite uma data válida'),
    documento: z.string().min(11, 'Digite um documento válido acima de 11 caracteres')
    .max(14, 'Digite um documento válido abaixo de 14 caracteres'),

})