import { Response, Request } from "express";
import * as telefoneService from '../services/telefone.service';
import { AuthRequest } from "../middleware/auth.middleware";

export const createTelefone = async (req: AuthRequest, res: Response) => {
    await telefoneService.createTelefone(req.body, req.userId!);
    return res.status(201).json({ 'status': 'success', 'message': 'telefone criado com sucesso!' });
}

export const getTelefoneById = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const telefone = await telefoneService.getTelefoneById(req.userId!, Number(id));
    return res.status(200).json({ telefone });
}

export const getAllTelefones = async (req: AuthRequest, res: Response) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    
    const telefones = await telefoneService.getAllTelefones(page, limit);
    return res.status(200).json({ telefones });
}

export const updateTelefone = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    await telefoneService.updateTelefone(Number(id), req.userId!, req.body);
    return res.status(200).json({ 'status': 'success', 'message': 'telefone atualizado com sucesso!' });
}

export const deleteTelefone = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    await telefoneService.deleteTelefone(Number(id), req.userId!);
    return res.status(201).json({ 'status': 'success', 'message': 'telefone deletado com sucesso!' });
}