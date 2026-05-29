import { Response, Request } from "express";
import * as cursoService from '../services/curso.service';
import Logger from "../config/logger";

export const createCurso = async (req: Request, res: Response) => {
    try {
        await cursoService.createCurso(req.body);
        return res.status(201).json({ 'status': 'success', 'message': 'curso criado com sucesso!' });
    } catch (error) {
        Logger.error("Erro ao criar curso", error);
        return res.status(500).json({ error: "Erro ao criar curso" });
    }
}

export const getCursoById = async (req: Request, res: Response) => {
    try {
        const { id, curriculoId } = req.params;
        const curso = await cursoService.getCursoById(Number(id), Number(curriculoId));
        return res.status(201).json({ curso });
    } catch (error) {
        Logger.error("Erro ao buscar curso", error);
        return res.status(500).json({ error: "Erro ao buscar curso" });
    }
}

export const getAllCursos = async (req: Request, res: Response) => {
    try {
        const cursos = await cursoService.getAllCursos();
        return res.status(201).json({ cursos });
    } catch (error) {
        Logger.error("Erro ao buscar curso", error);
        return res.status(500).json({ error: "Erro ao buscar curso" });
    }
}

export const updateCurso = async (req: Request, res: Response) => {
    try {
        const { id, curriculoId } = req.params;
        await cursoService.updateCurso(Number(id), Number(curriculoId), req.body);
        return res.status(201).json({ 'status': 'success', 'message': 'curso atualizado com sucesso!' });
    } catch (error) {
        Logger.error("Erro ao atualizar curso", error);
        return res.status(500).json({ error: "Erro ao atualizar curso" });
    }
}

export const deleteCurso = async (req: Request, res: Response) => {
    try {
        const { id, curriculoId } = req.params;
        await cursoService.deleteCurso(Number(id), Number(curriculoId));
        return res.status(201).json({ 'status': 'success', 'message': 'curso deletado com sucesso!' });
    } catch (error) {
        Logger.error("Erro ao deletar curso", error);
        return res.status(500).json({ error: "Erro ao deletar curso" });
    }
}