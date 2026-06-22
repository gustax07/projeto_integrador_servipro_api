import { Response, Request } from "express";
import * as habilidadeService from '../services/habilidade.service';

export const createHabilidade = async (req: Request, res: Response) => {
    await habilidadeService.createHabilidade(req.body);
    return res.status(201).json({ 'status': 'success', 'message': 'habilidade criada com sucesso!' });
}

export const getHabilidadeById = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) { return res.status(404).json({ error: "ID de Habilidade não encontrado." }); }
    const habilidade = await habilidadeService.getHabilidadeById(Number(id));
    return res.status(201).json({ habilidade });
}

export const getAllHabilidades = async (req: Request, res: Response) => {
    const habilidades = await habilidadeService.getAllHabilidades();
    return res.status(201).json({ habilidades });
}

export const updateHabilidade = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) { return res.status(404).json({ error: "ID de Habilidade não encontrado." }); }
    await habilidadeService.updateHabilidade(Number(id), req.body);
    return res.status(201).json({ 'status': 'success', 'message': 'habilidade atualizada com sucesso!' });
}

export const deleteHabilidade = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) { return res.status(404).json({ error: "ID de Habilidade não encontrado." }); }
    await habilidadeService.deleteHabilidade(Number(id));
    return res.status(201).json({ 'status': 'success', 'message': 'habilidade deletado com sucesso!' });
}