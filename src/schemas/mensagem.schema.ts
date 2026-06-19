import { z } from 'zod';

export const createMensagemSchema = z.object({
    conteudo: z.string().min(1, 'O conteúdo da mensagem é obrigatório.'),
    destinatarioId: z.number().min(1, 'O ID do destinatário é obrigatório.'),
})

export const updateMensagemSchema = z.object({
    conteudo: z.string().min(1, 'O conteúdo da mensagem é obrigatório.').optional(),
    lida: z.boolean().optional()
});