import { Request, Response } from "express";
import * as candidaturaService from '../services/candidatura.service';
import { AuthRequest } from "../middleware/auth.middleware";

export const createCandidatura = async (req: Request, res: Response) => {
    await candidaturaService.createCandidatura(req.body);
    return res.status(201).json({ 'status': 'success', 'message': 'candidatura criada com sucesso!' });
}

export const getCandidaturaById = async (req: AuthRequest, res: Response) => {
    if (!req.userId) {
        return res.status(401).json({ error: "Usuário não autenticado" });
    }
    const { id } = req.params;
    const candidatura = await candidaturaService.getCandidaturaById(Number(id), Number(req.userId));
    return res.status(200).json({ candidatura });
}

export const getAllCandidaturasByIdServico = async (req: Request, res: Response) => {
    const { idServico } = req.params;
    const candidaturas = await candidaturaService.getAllCandidaturasByIdServico(Number(idServico));
    return res.status(200).json({ candidaturas });
}

export const getAllCandidaturas = async (req: AuthRequest, res: Response) => {
    if (!req.userId) {
        return res.status(404).json({ error: "Usuário não autenticado" });
    }
    const candidaturas = await candidaturaService.getAllCandidaturas(req.userId);
    return res.status(200).json({ candidaturas });
}

export const updateCandidatura = async (req: AuthRequest, res: Response) => {
    if (!req.userId) {
        return res.status(401).json({ error: "Usuário não autenticado" });
    }
    const { id } = req.params;
    await candidaturaService.updateCandidatura(Number(id), Number(req.userId), req.body);
    return res.status(200).json({ 'status': 'success', 'message': 'candidatura atualizada com sucesso!' });

}

export const deleteCandidatura = async (req: AuthRequest, res: Response) => {
    if (!req.userId) {
        return res.status(401).json({ error: "Usuário não autenticado" });
    }
    const { id } = req.params;
    await candidaturaService.deleteCandidatura(Number(id), Number(req.userId));
    return res.status(200).json({ 'status': 'success', 'message': 'candidatura deletada com sucesso!' });
}