import { Response, Request } from "express";
import * as setorService from '../services/setor.service';
import Logger from "../config/logger";

export const createSetor = async (req: Request, res: Response) => {
    try {
        await setorService.createSetor(req.body);
        return res.status(201).json({ 'status': 'success', 'message': 'setor criado com sucesso!' });
    } catch (error: any) {
        Logger.error("Erro ao criar setor", error);
        if (error.message === 'Já existe um setor com este nome.') {
            return res.status(400).json({ error: "Já existe um setor com este nome." });
        }
        return res.status(500).json({ error: "Erro ao criar setor" });
    }
}

export const getSetorById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const setor = await setorService.getSetorById(Number(id));
        return res.status(200).json({ setor });
    } catch (error: any) {
        Logger.error("Erro ao buscar setor", error);
        if (error.message === 'Setor nao encontrado.') {
            return res.status(404).json({ error: "Setor nao encontrado." });
        }
        return res.status(500).json({ error: "Erro ao buscar setor" });
    }
}

export const getAllSetores = async (req: Request, res: Response) => {
    try {
        const setores = await setorService.getAllSetores();
        return res.status(200).json({ setores });
    } catch (error: any) {
        Logger.error("Erro ao buscar setores", error);
        if (error.message === 'Nenhum setor encontrado') {
            return res.status(404).json({ error: error.message});
        }
        return res.status(500).json({ error: "Erro ao buscar setores" });
    }
}

export const updateSetor = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await setorService.updateSetor(Number(id), req.body);
        return res.status(200).json({ 'status': 'success', 'message': 'setor atualizado com sucesso!' });
    } catch (error: any) {
        Logger.error("Erro ao atualizar setor", error);
        if (error.message === 'Setor não encontrado para atualização.') {
            return res.status(404).json({ error: "Setor não encontrado para atualização." });
        }
        return res.status(500).json({ error: "Erro ao atualizar setor" });
    }
}

export const deleteSetor = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await setorService.deleteSetor(Number(id));
        return res.status(200).json({ 'status': 'success', 'message': 'setor deletado com sucesso!' });
    } catch (error: any) {
        Logger.error("Erro ao deletar setor", error);
        if (error.message === 'Tentativa de deletar um setor que não existe') {
            return res.status(404).json({ error: "Tentativa de deletar um setor que não existe." });
        }
        return res.status(500).json({ error: "Erro ao deletar setor" });
    }
}