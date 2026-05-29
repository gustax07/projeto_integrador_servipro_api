import { Response, Request } from "express";
import * as enderecoService from '../services/endereco.service';
import Logger from "../config/logger";
import { number } from "zod";

export const createEndereco = async (req: Request, res: Response) => {
    try {
        await enderecoService.createEndereco(req.body);
        return res.status(201).json({ 'status': 'success', 'message': 'endereco criado com sucesso!' });
    } catch (error) {
        Logger.error("Erro ao criar endereco", error);
        return res.status(500).json({ error: "Erro ao criar endereco" });
    }
}

export const getEnderecoById = async (req: Request, res: Response) => {
    try {
        const { id, userId } = req.params;
        const endereco = await enderecoService.getEnderecoById(Number(id), Number(userId));
        return res.status(200).json({ endereco });
    } catch (error) {
        Logger.error("Erro ao buscar endereco", error);
        return res.status(500).json({ error: "Erro ao buscar endereco" });
    }
}

export const getAllEnderecos = async (req: Request, res: Response) => {
    try {
        const enderecos = await enderecoService.getAllEnderecos();
        return res.status(200).json({ enderecos });
    } catch (error) {
        Logger.error("Erro ao buscar enderecos", error);
        return res.status(500).json({ error: "Erro ao buscar enderecos" });
    }
}

export const updateEndereco = async (req: Request, res: Response) => {
    try {
        const { id, userId } = req.params;
        await enderecoService.updateEndereco(Number(id), Number(userId), req.body);
        return res.status(200).json({ 'status': 'success', 'message': 'endereco atualizado com sucesso!' });
    } catch (error) {
        Logger.error("Erro ao atualizar endereco", error);
        return res.status(500).json({ error: "Erro ao atualizar endereco" });
    }
}

export const deleteEndereco = async (req: Request, res: Response) => {
    try {
        const { id, userId } = req.params;
        await enderecoService.deleteEndereco(Number(id), Number(userId));
        return res.status(200).json({ 'status': 'success', 'message': 'endereco deletado com sucesso!' });
    } catch (error) {
        Logger.error("Erro ao deletar endereco", error);
        return res.status(500).json({ error: "Erro ao deletar endereco" });
    }
}