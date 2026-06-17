import { z } from 'zod';

export const createMensagemSchema = z.object({
    conteudo: z.string().min(1, 'O conteúdo da mensagem é obrigatório.'),
    destinarioId: z.number().min(1, 'O ID do destinatário é obrigatório.'),
})

export const updateMensagemSchema = z.object({
    conteudo: z.string().min(1, 'O conteúdo da mensagem é obrigatório.'),
    lida: z.boolean().optional(),
    editado: z.boolean().optional(),
});