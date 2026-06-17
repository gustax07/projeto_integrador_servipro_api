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
 *                  destinarioId:
 *                     type: integer
 *                     example: 2
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
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post('/', validateSchema(ms.createMensagemSchema), m.createMensagem);
router.get('/', m.getAllMensagens);
router.get('/:id', m.getMensagemById);
router.patch('/:id', validateSchema(ms.updateMensagemSchema), m.updateMensagem);
router.delete('/:id', m.deleteMensagem);

export default router;
