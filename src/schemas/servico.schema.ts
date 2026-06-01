import z from "zod";

export const createServicoSchema = z.object({
    titulo: z.string("o titulo deve ser uma string"),
    dataPostagem: z.coerce.date("a dataPostagem deve ser uma data"),
    formato: z.string("o formato deve ser uma string"),
    descricao: z.string("a descricao deve ser uma string"),
    requisitos: z.string("os requisitos devem ser uma string"),
    salario: z.number("o salario deve ser um numero"),
    tipoSalario: z.string("o tipoSalario deve ser uma string"),
    userId: z.number("o userId deve ser um numero"),
    setorId: z.number("o setorId deve ser um numero"),
})