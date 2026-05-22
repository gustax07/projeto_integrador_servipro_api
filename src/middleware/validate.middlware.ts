import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod'; 
import Logger from '../config/logger';

export const validateSchema = (schema: ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        
        const resultado = schema.safeParse(req.body);

        if (!resultado.success) {
            const errosFormatados = resultado.error.flatten().fieldErrors;

            Logger.warn(`Tentativa de requisição inválida em ${req.url}`);
            
            return res.status(400).json({ 
                success: false, 
                erros: errosFormatados 
            });
        }
        next(); 
    };
};