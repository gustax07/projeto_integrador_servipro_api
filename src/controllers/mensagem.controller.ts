import { Response } from "express";
import * as mensagemService from '../services/mensagem.service';
import { AuthRequest } from "../middleware/auth.middleware";

export const createMensagem = async (req: AuthRequest, res: Response) => {
    if (!req.userId) {
        return res.status(401).json({ error: "Usuário não autenticado" });
    }
    await mensagemService.createMensagem(req.body, req.userId);
    return res.status(201).json({ 'status': 'success', 'message': 'mensagem criada com sucesso!' });
}

export const getMensagemById = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const remetenteId = req.userId;
    const { destinatarioId } = req.query;
    if (!remetenteId) {
        return res.status(401).json({ error: "Usuário não autenticado" });
    }

    const mensagem = await mensagemService.getMensagemById(Number(id), Number(remetenteId), Number(destinatarioId));
    return res.status(200).json({ mensagem });
}

export const getAllMensagens = async (req: AuthRequest, res: Response) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const remetenteId = req.userId;
    if (!remetenteId) {
        return res.status(401).json({ error: "Usuário não autenticado" });
    }
    const mensagens = await mensagemService.getAllMensagens(page, limit, Number(remetenteId));
    return res.status(200).json({ mensagens });
}

export const updateMensagem = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const { destinatarioId } = req.query;
    const remetenteId = req.userId;

    if (!remetenteId) {
        return res.status(401).json({ error: "Usuário não autenticado" });
    }
    if (!destinatarioId) {
        return res.status(401).json({ error: "Destinatario não autenticado" });
    }
    await mensagemService.updateMensagem(Number(id), Number(remetenteId), Number(destinatarioId), req.body);
    return res.status(200).json({ 'status': 'success', 'message': 'mensagem atualizada com sucesso!' });

}

export const deleteMensagem = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const { destinatarioId } = req.query;
    const remetenteId = req.userId;

    if (!remetenteId) {
        return res.status(401).json({ error: "Usuário não autenticado" });
    }
    if (!destinatarioId) {
        return res.status(401).json({ error: "Destinatario não autenticado" });
    }
    await mensagemService.deleteMensagem(Number(id), Number(remetenteId), Number(destinatarioId));
    return res.status(200).json({ 'status': 'success', 'message': 'mensagem deletado com sucesso!' });
}