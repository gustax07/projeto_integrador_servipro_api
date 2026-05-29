import { Response, Request } from "express";
import * as habilidadeService from '../services/habilidade.service';
import Logger from "../config/logger";

export const createHabilidade = async (req: Request, res: Response) => {
    try {
        await habilidadeService.createHabilidade(req.body);
        return res.status(201).json({ 'status': 'success', 'message': 'habilidade criada com sucesso!' });
    } catch (error) {
        Logger.error("Erro ao criar habilidade", error);
        return res.status(500).json({ error: "Erro ao criar habilidade" });
    }
}

export const getHabilidadeById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const habilidade = await habilidadeService.getHabilidadeById(Number(id));
        return res.status(201).json({ habilidade });
    } catch (error) {
        Logger.error("Erro ao buscar habilidade", error);
        return res.status(500).json({ error: "Erro ao buscar habilidade" });
    }
}

export const getAllHabilidades = async (req: Request, res: Response) => {
    try {
        const habilidades = await habilidadeService.getAllHabilidades();
        return res.status(201).json({ habilidades });
    } catch (error) {
        Logger.error("Erro ao buscar habilidades", error);
        return res.status(500).json({ error: "Erro ao buscar habilidades" });
    }
}

export const updateHabilidade = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await habilidadeService.updateHabilidade(Number(id), req.body);
        return res.status(201).json({ 'status': 'success', 'message': 'habilidade atualizada com sucesso!' });
    } catch (error) {
        Logger.error("Erro ao atualizar habilidade", error);
        return res.status(500).json({ error: "Erro ao atualizar habilidade" });
    }
}

export const deleteHabilidade = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await habilidadeService.deleteHabilidade(Number(id));
        return res.status(201).json({ 'status': 'success', 'message': 'habilidade deletado com sucesso!' });
    } catch (error) {
        Logger.error("Erro ao deletar habilidade", error);
        return res.status(500).json({ error: "Erro ao deletar habilidade" });
    }
}