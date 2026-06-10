import { Router } from "express";
import { createHabilidade, getHabilidadeById, getAllHabilidades, updateHabilidade, deleteHabilidade } from '../controllers/habilidade.controller';
import { validateSchema } from "../middleware/validate.middlware";
import { HabilidadeCreateSchema, HabilidadeUpdateSchema } from "../schemas/habilidade.schema";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.use(authenticate);
/**
 * @openapi
 * /habilidade:
 *   post:
 *     summary: Adiciona uma nova habilidade ao sistema.
 *     tags:
 *       - Habilidade
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *             schema:
 *              type: object
 *              properties:
 *                  nome:
 *                     type: string
 *                     example: "Proatividade"
 *     responses:
 *       201:
 *         description: Habilidade criada com sucesso!
 *       400:
 *         description: Entrada Inválida do usuario!
 *       404:
 *         description: Habilidade já existente.
 *       401:
 *         description: Token de autenticação não fornecido no cabeçalho.
 *       500:
 *         description: Erro interno do servidor.
 */
router.post('/', validateSchema(HabilidadeCreateSchema), createHabilidade);
/**
 * @openapi
 * /habilidade:
 *   get:
 *     summary: Recupera uma lista de todas as habilidades cadastradas no sistema, com suporte para paginação.
 *     tags:
 *       - Habilidade
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Lista de habilidades recuperada com sucesso!
 *       404:
 *         description: Habilidade já existente.
 *       401:
 *         description: Token de autenticação não fornecido no cabeçalho.
 *       500:
 *         description: Erro interno do servidor.
 */
router.get('/', getAllHabilidades);
/**
 * @openapi
 * /habilidade/{id}:
 *   get:
 *     summary: Recupera os detalhes de uma habilidade específica usando seu ID único.
 *     tags:
 *       - Habilidade
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da habilidade a ser recuperada.
 *         schema:
 *            type: integer
 *            example: 1
 *     responses:
 *       201:
 *         description: Habilidade recuperada com sucesso!
 *       404:
 *         description: Habilidade não encontrada.
 *       401:
 *         description: Token de autenticação não fornecido no cabeçalho.
 *       500:
 *         description: Erro interno do servidor.
 */
router.get('/:id', getHabilidadeById);

/**
 * @openapi
 * /habilidade/{id}:
 *   patch:
 *     summary: Atualiza os detalhes de uma habilidade existente usando seu ID único.
 *     tags:
 *       - Habilidade
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da habilidade a ser atualizada.
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
 *                  nome:
 *                     type: string
 *                     example: "Boa comunicação"
 *     responses:
 *       201:
 *         description: Habilidade atualizada com sucesso!
 *       400:
 *        description: Entrada Inválida do usuario!
 *       404:
 *         description: Habilidade não encontrada.
 *       401:
 *         description: Token de autenticação não fornecido no cabeçalho.
 *       500:
 *         description: Erro interno do servidor.
 */
router.patch('/:id', validateSchema(HabilidadeUpdateSchema), updateHabilidade);

/**
 * @openapi
 * /habilidade/{id}:
 *   delete:
 *     summary: Remove uma habilidade do sistema usando seu ID único.
 *     tags:
 *       - Habilidade
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da habilidade a ser deletada.
 *         schema:
 *            type: integer
 *            example: 1
 *     responses:
 *       201:
 *         description: Habilidade deletada com sucesso!
 *       404:
 *         description: Habilidade não encontrada.
 *       401:
 *         description: Token de autenticação não fornecido no cabeçalho.
 *       500:
 *         description: Erro interno do servidor.
 */
router.delete('/:id', deleteHabilidade);

export default router;