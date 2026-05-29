import { Response, Request } from "express";
import * as experienciaService from '../services/experiencia.service';
import Logger from "../config/logger";

export const createExperiencia = async (req: Request, res: Response) => {
    try {
        await experienciaService.createExperiencia(req.body);
        return res.status(201).json({ 'status': 'success', 'message': 'experiencia criada com sucesso!' });
    } catch (error) {
        Logger.error("Erro ao criar experiencia", error);
        return res.status(500).json({ error: "Erro ao criar experiencia" });
    }
}

export const getExperienciaById = async (req: Request, res: Response) => {
    try {
        const { id, curriculoId } = req.params;
        const experiencia = await experienciaService.getExperienciaById(Number(id), Number(curriculoId));
        return res.status(200).json({ experiencia });
    } catch (error) {
        Logger.error("Erro ao buscar experiencia", error);
        return res.status(500).json({ error: "Erro ao buscar experiencia" });
    }
}

export const getAllExperiencias = async (req: Request, res: Response) => {
    try {
        const experiencias = await experienciaService.getAllExperiencias();
        return res.status(200).json({ experiencias });
    } catch (error) {
        Logger.error("Erro ao buscar experiencias", error);
        return res.status(500).json({ error: "Erro ao buscar experiencias" });
    }
}

export const updateExperiencia = async (req: Request, res: Response) => {
    try {
        const { id, curriculoId } = req.params;
        await experienciaService.updateExperiencia(Number(id), Number(curriculoId), req.body);
        return res.status(200).json({ 'status': 'success', 'message': 'experiencia atualizada com sucesso!' });
    } catch (error) {
        Logger.error("Erro ao atualizar experiencia", error);
        return res.status(500).json({ error: "Erro ao atualizar experiencia" });
    }
}

export const deleteExperiencia = async (req: Request, res: Response) => {
    try {
        const { id, curriculoId } = req.params;
        await experienciaService.deleteExperiencia(Number(id), Number(curriculoId));
        return res.status(200).json({ 'status': 'success', 'message': 'experiencia deletada com sucesso!' });
    } catch (error) {
        Logger.error("Erro ao deletar experiencia", error);
        return res.status(500).json({ error: "Erro ao deletar experiencia" });
    }
}