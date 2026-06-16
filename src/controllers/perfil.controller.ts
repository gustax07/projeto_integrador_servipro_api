import { Response, Request } from "express";
import * as perfilService from '../services/perfil.service';
import Logger from "../config/logger";
import { AuthRequest } from "../middleware/auth.middleware";

export const createPerfil = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.userId) {
            return res.status(401).json({ error: "Usuário não autenticado" });
        }

        await perfilService.createPerfil({ ...req.body, userId: req.userId });
        return res.status(201).json({ 'status': 'success', 'message': 'perfil criado com sucesso!' });
    } catch (error: any) {
        Logger.error("Erro ao criar perfil", error);
        if (error.message) {
            return res.status(400).json({ error: error.message });
        }

        return res.status(500).json({ error: "Erro ao criar perfil" });
    }
}

export const getPerfilById = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        if (!req.userId) {
            return res.status(401).json({ error: "Usuário não autenticado" });
        }

        const perfil = await perfilService.getPerfilById(Number(id), Number(req.userId));
        return res.status(201).json({ perfil });
    } catch (error: any) {
        Logger.error("Erro ao buscar perfil", error);
        if (error.message) {
            return res.status(404).json({ error: error.message });
        }
        return res.status(501).json({ error: "Erro ao buscar perfil" });
    }
}

export const getAllPerfis = async (req: Request, res: Response) => {
    try {
        const perfis = await perfilService.getAllPerfis();
        return res.status(200).json({ perfis });
    } catch (error: any) {
        Logger.error("Erro ao buscar perfis", error);
        if (error.message) {
            return res.status(404).json({ error: error.message });
        }
        return res.status(500).json({ error: "Erro ao buscar perfis" });
    }
}

export const updatePerfil = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        if (!req.userId) {
            return res.status(401).json({ error: "Usuário não autenticado" });
        }

        await perfilService.updatePerfil(Number(id), Number(req.userId), req.body); return res.status(201).json({ 'status': 'success', 'message': 'perfil atualizado com sucesso!' });
    } catch (error: any) {
        Logger.error("Erro ao atualizar perfil", error);
        if (error.message) {
            return res.status(404).json({ error: error.message });
        }
        return res.status(500).json({ error: "Erro ao atualizar perfil" });
    }
}

export const deletePerfil = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        if (!req.userId) {
            res.status(401).json({ error: "Usuário não autenticado" });
        }
        await perfilService.deletePerfil(Number(id), Number(req.userId));
        return res.status(201).json({ 'status': 'success', 'message': 'perfil deletado com sucesso!' });
    } catch (error: any) {
        Logger.error("Erro ao deletar perfil", error);
        if (error.message){
            return res.status(404).json({ error: error.message });
        }
        return res.status(500).json({ error: "Erro ao deletar perfil" });
    }
}