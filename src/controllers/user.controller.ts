import { Response, Request } from "express";
import * as userService from '../services/user.service';
import Logger from "../config/logger";
import { constants } from "node:buffer";

export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await userService.createUser(req.body);
        return res.status(201).json({ 'message': 'usuario criado com sucesso!', user });
    } catch (error) {
        Logger.error("Erro ao criar usuário", error);
        return res.status(500).json({ error: "Erro ao criar usuário" });
    }
}

export const getUserById = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const user = await userService.getUserById(Number(id));
        return res.status(200).json({ user });
    } catch (error) {
        Logger.error("Erro ao buscar usuário", error);
        return res.status(500).json({ error: "Erro ao buscar usuário" });
    }

}