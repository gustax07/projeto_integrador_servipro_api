import { Response, Request } from "express";
import * as setorService from '../services/setor.service';

export const createSetor = async (req: Request, res: Response) => {
    await setorService.createSetor(req.body);
    return res.status(201).json({ 'status': 'success', 'message': 'setor criado com sucesso!' });
}

export const getSetorById = async (req: Request, res: Response) => {
    const setor = await setorService.getSetorById(Number(req.params.id));
    return res.status(200).json({ setor });
}

export const getAllSetores = async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const setores = await setorService.getAllSetores(page, limit);
    return res.status(200).json({ setores });
}

export const updateSetor = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) { return res.status(400).json({ error: 'ID do setor não fornecido.' }); }
    await setorService.updateSetor(Number(id), req.body);
    return res.status(200).json({ 'status': 'success', 'message': 'setor atualizado com sucesso!' });
}

export const deleteSetor = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) { return res.status(400).json({ error: 'ID do setor não fornecido.' }); }
    await setorService.deleteSetor(Number(id));
    return res.status(200).json({ 'status': 'success', 'message': 'setor deletado com sucesso!' });
}