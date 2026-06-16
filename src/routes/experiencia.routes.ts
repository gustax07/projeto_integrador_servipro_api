import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import * as e from '../controllers/experiencia.controller';
import { experienciaCreateSchema, experienciaUpdateSchema } from '../schemas/experiencia.schema';
import { validateSchema } from '../middleware/validate.middlware';

const router = Router();

router.use(authenticate);

/**
 * @openapi
 * /experiencia:
 *   post:
 *     summary: Criar uma experiencia
 *     tags:
 *       - Experiencia
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *             schema:
 *              type: object
 *              properties:
 *                  nomeEmpresa:
 *                      type: string
 *                      example: "FarmConde"
 *                  dataInicio:
 *                      type: string
 *                      example: "2024/02/02"
 *                  dataFim:
 *                      type: string
 *                      example: "2025/09/12"
 *                  status:
 *                      type: string
 *                      enum: ['CONCLUIDO', 'ATUAL']
 *                      example: "CONCLUIDO"
 *                  curriculoId:
 *                      type: integer
 *                      example: 1
 *     responses:
 *       201:
 *         description: Experiencia Criado com Sucesso!
 *       401:
 *         description: Token de autenticação não fornecido no cabeçalho.
 *       404:
 *         description: Curriculo não encontrado ou não existe.
 *       500:
 *         description: Erro interno do servidor.
 */
router.post('/', validateSchema(experienciaCreateSchema), e.createExperiencia);

/**
 * @openapi
 * /experiencia/{id}:
 *   get:
 *     summary: Procurar por uma experiencia pelo ID.
 *     tags:
 *       - Experiencia
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Buscar pela experiencia pelo ID numerico
 *         schema:
 *            type: integer
 *            example: 1
 *     responses:
 *       201:
 *         description: Exibir a experiencia.
 *       401:
 *         description: Token de autenticação não fornecido no cabeçalho.
 *       404:
 *         description: Experiencia não encontrado ou não existe.
 *       500:
 *         description: Erro interno do servidor.
 */
router.get('/:id', e.getExperienciaById);

/**
 * @openapi
 * /experiencia:
 *   get:
 *     summary: Exibir todas experiencias.
 *     tags:
 *       - Experiencia
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Exibir todas as experiencias.
 *       401:
 *         description: Token de autenticação não fornecido no cabeçalho.
 *       404:
 *         description: Nenhuma experiencia encontrada.
 *       500:
 *         description: Erro interno do servidor.
 */
router.get('/', e.getAllExperiencias);

/**
 * @openapi
 * /experiencia/{id}:
 *   patch:
 *     summary: Editar uma experiencia pelo ID.
 *     tags:
 *       - Experiencia
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *             schema:
 *              type: object
 *              properties:
 *                  nomeEmpresa:
 *                      type: string
 *                      example: "Fazendo do seu Zé"
 *                  dataInicio:
 *                      type: string
 *                      example: "2023/01/01"
 *                  status:
 *                      type: string
 *                      enum: ['CONCLUIDO', 'ATUAL']
 *                      example: "ATUAL"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID Numerico da experiencia.
 *         schema:
 *            type: integer
 *            example: 1
 *       - in: query
 *         name: curriculoId
 *         required: true
 *         description: ID Numerico do Curriculo.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       201:
 *         description: Experiencia Editada com Sucesso!
 *       401:
 *         description: Token de autenticação não fornecido no cabeçalho.
 *       404:
 *         description: Experiencia/Curriculo não encontrado ou não existe.
 *       500:
 *         description: Erro interno do servidor.
 */
router.patch('/:id', validateSchema(experienciaUpdateSchema), e.updateExperiencia);

/**
* @openapi
 * /experiencia/{id}:
 *   delete:
 *     summary: Apagar a experiencia pelo ID.
 *     tags:
 *       - Experiencia
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Apagar a experiencia pelo ID numerico.
 *         schema:
 *            type: integer
 *            example: 1
 *       - in: path
 *         name: curriculoId
 *         required: true
 *         description: ID Numerico do Curriculo.
 *         schema:
 *            type: integer
 *            example: 1
 *     responses:
 *       201:
 *         description: Experiencia deletada com sucesso!
 *       401:
 *         description: Token de autenticação não fornecido no cabeçalho.
 *       404:
 *         description: Experiencia não encontrado ou não existe.
 *       500:
 *         description: Erro interno do servidor.
 */
router.delete('/:id/:curriculoId', e.deleteExperiencia);

export default router;