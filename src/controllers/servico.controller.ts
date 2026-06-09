import { Response, Request } from "express";
import * as servicoService from '../services/servico.service';
import Logger from "../config/logger";
import { AuthRequest } from "../middleware/auth.middleware";


export const createServico = async (req: Request, res: Response) => {
    try {
        await servicoService.createServico(req.body);
        return res.status(201).json({ 'status': 'success', 'message': 'servico criado com sucesso!' });
    } catch (error: any) {
        Logger.error("Erro ao criar servico", error);
        if (error.message) {
            return res.status(404).json({ error: error.message });
        }
        return res.status(500).json({ error: "Erro ao criar servico" });
    }
}

export const getServicoById = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.userId){
            return res.status(401).json({ error: 'Usuário não autenticado.' });
        }
        const { id } = req.params;
        console.log(req.userId)
        const servico = await servicoService.getServicoById(Number(id), Number(req.userId));
        return res.status(200).json({ servico });
    } catch (error: any) {
        Logger.error("Erro ao buscar servico", error);
        if (error.message === 'Serviço não encontrado ou não pertence a este usuário.') {
            return res.status(404).json({ error: error.message });
        }
        console.log(error)
        return res.status(500).json({ error: "Erro ao buscar servico" });
    }
}

export const getAllServicos = async (req: Request, res: Response) => {
    try {
        const servicos = await servicoService.getAllServicos();
        return res.status(200).json({ servicos });
    } catch (error: any) {
        Logger.error("Erro ao buscar servicos", error);
        if (error.message === 'Nenhum serviço encontrado.') {
            return res.status(404).json({ error: error.message });
        }
        return res.status(500).json({ error: "Erro ao buscar servicos" });
    }
}

export const updateServico = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.userId) {
            return res.status(401).json({ error: 'Usuário não autenticado.' });
        }
        const { id, userId } = req.params;
        await servicoService.updateServico(Number(id), Number(req.userId), req.body);
        return res.status(200).json({ 'status': 'success', 'message': 'servico atualizado com sucesso!' });
    } catch (error: any) {
        Logger.error("Erro ao atualizar servico", error);
        if (error.message === 'Serviço não encontrado para atualização.') {
            return res.status(404).json({ error: error.message });
        }
        return res.status(500).json({ error: "Erro ao atualizar servico" });
    }
}

export const deleteServico = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.userId) {
            return res.status(401).json({ error: 'Usuário não autenticado.' });
        }
        const { id } = req.params;
        await servicoService.deleteServico(Number(id), Number(req.userId));
        return res.status(200).json({ 'status': 'success', 'message': 'servico deletado com sucesso!' });
    } catch (error: any) {
        Logger.error("Erro ao deletar servico", error);
        if (error.message === 'Serviço não encontrado para exclusão.') {
            return res.status(404).json({ error: error.message });
        }
        return res.status(500).json({ error: "Erro ao deletar servico" });
    }
}