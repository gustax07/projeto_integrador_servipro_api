import { Response, Request } from "express";
import * as servicoService from '../services/servico.service';
import { AuthRequest } from "../middleware/auth.middleware";


export const createServico = async (req: Request, res: Response) => {
    await servicoService.createServico(req.body);
    return res.status(201).json({ 'status': 'success', 'message': 'servico criado com sucesso!' });
}

export const getServicoById = async (req: AuthRequest, res: Response) => {
    if (!req.userId) { return res.status(401).json({ error: 'Usuário não autenticado.' }); }
    const { id } = req.params;
    if (!id) { return res.status(400).json({ error: 'ID do serviço não fornecido.' }); }
    const servico = await servicoService.getServicoById(Number(id), Number(req.userId));
    return res.status(200).json({ servico });
}

export const getAllServicos = async (req: Request, res: Response) => {
    const servicos = await servicoService.getAllServicos();
    return res.status(200).json({ servicos });
}

export const updateServico = async (req: AuthRequest, res: Response) => {
    if (!req.userId) { return res.status(401).json({ error: 'Usuário não autenticado.' }); }
    const { id } = req.params;
    if (!id) { return res.status(400).json({ error: 'ID do serviço não fornecido.' }); }
    await servicoService.updateServico(Number(id), Number(req.userId), req.body);
    return res.status(200).json({ 'status': 'success', 'message': 'servico atualizado com sucesso!' });
}

export const deleteServico = async (req: AuthRequest, res: Response) => {
    if (!req.userId) { return res.status(401).json({ error: 'Usuário não autenticado.' }); }
    const { id } = req.params;
    if (!id) { return res.status(400).json({ error: 'ID do serviço não fornecido.' }); }
    await servicoService.deleteServico(Number(id), Number(req.userId));
    return res.status(200).json({ 'status': 'success', 'message': 'servico deletado com sucesso!' });
}