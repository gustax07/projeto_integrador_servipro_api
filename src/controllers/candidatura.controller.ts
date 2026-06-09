import { Request, Response } from "express";
import * as candidaturaService from '../services/candidatura.service';
import Logger from "../config/logger";
import { AuthRequest } from "../middleware/auth.middleware";

export const createCandidatura = async (req: Request, res: Response) => {
    try {
        await candidaturaService.createCandidatura(req.body);
        return res.status(201).json({ 'status': 'success', 'message': 'candidatura criada com sucesso!' });
    } catch (error: any) {
        Logger.error("Erro ao criar candidatura", error);
        if (error.message === 'Candidatura já cadastrada no sistema.') {
            return res.status(400).json({ error: error.message });
        }
        if (error.message === 'Serviço ou usuário não encontrado.') {
            return res.status(404).json({ error: error.message });
        }
        return res.status(500).json({ error: "Erro ao criar candidatura" });
    }
}

export const getCandidaturaById = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.userId) {
            return res.status(401).json({ error: "Usuário não autenticado" });
        }
        const { id } = req.params;
        const candidatura = await candidaturaService.getCandidaturaById(Number(id), Number(req.userId));
        return res.status(200).json({ candidatura });
    } catch (error: any) {
        Logger.error("Erro ao buscar candidatura", error);
        if (error.message === 'Candidatura não encontrada ou não pertence a este usuário.') {
            return res.status(404).json({ error: error.message });
        }
        return res.status(500).json({ error: "Erro ao buscar candidatura" });
    }
}

export const getAllCandidaturas = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.userId) {
            return res.status(404).json({ error: "Usuário não autenticado" });
        }
        const candidaturas = await candidaturaService.getAllCandidaturas(req.userId);
        return res.status(200).json({ candidaturas });
    } catch (error) {
        Logger.error("Erro ao buscar candidaturas", error);
        return res.status(500).json({ error: "Erro ao buscar candidaturas" });
    }
}

export const updateCandidatura = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.userId) {
            return res.status(401).json({ error: "Usuário não autenticado" });
        }
        const { id} = req.params;
        await candidaturaService.updateCandidatura(Number(id), Number(req.userId), req.body);
        return res.status(200).json({ 'status': 'success', 'message': 'candidatura atualizada com sucesso!' });
    } catch (error: any) {
        Logger.error("Erro ao atualizar candidatura", error);
        if (error.message === 'Candidatura não encontrada para atualização.') {
            return res.status(404).json({ error: error.message });
        }
        if (error.message === 'Serviço ou usuário não encontrado.') {
            return res.status(404).json({ error: error.message });
        }
        if (error.message === 'Candidatura já cadastrada no sistema.') {
            return res.status(400).json({ error: error.message });
        }
        return res.status(500).json({ error: "Erro ao atualizar candidatura" });
    }
}

export const deleteCandidatura = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.userId) {
            return res.status(401).json({ error: "Usuário não autenticado" });
        }
        const { id } = req.params;
        await candidaturaService.deleteCandidatura(Number(id), Number(req.userId));
        return res.status(200).json({ 'status': 'success', 'message': 'candidatura deletada com sucesso!' });
    } catch (error: any) {
        Logger.error("Erro ao deletar candidatura", error);
        if (error.message === 'Candidatura não encontrada para exclusão.') {
            return res.status(404).json({ error: error.message });
        }
        return res.status(500).json({ error: "Erro ao deletar candidatura" });
    }
}