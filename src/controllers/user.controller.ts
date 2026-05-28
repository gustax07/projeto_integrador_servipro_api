import { Response, Request } from "express";
import * as userService from '../services/user.service';
import Logger from "../config/logger";

export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await userService.createUser(req.body);
        return res.status(201).json({ 'status': 'success', 'message': 'usuario criado com sucesso!', user });
    } catch (error) {
        Logger.error("Erro ao criar usuário", error);
        return res.status(500).json({ error: "Erro ao criar usuário" });
    }
}

export const getUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await userService.getUserById(Number(id));
        return res.status(200).json({ user });
    } catch (error) {
        Logger.error("Erro ao buscar usuário", error);
        return res.status(500).json({ error: "Erro ao buscar usuário" });
    }
}

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await userService.getAllUsers();
        return res.status(200).json({ users });
    } catch (error) {
        Logger.error("Erro ao buscar usuários", error);
        return res.status(500).json({ error: "Erro ao buscar usuários" });
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await userService.updateUser(Number(id), req.body);
        return res.status(200).json({ 'status': 'success', 'message': 'usuario atualizado com sucesso!', user });
    } catch (error) {
        Logger.error("Erro ao atualizar usuário", error);
        return res.status(500).json({ error: "Erro ao atualizar usuário" });
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await userService.deleteUser(Number(id));
        return res.status(200).json({ 'status': 'success', 'message': 'usuario deletado com sucesso!', user });
    } catch (error: any) {
        Logger.error("Erro ao deletar usuário", error);
        return res.status(500).json({ error: "Erro ao deletar usuário" });
    }
}