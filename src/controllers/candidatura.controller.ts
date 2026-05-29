import { Request, Response } from "express";
import * as candidaturaService from '../services/candidatura.service';
import Logger from "../config/logger";

export const createCandidatura = async (req: Request, res: Response) => {
    try {
        await candidaturaService.createCandidatura(req.body);
        return res.status(201).json({ 'status': 'success', 'message': 'candidatura criada com sucesso!' });
    } catch (error) {
        Logger.error("Erro ao criar candidatura", error);
        return res.status(500).json({ error: "Erro ao criar candidatura" });
    }
}

export const getCandidaturaById = async (req: Request, res: Response) => {
    try {
        const { id, userId } = req.params;
        const candidatura = await candidaturaService.getCandidaturaById(Number(id), Number(userId));
        return res.status(200).json({ candidatura });
    } catch (error) {
        Logger.error("Erro ao buscar candidatura", error);
        return res.status(500).json({ error: "Erro ao buscar candidatura" });
    }
}

export const getAllCandidaturas = async (req: Request, res: Response) => {
    try {
        const candidaturas = await candidaturaService.getAllCandidaturas();
        return res.status(200).json({ candidaturas });
    } catch (error) {
        Logger.error("Erro ao buscar candidaturas", error);
        return res.status(500).json({ error: "Erro ao buscar candidaturas" });
    }
}

export const updateCandidatura = async (req: Request, res: Response) => {
    try {
        const { id, userId } = req.params;
        await candidaturaService.updateCandidatura(Number(id), Number(userId), req.body);
        return res.status(200).json({ 'status': 'success', 'message': 'candidatura atualizada com sucesso!' });
    } catch (error) {
        Logger.error("Erro ao atualizar candidatura", error);
        return res.status(500).json({ error: "Erro ao atualizar candidatura" });
    }
}

export const deleteCandidatura = async (req: Request, res: Response) => {
    try {
        const { id, userId } = req.params;
        await candidaturaService.deleteCandidatura(Number(id), Number(userId));
        return res.status(200).json({ 'status': 'success', 'message': 'candidatura deletada com sucesso!' });
    } catch (error) {
        Logger.error("Erro ao deletar candidatura", error);
        return res.status(500).json({ error: "Erro ao deletar candidatura" });
    }
}