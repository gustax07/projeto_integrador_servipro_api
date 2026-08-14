import { Response, Request } from "express";
import * as userService from '../services/user.service';
import { AuthRequest } from "../middleware/auth.middleware";

export const createUser = async (req: Request, res: Response) => {
    await userService.createUser(req.body);
    return res.status(201).json({ 'status': 'success', 'message': 'usuario criado com sucesso!' });
}

export const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await userService.getUserById(id ? Number(id) : Number(undefined));
    return res.status(200).json({ user });
}

export const getIconeByIcone = async (req: Request, res: Response) => {
    const { icone } = req.params;
    const imagem = await userService.getIconeByIcone(icone ? String(icone) : String(undefined));
    return res.status(200).json({ imagem});
}

export const saveIcone = async (req: AuthRequest & { file?: Express.Multer.File }, res: Response) => {
    if (!req.file) { return res.status(400).json({ 'status': 'error', 'message': 'nenhum arquivo foi enviado!' }); }
    if (!req.userId) { return res.status(401).json({ error: 'Usuário não autenticado.' }); }
    const icone = `uploads/icones_perfis/${req.file.filename}`;
    const imagem = await userService.saveIcone(req.userId, icone);
    return res.status(200).json({ imagem });
}

export const getAllUsers = async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const users = await userService.getAllUsers(page, limit);
    return res.status(200).json({ users });
}

export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await userService.updateUser(id ? Number(id) : Number(undefined), req.body);
    return res.status(200).json({ 'status': 'success', 'message': 'usuario atualizado com sucesso!', user });
}

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const token = req.headers.authorization?.split(' ')[1];
    await userService.deleteUser(id ? Number(id) : Number(undefined), token);
    return res.status(200).json({ 'status': 'success', 'message': 'usuario deletado com sucesso!' });
}