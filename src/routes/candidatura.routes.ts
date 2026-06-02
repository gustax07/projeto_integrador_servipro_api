import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { createCandidatura} from '../controllers/candidatura.controller';
import { validateSchema } from '../middleware/validate.middlware';
import { createCandidaturaSchema } from '../schemas/candidatura.schema';

const router = Router();

router.use(authenticate);
/**
 * @openapi
 * /candidatura:
 *   post:
 *     summary: Adicionar uma candidatura que o usuario candidatou-se no serviço
 *     tags:
 *       - Candidatura
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *             schema:
 *              type: object
 *              properties:
 *                  status:
 *                     type: string
 *                     example: "Pendente"
 *                  servicoId:
 *                      type: integer
 *                      example: 1
 *                  userId:
 *                      type: integer
 *                      example: 1
 *     responses:
 *       200:
 *         description: Conta criada com sucesso!
 *       400:
 *         description: Entrada Inválida do usuario!
 *       500:
 *         description: erro ao criar usuário
 */
router.post('/', validateSchema(createCandidaturaSchema), createCandidatura);

export default router;
