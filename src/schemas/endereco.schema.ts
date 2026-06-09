import z from "zod";

export const createEnderecoSchema = z.object({
    logradouro: z.string("o logradouro deve ser uma string").min(3, 'O logradouro é obrigatório'),
    numero: z.coerce.number("o numero deve ser um numero").min(1, 'O numero é obrigatório'),
    bairro: z.string("o bairro deve ser uma string").min(3, 'O bairro é obrigatório'),
    cep: z.string("o cep deve ser uma string").min(8, 'O cep é obrigatório'),
    complemento: z.string("o complemento deve ser uma string").optional(),
    principal: z.boolean("o principal deve ser um boolean").optional(),
    cidade: z.string("a cidade deve ser uma string").min(3, 'A cidade é obrigatório'),
    estado: z.string("o estado deve ser uma string").min(2, 'O estado é obrigatório'),
    latitude: z.float32("a latitude deve ser um numero").optional(),
    longitude: z.float32("a longitude deve ser um numero").optional(),
    userId: z.number("o userId deve ser um numero").min(1, 'O userId é obrigatório')
})

export const updateEnderecoSchema = createEnderecoSchema.partial();