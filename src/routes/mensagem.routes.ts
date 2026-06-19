import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import * as m from '../controllers/mensagem.controller';
import { validateSchema } from '../middleware/validate.middlware';
import * as ms from '../schemas/mensagem.schema';


const router = Router();

router.use(authenticate);
/**
 * @openapi
 * /mensagem:
 *   post:
 *     summary: Envia uma nova mensagem para destinario
 *     tags:
 *       - Mensagem
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *             schema:
 *              type: object
 *              properties:
 *                  conteudo:
 *                     type: string
 *                     example: "Bom dia!"
 *                  destinatarioId:
 *                     type: integer
 *                     example: 2
 * 
 *     responses:
 *       201:
 *         description: Habilidade atualizada com sucesso!
 *       400:
 *        description: Entrada Inválida do usuario!
 *       404:
 *         description: Destinatario não encontrada.
 *       401:
 *         description: Token de autenticação não fornecido no cabeçalho.
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post('/', validateSchema(ms.createMensagemSchema), m.createMensagem);

/**
 * @openapi
 * /mensagem:
 *   get:
 *     summary: Exibir todas as mensagens de um usuário para o outro
 *     tags:
 *       - Mensagem
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Habilidade atualizada com sucesso!
 *       400:
 *        description: Entrada Inválida do usuario!
 *       404:
 *         description: Destinatario não encontrada.
 *       401:
 *         description: Token de autenticação não fornecido no cabeçalho.
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/', m.getAllMensagens);

/**
 * @openapi
 * /mensagem/{id}:
 *   get:
 *     summary: Exibir uma mensagem específica
 *     tags:
 *       - Mensagem
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da mensagem a ser exibida.
 *         schema:
 *            type: integer
 *            example: 2
 *       - in: query
 *         name: destinatarioId
 *         required: true
 *         description: ID do destinatario.
 *         schema:
 *            type: integer
 *            example: 2
 *     responses:
 *       200:
 *         description: Mensagem exibida com sucesso!
 *       404:
 *         description: Mensagem não encontrada.
 *       401:
 *         description: Token de autenticação não fornecido no cabeçalho.
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/:id', m.getMensagemById);
/**
 * @openapi
 * /mensagem/{id}:
 *   patch:
 *     summary: Atualiza uma mensagem existente
 *     tags:
 *       - Mensagem
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da mensagem a ser atualizada.
 *         schema:
 *            type: integer
 *            example: 1
 *       - in: query
 *         name: destinatarioId
 *         required: true
 *         description: ID do destinatario.
 *         schema:
 *            type: integer
 *            example: 2
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               conteudo:
 *                 type: string
 *                 example: "Atualizado"
 *               lida:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Mensagem atualizada com sucesso!
 *       404:
 *         description: Mensagem não encontrada.
 *       401:
 *         description: Token de autenticação não fornecido no cabeçalho.
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.patch('/:id', validateSchema(ms.updateMensagemSchema), m.updateMensagem);

/**
 * @openapi
 * /mensagem/{id}:
 *   delete:
 *     summary: Deleta uma mensagem específica
 *     tags:
 *       - Mensagem
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da mensagem a ser deletada.
 *         schema:
 *            type: integer
 *            example: 1
 *       - in: query
 *         name: destinatarioId
 *         required: true
 *         description: ID do destinatario.
 *         schema:
 *            type: integer
 *            example: 2
 *     responses:
 *       200:
 *         description: Mensagem deletada com sucesso!
 *       404:
 *         description: Mensagem não encontrada.
 *       401:
 *         description: Token de autenticação não fornecido no cabeçalho.
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.delete('/:id', m.deleteMensagem);

export default router;
