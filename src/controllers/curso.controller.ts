import { Response, Request } from "express";
import * as cursoService from '../services/curso.service';

export const createCurso = async (req: Request, res: Response) => {
    await cursoService.createCurso(req.body);
    return res.status(201).json({ 'status': 'success', 'message': 'curso criado com sucesso!' });
}

export const getCursoById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { curriculoId } = req.query;
    if (!curriculoId) { return res.status(400).json({ 'status': 'error', 'message': 'Curriculo ID é obrigatório.' }); }
    if (!id) { return res.status(400).json({ 'status': 'error', 'message': 'Curso ID é obrigatório.' }); }
    const curso = await cursoService.getCursoById(Number(id), Number(curriculoId));
    return res.status(201).json({ curso });
}

export const getAllCursos = async (req: Request, res: Response) => {
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 20;
    const cursos = await cursoService.getAllCursos(page, limit);
    return res.status(200).json({ cursos });
}

export const updateCurso = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { curriculoId } = req.query;
    if (!curriculoId) { return res.status(400).json({ 'status': 'error', 'message': 'Curriculo ID é obrigatório.' }); }
    if (!id) { return res.status(400).json({ 'status': 'error', 'message': 'Curso ID é obrigatório.' }); }
    await cursoService.updateCurso(Number(id), Number(curriculoId), req.body);
    return res.status(201).json({ 'status': 'success', 'message': 'curso atualizado com sucesso!' });
}

export const deleteCurso = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { curriculoId } = req.query;
    if (!curriculoId) { return res.status(400).json({ 'status': 'error', 'message': 'Curriculo ID é obrigatório.' }); }
    if (!id) { return res.status(400).json({ 'status': 'error', 'message': 'Curso ID é obrigatório.' }); }
    await cursoService.deleteCurso(Number(id), Number(curriculoId));
    return res.status(201).json({ 'status': 'success', 'message': 'curso deletado com sucesso!' });
}