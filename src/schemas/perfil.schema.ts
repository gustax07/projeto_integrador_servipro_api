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
    descricao: z.string().optional(),
    status: z.string().optional(),
    avaliacoes: z.number().optional(),
    verificado: z.boolean().optional(),
    exibirPerfil: z.boolean().optional(),
    nomeSocial: z.string().optional(),
    viajar: z.boolean().optional(),
    disponibilidade: z.enum(['manhã', 'tarde', 'noite', 'todos os períodos']).optional(),
    tipoServico: z.enum(['Estágio', 'CLT', 'PJ', 'Freelancer', 'Autonomo', 'Temporario', 'Outros']).optional(),
    isPrestador: z.boolean().optional(),
    isContratante: z.boolean().optional(),
    setorId: z.number().optional()
})