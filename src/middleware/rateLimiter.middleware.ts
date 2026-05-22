import rateLimit from 'express-rate-limit';
import Logger from '../config/logger';

// Permite 100 requisições a cada 15 minutos por IP
export const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos em milissegundos
    max: 100, // Limite de 100 requisições por IP
    message: { error: "Tráfego intenso detectado. Tente novamente em 15 minutos." },
    standardHeaders: true, // Retorna os limites nos cabeçalhos `RateLimit-*`
    legacyHeaders: false, // Desabilita os cabeçalhos antigos `X-RateLimit-*`
    handler: (req, res, next, options) => {
        Logger.warn(`Rate Limit Global atingido pelo IP: ${req.ip}`);
        res.status(options.statusCode).json(options.message);
    }
});

// Permite apenas 5 tentativas de login a cada 15 minutos por IP
export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 5, // Apenas 5 tentativas
    message: { error: "Muitas tentativas de login falhas. Conta bloqueada temporariamente por 15 minutos." },
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res, next, options) => {
        Logger.error(`Alerta de Segurança: Força bruta de login bloqueada do IP: ${req.ip}`);
        res.status(options.statusCode).json(options.message);
    }
});