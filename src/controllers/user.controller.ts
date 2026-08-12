import { Response, Request } from "express";
import * as userService from '../services/user.service';

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
    const iconee = await userService.getIconeByIcone(icone ? String(icone) : String(undefined));
    return res.status(200).json({ iconee });
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