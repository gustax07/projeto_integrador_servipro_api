import { Response, Request } from "express";
import * as authService from '../services/auth.service';
import Logger from "../config/logger";

export const login = async (req: Request, res: Response) => {
    const { email, senha } = req.body;
    try {
        const token = await authService.autenticarUsuario(email, senha);
        return res.status(200).json({ token });
    } catch (error: any) {
        
        if (error.message == "Credenciais invalidas") {
            return res.status(404).json({ error: "Senha ou email inválidos!" });
        }
        Logger.error("Erro ao autenticar usuário", error);
        return res.status(500).json({ error: "Erro ao autenticar usuário" });
    }
}

export const googleAuth = async (req: Request, res: Response) => {
    try {
        const { email, firebase, nome, icone } = req.body;
        const token = await authService.autenticarUsuarioGoogle(email, firebase, nome, icone);
        return res.status(200).json({ token });
    } catch (error: any) {
        Logger.error("Erro ao autenticar usuário com Google", error);
        return res.status(500).json({ error: "Erro ao autenticar usuário com Google" });
    }
}