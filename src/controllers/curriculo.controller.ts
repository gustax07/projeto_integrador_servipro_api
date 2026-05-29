import { Response, Request } from "express";
import * as curriculoService from '../services/curriculo.service';
import Logger from "../config/logger";

export const createCurriculo = async (req: Request, res: Response) => {
    try {
        await curriculoService.createCurriculo(req.body);
        return res.status(201).json({ 'status': 'success', 'message': 'curriculo criado com sucesso!' });
    } catch (error) {
        Logger.error("Erro ao criar curriculo", error);
        return res.status(500).json({ error: "Erro ao criar curriculo" });
    }
}

export const getCurriculoById = async (req: Request, res: Response) => {
    try {
        const { id, userId } = req.params;
        const curriculo = await curriculoService.getCurriculoById(Number(id), Number(userId));
        return res.status(200).json({ curriculo });
    } catch (error) {
        Logger.error("Erro ao buscar curriculo", error);
        return res.status(500).json({ error: "Erro ao buscar curriculo" });
    }
}

export const getAllCurriculos = async (req: Request, res: Response) => {
    try {
        const curriculos = await curriculoService.getAllCurriculos();
        return res.status(200).json({ curriculos });
    } catch (error) {
        Logger.error("Erro ao buscar curriculos", error);
        return res.status(500).json({ error: "Erro ao buscar curriculos" });
    }
}

export const updateCurriculo = async (req: Request, res: Response) => {
    try {
        const { id, userId } = req.params;
        await curriculoService.updateCurriculo(Number(id), Number(userId), req.body);
        return res.status(200).json({ 'status': 'success', 'message': 'curriculo atualizado com sucesso!' });
    } catch (error) {
        Logger.error("Erro ao atualizar curriculo", error);
        return res.status(500).json({ error: "Erro ao atualizar curriculo" });
    }
}

export const deleteCurriculo = async (req: Request, res: Response) => {
    try {
        const { id, userId } = req.params;
        await curriculoService.deleteCurriculo(Number(id), Number(userId));
        return res.status(200).json({ 'status': 'success', 'message': 'curriculo deletado com sucesso!' });
    } catch (error) {
        Logger.error("Erro ao deletar curriculo", error);
        return res.status(500).json({ error: "Erro ao deletar curriculo" });
    }
}