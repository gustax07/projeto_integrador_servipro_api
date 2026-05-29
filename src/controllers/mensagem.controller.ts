import { Response, Request } from "express";
import * as mensagemService from '../services/mensagem.service';
import Logger from "../config/logger";

export const createMensagem = async (req: Request, res: Response) => {
    try {
        await mensagemService.createMensagem(req.body);
        return res.status(201).json({ 'status': 'success', 'message': 'mensagem criada com sucesso!' });
    } catch (error) {
        Logger.error("Erro ao criar mensagem", error);
        return res.status(500).json({ error: "Erro ao criar mensagem" });
    }
}

export const getMensagemById = async (req: Request, res: Response) => {
    try {
        const { id, remetenteId, destinatarioId } = req.params;
        const mensagem = await mensagemService.getMensagemById(Number(id), Number(remetenteId), Number(destinatarioId));
        return res.status(200).json({ mensagem });
    } catch (error) {
        Logger.error("Erro ao buscar mensagem", error);
        return res.status(500).json({ error: "Erro ao buscar mensagem" });
    }
}

export const getAllMensagens = async (req: Request, res: Response) => {
    try {
        const mensagens = await mensagemService.getAllMensagens();
        return res.status(200).json({ mensagens });
    } catch (error) {
        Logger.error("Erro ao buscar mensagens", error);
        return res.status(500).json({ error: "Erro ao buscar mensagens" });
    }
}

export const updateMensagem = async (req: Request, res: Response) => {
    try {
        const { id, remetenteId, destinatarioId } = req.params;
        await mensagemService.updateMensagem(Number(id), Number(remetenteId), Number(destinatarioId), req.body);
        return res.status(200).json({ 'status': 'success', 'message': 'mensagem atualizada com sucesso!' });
    } catch (error) {
        Logger.error("Erro ao atualizar mensagem", error);
        return res.status(500).json({ error: "Erro ao atualizar mensagem" });
    }
}

export const deleteMensagem = async (req: Request, res: Response) => {
    try {
        const { id, remetenteId, destinatarioId } = req.params;
        await mensagemService.deleteMensagem(Number(id), Number(remetenteId), Number(destinatarioId));
        return res.status(200).json({ 'status': 'success', 'message': 'mensagem deletado com sucesso!' });
    } catch (error) {
        Logger.error("Erro ao deletar mensagem", error);
        return res.status(500).json({ error: "Erro ao deletar mensagem" });
    }
}