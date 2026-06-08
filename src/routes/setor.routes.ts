import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { createSetor, updateSetor, getAllSetores, getSetorById, deleteSetor } from "../controllers/setor.controller";
import { validateSchema } from "../middleware/validate.middlware";
import { createSetorSchema, updateSetorSchema } from "../schemas/setor.schema";

const router = Router();

router.use(authenticate);
/**
 * @openapi
 * /setor:
 *   post:
 *     summary: Adiciona um novo setor ao sistema
 *     tags:
 *       - Setor
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
 *                     example: "Recursos Humanos"
 *     responses:
 *       200:
 *         description: Setor Adicionado com Sucesso!
 *       400:
 *         description: Entrada Inválida do usuario!
 *       401:
 *         description: Token de autenticação não fornecido.
 *       500:
 *         description: erro ao criar um setor
 */
router.post('/', validateSchema(createSetorSchema), createSetor);


/**
 * @openapi
 * /setor/{id}:
 *   patch:
 *     summary: Editar Setor pelo ID
 *     tags:
 *       - Setor
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *             schema:
 *              type: object
 *              properties:
 *                  nome:
 *                    type: string
 *                    example: "Financeiro"
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID Numerico para buscar o usuario
 *         schema:
 *            type: integer
 *            example: 1
 *     responses:
 *       200:
 *         description: Alteração de dados 
 *       400:
 *          description: Entrada do usuario Invalido
 *       401:
 *         description: Token de autenticação não fornecido no cabeçalho.
 *       404:
 *         description: Setor não encontrado.
 *       500:
 *         description: Erro ao editar setor.
 */
router.patch('/:id', validateSchema(updateSetorSchema), updateSetor);


/**
 * @openapi
 * /setor/:
 *   get:
 *     summary: Mostrar todos setores criados
 *     tags:
 *       - Setor
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Trazer todos os setores com limite de 20 colunas
 *       401:
 *         description: Token de autenticação não fornecido no cabeçalho.
 *       404:
 *         description: Nenhum setor encontrado
 *       500:
 *         description: Erro ao editar setor.
 */
router.get('/', getAllSetores);

/**
 * @openapi
 * /setor/{id}:
 *   get:
 *     summary: Mostrar o setor pelo o ID especificado na URL
 *     tags:
 *       - Setor
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID Numerico para buscar o usuario
 *         schema:
 *            type: integer
 *            example: 1
 *     responses:
 *       200:
 *         description: Trazer todos os setores com limite de 20 colunas
 *       401:
 *         description: Token de autenticação não fornecido no cabeçalho.
 *       404:
 *         description: Nenhum setor encontrado
 *       500:
 *         description: Erro ao editar setor.
 */
router.get('/:id', getSetorById);

/**
 * @openapi
 * /setor/{id}:
 *   delete:
 *     summary: Excluir o setor pelo o ID especificado na URL
 *     tags:
 *       - Setor
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID Numerico para buscar o usuario
 *         schema:
 *            type: integer
 *            example: 1
 *     responses:
 *       200:
 *         description: Excluir o Setor
 *       401:
 *         description: Token de autenticação não fornecido no cabeçalho.
 *       404:
 *         description: Nenhum setor encontrado
 *       500:
 *         description: Erro ao editar setor.
 */
router.delete('/:id', deleteSetor);

export default router;