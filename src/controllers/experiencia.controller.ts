import { Response, Request } from "express";
import * as experienciaService from '../services/experiencia.service';

export const createExperiencia = async (req: Request, res: Response) => {
    await experienciaService.createExperiencia(req.body);
    return res.status(201).json({ 'status': 'success', 'message': 'experiencia criada com sucesso!' });
}

export const getExperienciaById = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) return res.status(404).json({ error: "ID de Experiencia não encontrado." });
    const experiencia = await experienciaService.getExperienciaById(Number(id));
    return res.status(201).json({ experiencia });
}

export const getAllExperiencias = async (req: Request, res: Response) => {
    const experiencias = await experienciaService.getAllExperiencias();
    return res.status(201).json({ experiencias });

}

export const updateExperiencia = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { curriculoId } = req.query;
    if (!id) { return res.status(404).json({ error: "ID de Experiencia não encontrado." }); }
    if (!curriculoId) { return res.status(404).json({ error: "Curriculo não encontrado." }); }
    await experienciaService.updateExperiencia(Number(id), Number(curriculoId), req.body);
    return res.status(201).json({ 'status': 'success', 'message': 'experiencia atualizada com sucesso!' });
}

export const deleteExperiencia = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { curriculoId } = req.query;
    if (!id) { return res.status(404).json({ error: "ID de Experiencia não encontrado." }); }
    if (!curriculoId) { return res.status(404).json({ error: "Curriculo não encontrado." }); }
    await experienciaService.deleteExperiencia(Number(id), Number(curriculoId));
    return res.status(201).json({ 'status': 'success', 'message': 'experiencia deletada com sucesso!' });
}