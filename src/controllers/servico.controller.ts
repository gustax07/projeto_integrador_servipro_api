import { Response, Request } from "express";
import * as servicoService from '../services/servico.service';
import Logger from "../config/logger";

export const createServico = async (req: Request, res: Response) => {
    try {
        await servicoService.createServico(req.body);
        return res.status(201).json({ 'status': 'success', 'message': 'servico criado com sucesso!' });
    } catch (error) {
        Logger.error("Erro ao criar servico", error);
        return res.status(500).json({ error: "Erro ao criar servico" });
    }
}

export const getServicoById = async (req: Request, res: Response) => {
    try {
        const { id, userId } = req.params;
        const servico = await servicoService.getServicoById(Number(id), Number(userId));
        return res.status(200).json({ servico });
    } catch (error) {
        Logger.error("Erro ao buscar servico", error);
        return res.status(500).json({ error: "Erro ao buscar servico" });
    }
}

export const getAllServicos = async (req: Request, res: Response) => {
    try {
        const servicos = await servicoService.getAllServicos();
        return res.status(200).json({ servicos });
    } catch (error) {
        Logger.error("Erro ao buscar servicos", error);
        return res.status(500).json({ error: "Erro ao buscar servicos" });
    }
}

export const updateServico = async (req: Request, res: Response) => {
    try {
        const { id, userId } = req.params;
        await servicoService.updateServico(Number(id), Number(userId), req.body);
        return res.status(200).json({ 'status': 'success', 'message': 'servico atualizado com sucesso!' });
    } catch (error) {
        Logger.error("Erro ao atualizar servico", error);
        return res.status(500).json({ error: "Erro ao atualizar servico" });
    }
}

export const deleteServico = async (req: Request, res: Response) => {
    try {
        const { id, userId } = req.params;
        await servicoService.deleteServico(Number(id), Number(userId));
        return res.status(200).json({ 'status': 'success', 'message': 'servico deletado com sucesso!' });
    } catch (error) {
        Logger.error("Erro ao deletar servico", error);
        return res.status(500).json({ error: "Erro ao deletar servico" });
    }
}