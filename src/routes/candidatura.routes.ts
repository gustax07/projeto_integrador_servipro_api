import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { createCandidatura, getCandidaturaById, getAllCandidaturas, updateCandidatura, deleteCandidatura } from '../controllers/candidatura.controller';
import { validateSchema } from '../middleware/validate.middlware';
import { createCandidaturaSchema, updateCandidaturaSchema } from '../schemas/candidatura.schema';

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
 *         description: Candidatura criada com sucesso!
 *       400:
 *         description: Entrada Inválida do usuario ou candidatura já existe!
 *       404:
 *         description: Serviço ou Usuário não encontrado
 *       500:
 *         description: erro ao criar usuário
 */
router.post('/', validateSchema(createCandidaturaSchema), createCandidatura);

/**
 * @openapi
 * /candidatura/{id}:
 *   get:
 *     summary: Exibir a candidatura pelo ID
 *     tags:
 *       - Candidatura
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID Numerico para buscar uma candidatura
 *         schema:
 *            type: integer
 *            example: 1
 *     responses:
 *       200:
 *         description: Mostrar a candidatura pelo ID
 *       401:
 *         description: Token de autenticação não fornecido no cabeçalho.
 *       404:
 *         description: candidatura não encontrado.
 *       500:
 *         description: Erro ao editar serviço.
 */
router.get('/:id', getCandidaturaById);

/**
 * @openapi
 * /candidatura/{id}:
 *   patch:
 *     summary: Editar uma candidatura que o usuario candidatou-se no serviço
 *     tags:
 *       - Candidatura
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID Numerico para editar um candidatura
 *         schema:
 *            type: integer
 *            example: 1
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *             schema:
 *              type: object
 *              properties:
 *                  status:
 *                     type: string
 *                     example: "Em Análise"
 *     responses:
 *       200:
 *         description: Status da candidatura alterada com sucesso!
 *       400:
 *         description: Entrada Inválida do usuario!
 *       500:
 *         description: erro ao criar usuário
*/
router.patch('/:id', validateSchema(updateCandidaturaSchema), updateCandidatura);


/**
 * @openapi
 * /candidatura:
 *   get:
 *     summary: Exibir todas as candidatura
 *     tags:
 *       - Candidatura
 *     security:
 *       - bearerAuth: []   
 *     responses:
 *       200:
 *         description: Mostrar a candidatura pelo ID
 *       401:
 *         description: Token de autenticação não fornecido no cabeçalho.
 *       404:
 *         description: candidatura não encontrado.
 *       500:
 *         description: Erro ao editar serviço.
 */
router.get('/', getAllCandidaturas);

/**
 * @openapi
 * /candidatura/{id}:
 *   delete:
 *     summary: Apagar a candidatura pelo ID
 *     tags:
 *       - Candidatura
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID Numerico para Apagar uma candidatura
 *         schema:
 *            type: integer
 *            example: 1
 *     responses:
 *       200:
 *         description: Apagar a candidatura pelo ID
 *       401:
 *         description: Token de autenticação não fornecido no cabeçalho.
 *       404:
 *         description: candidatura não encontrado.
 *       500:
 *         description: Erro ao editar serviço.
 */
router.delete('/:id', deleteCandidatura);
export default router;
