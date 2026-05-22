import { Response, Request } from "express";
import * as authService from '../services/auth.service';
import Logger from "../config/logger";

export const login = async (req: Request, res: Response) => {
    const { email, senha } = req.body;
    try {
        const token = await authService.autenticarUsuario(email, senha);
        return res.status(200).json({ token });
    } catch (error) {
        Logger.error("Erro ao autenticar usuário", error);
        return res.status(500).json({ error: "Erro ao autenticar usuário" });
    }
}