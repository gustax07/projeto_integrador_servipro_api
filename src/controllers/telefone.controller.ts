import { Response, Request } from "express";
import * as telefoneService from '../services/telefone.service';
import Logger from "../config/logger";

export const createTelefone = async (req: Request, res: Response) => {
    try {
        await telefoneService.createTelefone(req.body);
        return res.status(201).json({ 'status': 'success', 'message': 'telefone criado com sucesso!' });
    } catch (error) {
        Logger.error("Erro ao criar telefone", error);
        return res.status(500).json({ error: "Erro ao criar telefone" });
    }
}

export const getTelefoneById = async (req: Request, res: Response) => {
    try {
        const { id, userId } = req.params;
        const telefone = await telefoneService.getTelefoneById(Number(id), Number(userId));
        return res.status(200).json({ telefone });
    } catch (error) {
        Logger.error("Erro ao buscar telefone", error);
        return res.status(500).json({ error: "Erro ao buscar telefone" });
    }
}

export const getAllTelefones = async (req: Request, res: Response) => {
    try {
        const telefones = await telefoneService.getAllTelefones();
        return res.status(200).json({ telefones });
    } catch (error) {
        Logger.error("Erro ao buscar telefones", error);
        return res.status(500).json({ error: "Erro ao buscar telefones" });
    }
}

export const updateTelefone = async (req: Request, res: Response) => {
    try {
        const { id, userId } = req.params;
        await telefoneService.updateTelefone(Number(id), Number(userId), req.body);
        return res.status(200).json({ 'status': 'success', 'message': 'telefone atualizado com sucesso!' });
    } catch (error) {
        Logger.error("Erro ao atualizar telefone", error);
        return res.status(500).json({ error: "Erro ao atualizar telefone" });
    }
}

export const deleteTelefone = async (req: Request, res: Response) => {
    try {
        const { id, userId } = req.params;
        await telefoneService.deleteTelefone(Number(id), Number(userId));
        return res.status(201).json({ 'status': 'success', 'message': 'telefone deletado com sucesso!' });
    } catch (error) {
        Logger.error("Erro ao deletar telefone", error);
        return res.status(500).json({ error: "Erro ao deletar telefone" });
    }
}