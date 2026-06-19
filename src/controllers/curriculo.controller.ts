import { Response, Request } from "express";
import * as curriculoService from '../services/curriculo.service';
import { AuthRequest } from "../middleware/auth.middleware";

export const createCurriculo = async (req: AuthRequest, res: Response) => {
    if (!req.userId) return res.status(401).json({ error: "Usuário não autenticado" });
    await curriculoService.createCurriculo({ ...req.body, userId: req.userId });
    return res.status(201).json({ 'status': 'success', 'message': 'curriculo criado com sucesso!' });
}

export const getCurriculoById = async (req: AuthRequest, res: Response) => {
    if (!req.userId) return res.status(401).json({ error: "Usuário não autenticado" });

    const { id } = req.params;
    const curriculo = await curriculoService.getCurriculoById(Number(id), Number(req.userId));
    return res.status(201).json({ curriculo });
}

export const getAllCurriculos = async (req: Request, res: Response) => {
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 20;
    const curriculos = await curriculoService.getAllCurriculos(page, limit);
    return res.status(201).json({ curriculos });
}

export const updateCurriculo = async (req: AuthRequest, res: Response) => {
    if (!req.userId) return res.status(401).json({ error: "Usuário não autenticado" });
    const { id } = req.params;
    const { idExperencia, idCurso } = req.query

    await curriculoService.updateCurriculo(Number(id), Number(req.userId), req.body, Number(idExperencia), Number(idCurso));
    return res.status(201).json({ 'status': 'success', 'message': 'curriculo atualizado com sucesso!' });
}

export const deleteCurriculo = async (req: AuthRequest, res: Response) => {
    if (!req.userId) return res.status(401).json({ error: "Usuário não autenticado" });
    const { id } = req.params;
    await curriculoService.deleteCurriculo(Number(id), Number(req.userId));
    return res.status(201).json({ 'status': 'success', 'message': 'curriculo deletado com sucesso!' });
}