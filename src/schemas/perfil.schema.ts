import z from "zod";

export const createPerfilSchema = z.object({
    descricao: z.string().optional(),
    nomeSocial: z.string().optional(),
    viajar: z.boolean(),
    exibirPerfil: z.boolean(),
    disponibilidade: z.enum(['manhã', 'tarde', 'noite', 'todos os períodos']),
    tipoServico: z.enum(['Estágio', 'CLT', 'PJ', 'Freelancer', 'Autonomo', 'Temporario', 'Jovem Aprendiz', 'Outros']),
    isPrestador: z.boolean(),
    isContratante: z.boolean(),
    setorId: z.number()
});

export const updatePerfilSchema = z.object({
    descricao: z.string(),
    status: z.string(),
    avaliacoes: z.number(),
    verificado: z.boolean(),
    exibirPerfil: z.boolean(),
    nomeSocial: z.string(),
    viajar: z.boolean(),
    disponibilidade: z.enum(['manhã', 'tarde', 'noite', 'todos os períodos']),
    tipoServico: z.enum(['Estágio', 'CLT', 'PJ', 'Freelancer', 'Autonomo', 'Temporario', 'Outros']),
    isPrestador: z.boolean(),
    isContratante: z.boolean(),
    setorId: z.number()
}).optional()