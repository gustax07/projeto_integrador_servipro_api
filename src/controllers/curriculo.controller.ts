import { Response, Request } from "express";
import * as curriculoService from '../services/curriculo.service';
import Logger from "../config/logger";
import { AuthRequest } from "../middleware/auth.middleware";

export const createCurriculo = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.userId) return res.status(401).json({ error: "Usuário não autenticado" });

        // Injetamos o userId do token para garantir segurança
        await curriculoService.createCurriculo({ ...req.body, userId: req.userId });
        return res.status(201).json({ 'status': 'success', 'message': 'curriculo criado com sucesso!' });
    } catch (error: any) {
        Logger.error("Erro ao criar curriculo", error);
        if (error.message === 'O usuário já possui um currículo cadastrado.') {
            return res.status(400).json({ error: error.message });
        }
        return res.status(500).json({ error: "Erro ao criar curriculo" });
    }
}

export const getCurriculoById = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.userId) return res.status(401).json({ error: "Usuário não autenticado" });

        const { id } = req.params;
        const curriculo = await curriculoService.getCurriculoById(Number(id), Number(req.userId));
        return res.status(200).json({ curriculo });
    } catch (error: any) {
        Logger.error("Erro ao buscar curriculo", error);
        if (error.message) return res.status(404).json({ error: error.message });
        return res.status(500).json({ error: "Erro ao buscar curriculo" });
    }
}

export const getAllCurriculos = async (req: Request, res: Response) => {
    try {
        const page = req.query.page ? Number(req.query.page) : 1;
        const limit = req.query.limit ? Number(req.query.limit) : 20;
        const curriculos = await curriculoService.getAllCurriculos(page, limit);
        return res.status(200).json({ curriculos });
    } catch (error: any) {
        Logger.error("Erro ao buscar curriculos", error);
        if (error.message) return res.status(404).json({ error: error.message });
        return res.status(500).json({ error: "Erro ao buscar curriculos" });
    }
}

export const updateCurriculo = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.userId) return res.status(401).json({ error: "Usuário não autenticado" });
        const { id } = req.params;
        await curriculoService.updateCurriculo(Number(id), Number(req.userId), req.body);
        return res.status(200).json({ 'status': 'success', 'message': 'curriculo atualizado com sucesso!' });
    } catch (error) {
        Logger.error("Erro ao atualizar curriculo", error);
        return res.status(500).json({ error: "Erro ao atualizar curriculo" });
    }
}

export const deleteCurriculo = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.userId) return res.status(401).json({ error: "Usuário não autenticado" });
        const { id } = req.params;
        await curriculoService.deleteCurriculo(Number(id), Number(req.userId));
        return res.status(200).json({ 'status': 'success', 'message': 'curriculo deletado com sucesso!' });
    } catch (error) {
        Logger.error("Erro ao deletar curriculo", error);
        return res.status(500).json({ error: "Erro ao deletar curriculo" });
    }
}