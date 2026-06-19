import { Response, Request } from "express";
import * as enderecoService from '../services/endereco.service';
import { AuthRequest } from "../middleware/auth.middleware";

export const createEndereco = async (req: Request, res: Response) => {
    await enderecoService.createEndereco(req.body);
    return res.status(201).json({ 'status': 'success', 'message': 'endereco criado com sucesso!' });
}

export const getEnderecoById = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    if (!req.userId) { return res.status(401).json({ error: "Usuário não autenticado" }); }
    if (!id) { return res.status(400).json({ error: "ID do endereço não fornecido" }); }
    const endereco = await enderecoService.getEnderecoById(Number(id), Number(req.userId));
    return res.status(200).json({ endereco });
}

export const getAllEnderecos = async (req: AuthRequest, res: Response) => {
    const page = !req.query.page ? 1 : Number(req.query.page);
    const limit = !req.query.limit ? 20 : Number(req.query.limit);
    if (!req.userId) { return res.status(401).json({ error: "Usuário não autenticado" }); }
    const enderecos = await enderecoService.getAllEnderecos(page, limit, Number(req.userId));
    return res.status(200).json({ enderecos });
}

export const updateEndereco = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    if (!req.userId) { return res.status(401).json({ error: "Usuário não autenticado" }); }
    if (!id) { return res.status(400).json({ error: "ID do endereço não fornecido" }); }
    await enderecoService.updateEndereco(Number(id), Number(req.userId), req.body);
    return res.status(200).json({ 'status': 'success', 'message': 'endereco atualizado com sucesso!' });

}

export const deleteEndereco = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    if (!req.userId) { return res.status(401).json({ error: "Usuário não autenticado" }); }
    if (!id) { return res.status(400).json({ error: "ID do endereço não fornecido" }); }
    await enderecoService.deleteEndereco(Number(id), Number(req.userId));
    return res.status(200).json({ 'status': 'success', 'message': 'endereco deletado com sucesso!' });
}