import { Response, Request } from "express";
import * as curriculoHabilidadeService from '../services/curriculohabilidade.service';
import Logger from "../config/logger";

export const createCurriculoHabilidade = async (req: Request, res: Response) => {
    try {
        await curriculoHabilidadeService.createCurriculoHabilidade(req.body);
        return res.status(201).json({ 'status': 'success', 'message': 'curriculohabilidade criado com sucesso!' });
    } catch (error) {
        Logger.error("Erro ao criar curriculohabilidade", error);
        return res.status(500).json({ error: "Erro ao criar curriculohabilidade" });
    }
}

export const getCurriculoHabilidadeById = async (req: Request, res: Response) => {
    try {
        const { habilidadeId, curriculoId } = req.params;
        const curriculoHabilidade = await curriculoHabilidadeService.getCurriculoHabilidadeById(Number(habilidadeId), Number(curriculoId));
        return res.status(200).json({ curriculoHabilidade });
    } catch (error) {
        Logger.error("Erro ao buscar curriculohabilidade", error);
        return res.status(500).json({ error: "Erro ao buscar curriculohabilidade" });
    }
}

export const getAllCurriculoHabilidades = async (req: Request, res: Response) => {
    try {
        const curriculoHabilidades = await curriculoHabilidadeService.getAllCurriculoHabilidades();
        return res.status(200).json({ curriculoHabilidades });
    } catch (error) {
        Logger.error("Erro ao buscar curriculoHabilidades", error);
        return res.status(500).json({ error: "Erro ao buscar curriculoHabilidades" });
    }
}

export const updateCurriculoHabilidade = async (req: Request, res: Response) => {
    try {
        const { habilidadeId, curriculoId } = req.params;
        await curriculoHabilidadeService.updateCurriculoHabilidade(Number(habilidadeId), Number(curriculoId), req.body);
        return res.status(201).json({ 'status': 'success', 'message': 'curriculohabilidade atualizado com sucesso!' });
    } catch (error) {
        Logger.error("Erro ao atualizar curriculohabilidade", error);
        return res.status(500).json({ error: "Erro ao atualizar curriculohabilidade" });
    }
}

export const deleteCurriculoHabilidade = async (req: Request, res: Response) => {
    try {
        const { habilidadeId, curriculoId } = req.params;
        await curriculoHabilidadeService.deleteCurriculoHabilidade(Number(habilidadeId), Number(curriculoId));
        return res.status(201).json({ 'status': 'success', 'message': 'curriculohabilidade deletado com sucesso!' });
    } catch (error) {
        Logger.error("Erro ao deletar curriculohabilidade", error);
        return res.status(500).json({ error: "Erro ao deletar curriculohabilidade" });
    }
}