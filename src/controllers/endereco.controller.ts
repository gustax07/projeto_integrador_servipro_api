import { Response, Request } from "express";
import * as enderecoService from '../services/endereco.service';
import Logger from "../config/logger";
import { AuthRequest } from "../middleware/auth.middleware";

export const createEndereco = async (req: Request, res: Response) => {
    try {
        await enderecoService.createEndereco(req.body);
        return res.status(201).json({ 'status': 'success', 'message': 'endereco criado com sucesso!' });
    } catch (error) {
        Logger.error("Erro ao criar endereco", error);
        return res.status(500).json({ error: "Erro ao criar endereco" });
    }
}

export const getEnderecoById = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.userId) {
            return res.status(401).json({ error: "Usuário não autenticado" });
        }
        const { id } = req.params;
        const endereco = await enderecoService.getEnderecoById(Number(id), Number(req.userId));
        return res.status(200).json({ endereco });
    } catch (error: any) {
        Logger.error("Erro ao buscar endereco", error);
        if (error.message) {
            return res.status(404).json({ error: error.message });
        }
        return res.status(500).json({ error: "Erro ao buscar endereco" });
    }
}

export const getAllEnderecos = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.userId) {
            return res.status(401).json({ error: "Usuário não autenticado" });
        }
        const enderecos = await enderecoService.getAllEnderecos(req.query.page ? Number(req.query.page) : 1, req.query.limit ? Number(req.query.limit) : 20, Number(req.userId));
        return res.status(200).json({ enderecos });
    } catch (error: any) {
        Logger.error("Erro ao buscar enderecos", error);
       if (error.message) {
            return res.status(404).json({ error: error.message });
        }
        return res.status(500).json({ error: "Erro ao buscar enderecos" });
    }
}

export const updateEndereco = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.userId) {
            return res.status(401).json({ error: "Usuário não autenticado" });
        }
        const { id } = req.params;
        await enderecoService.updateEndereco(Number(id), Number(req.userId), req.body);
        return res.status(200).json({ 'status': 'success', 'message': 'endereco atualizado com sucesso!' });
    } catch (error: any) {
        Logger.error("Erro ao atualizar endereco", error);
       if (error.message) {
            return res.status(404).json({ error: error.message });
        }
        return res.status(500).json({ error: "Erro ao atualizar endereco" });
    }
}

export const deleteEndereco = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.userId) {
            return res.status(401).json({ error: "Usuário não autenticado" });
        }
        const { id } = req.params;
        await enderecoService.deleteEndereco(Number(id), Number(req.userId));
        return res.status(200).json({ 'status': 'success', 'message': 'endereco deletado com sucesso!' });
    } catch (error: any) {
        Logger.error("Erro ao deletar endereco", error);
        if (error.message) {
            return res.status(404).json({ error: error.message });
        }
        return res.status(500).json({ error: "Erro ao deletar endereco" });
    }
}