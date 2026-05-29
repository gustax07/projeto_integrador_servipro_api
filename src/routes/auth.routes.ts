import { Router } from "express";
import { login } from "../controllers/auth.controller";
import { authLimiter } from '../middleware/rateLimiter.middleware';

const router = Router();
/**
 * @openapi
 * /login:
 *   post:
 *     summary: Retorna o token do usuario com ID dele salvo dentro por 24 horas
 *     tags:
 *       - Auth
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *             schema:
 *              type: object
 *              properties:
 *                  email:
 *                    type: string
 *                    example: "gustavo@gmail.com"
 *                  senha:
 *                    type: string
 *                    example: 123456
 *     responses:
 *       200:
 *         description: Sucesso ao retornar o token.
 *       500:
 *         description: Senha ou email inválidos!
 */
router.post('/', authLimiter, login);

export default router;
