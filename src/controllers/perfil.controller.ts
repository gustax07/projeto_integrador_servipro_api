import { Response, Request } from "express";
import * as perfilService from '../services/perfil.service';
import { AuthRequest } from "../middleware/auth.middleware";

export const createPerfil = async (req: AuthRequest, res: Response) => {
    if (!req.userId) { return res.status(401).json({ error: "Usuário não autenticado" }); }
    await perfilService.createPerfil({ ...req.body, userId: req.userId });
    return res.status(201).json({ 'status': 'success', 'message': 'perfil criado com sucesso!' });
}

export const getPerfilById = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    if (!id) { return res.status(400).json({ error: "ID do perfil não fornecido" }); }
    if (!req.userId) { return res.status(401).json({ error: "Usuário não autenticado" }); }
    const perfil = await perfilService.getPerfilById(Number(id), Number(req.userId));
    return res.status(201).json({ perfil });
}

export const getAllPerfis = async (req: Request, res: Response) => {
    const perfis = await perfilService.getAllPerfis();
    return res.status(200).json({ perfis });
}

export const updatePerfil = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    if (!id) { return res.status(400).json({ error: "ID do perfil não fornecido" }); }
    if (!req.userId) { return res.status(401).json({ error: "Usuário não autenticado" }); }
    await perfilService.updatePerfil(Number(id), Number(req.userId), req.body); return res.status(201).json({ 'status': 'success', 'message': 'perfil atualizado com sucesso!' });
}

export const deletePerfil = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    if (!id) { return res.status(400).json({ error: "ID do perfil não fornecido" }); }
    if (!req.userId) { return res.status(401).json({ error: "Usuário não autenticado" }); }
    await perfilService.deletePerfil(Number(id), Number(req.userId));
    return res.status(201).json({ 'status': 'success', 'message': 'perfil deletado com sucesso!' });

}