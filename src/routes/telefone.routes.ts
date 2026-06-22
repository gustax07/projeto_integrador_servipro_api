import { Router } from "express";
import * as telefoneController from '../controllers/telefone.controller';
import { authenticate } from '../middleware/auth.middleware';
import { validateSchema } from "../middleware/validate.middlware";
import * as st from '../schemas/telefone.schema';
const router = Router();

router.use(authenticate);

/**
 * @openapi
 * /telefone:
 *   post:
 *     summary: Adiciona um novo telefone ao usuário
 *     tags:
 *       - Telefone
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *             schema:
 *              type: object
 *              properties:
 *                  numero:
 *                     type: integer
 *                     example: 999999999
 *                  ddd:
 *                     type: integer
 *                     example: 11
 * 
 *     responses:
 *       201:
 *         description: Telefone criado com sucesso!
 *       400:
 *        description: Entrada Inválida do usuario!
 *       404:
 *         description: Telefone não encontrado.
 *       401:
 *         description: Token de autenticação não fornecido no cabeçalho.
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post('/', validateSchema(st.createTelefoneSchema), telefoneController.createTelefone);

/**
 * @openapi
 * /telefone/{id}:
 *   get:
 *     summary: Recupera um telefone pelo ID
 *     tags:
 *       - Telefone
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do telefone a ser recuperado
 *     responses:
 *       200:
 *         description: Telefone recuperado com sucesso!
 *       401:
 *         description: Token de autenticação não fornecido no cabeçalho.
 *       404:
 *         description: Telefone não encontrado.
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/:id', telefoneController.getTelefoneById);

/**
 * @openapi
 * /telefone:
 *   get:
 *     summary: Recupera todos os telefones do usuário
 *     tags:
 *       - Telefone
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *         description: Número da página
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *         description: Limite de resultados por página
 *     responses:
 *       200:
 *         description: Telefones recuperados com sucesso!
 *       401:
 *         description: Token de autenticação não fornecido no cabeçalho.
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/', telefoneController.getAllTelefones);

/**
 * @openapi
 * /telefone/{id}:
 *   put:
 *     summary: Atualiza um telefone
 *     tags:
 *       - Telefone
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do telefone a ser atualizado
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *             schema:
 *              type: object
 *              properties:
 *                  numero:
 *                     type: integer
 *                     example: 999999999
 *                  ddd:
 *                     type: integer
 *                     example: 11
 * 
 *     responses:
 *       200:
 *         description: Telefone atualizado com sucesso!
 *       400:
 *        description: Entrada Inválida do usuario!
 *       404:
 *         description: Telefone não encontrado.
 *       401:
 *         description: Token de autenticação não fornecido no cabeçalho.
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.put('/:id', validateSchema(st.updateTelefoneSchema), telefoneController.updateTelefone);

/**
 * @openapi
 * /telefone/{id}:
 *   delete:
 *     summary: Deleta um telefone
 *     tags:
 *       - Telefone
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do telefone a ser deletado
 *     responses:
 *       200:
 *         description: Telefone deletado com sucesso!
 *       401:
 *         description: Token de autenticação não fornecido no cabeçalho.
 *       404:
 *         description: Telefone não encontrado.
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.delete('/:id', telefoneController.deleteTelefone);

export default router;