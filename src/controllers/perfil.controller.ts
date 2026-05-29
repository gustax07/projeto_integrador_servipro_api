import { Response, Request } from "express";
import * as perfilService from '../services/perfil.service';
import Logger from "../config/logger";

export const createPerfil = async (req: Request, res: Response) => {
    try {
        await perfilService.createPerfil(req.body);
        return res.status(201).json({ 'status': 'success', 'message': 'perfil criado com sucesso!' });
    } catch (error) {
        Logger.error("Erro ao criar perfil", error);
        return res.status(500).json({ error: "Erro ao criar perfil" });
    }
}

export const getPerfilById = async (req: Request, res: Response) => {
    try {
        const { id, userId } = req.params;
        const perfil = await perfilService.getPerfilById(Number(id), Number(userId));
        return res.status(200).json({ perfil });
    } catch (error) {
        Logger.error("Erro ao buscar perfil", error);
        return res.status(501).json({ error: "Erro ao buscar perfil" });
    }
}

export const getAllPerfis = async (req: Request, res: Response) => {
    try {
        const perfis = await perfilService.getAllPerfis();
        return res.status(200).json({ perfis });
    } catch (error) {
        Logger.error("Erro ao buscar perfis", error);
        return res.status(500).json({ error: "Erro ao buscar perfis" });
    }
}

export const updatePerfil = async (req: Request, res: Response) => {
    try {
        const { id, userId } = req.params;
        await perfilService.updatePerfil(Number(id), Number(userId), req.body);
        return res.status(200).json({ 'status': 'success', 'message': 'perfil atualizado com sucesso!' });
    } catch (error) {
        Logger.error("Erro ao atualizar perfil", error);
        return res.status(500).json({ error: "Erro ao atualizar perfil" });
    }
}

export const deletePerfil = async (req: Request, res: Response) => {
    try {
        const { id, userId } = req.params;
        await perfilService.deletePerfil(Number(id), Number(userId));
        return res.status(200).json({ 'status': 'success', 'message': 'perfil deletado com sucesso!' });
    } catch (error) {
        Logger.error("Erro ao deletar perfil", error);
        return res.status(500).json({ error: "Erro ao deletar perfil" });
    }
}