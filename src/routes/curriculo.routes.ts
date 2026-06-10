import { Router } from 'express';
import { createCurriculo, getCurriculoById, getAllCurriculos, updateCurriculo, deleteCurriculo } from '../controllers/curriculo.controller';
import { authenticate } from '../middleware/auth.middleware';
import { validateSchema } from '../middleware/validate.middlware';
import { curriculoCreateSchema, curriculoUpdateSchema } from '../schemas/curriculo.schema';

const router = Router();
router.use(authenticate);

/**
 * @openapi
 * /curriculo:
 *   post:
 *     summary: Cria um novo currículo para o usuário autenticado.
 *     tags:
 *       - Currículo
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 description: ID do usuário associado ao currículo.
 *               objetivo:
 *                 type: string
 *                 description: Objetivo do currículo.
 *               experiencias:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     nomeEmpresa:
 *                       type: string
 *                     dataInicio:
 *                       type: string
 *                       format: date
 *                     dataFim:
 *                       type: string
 *                       format: date
 *                     status:
 *                       type: string
 *                       enum: [ATIVO, INATIVO]
 *                     curriculoId:
 *                       type: integer
 *               cursos:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     nomeCurso:
 *                       type: string
 *                     tipo:
 *                       type: string
 *                       enum: [BACHARELADO, TECNÓLOGO, LICENCIATURA, TÉCNICOS, CURSO_LIVRE, OUTROS]
 *                     instituicao:
 *                       type: string
 *                     dataInicio:
 *                       type: string
 *                       format: date
 *                     dataFim:
 *                       type: string
 *                       format: date
 *                     status:
 *                       type: string
 *                       enum: [EM_ANDAMENTO, CONCLUIDO, INTERROMPIDO]
 *                     curriculoId:
 *                       type: integer
 *               habilidades:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     nome:
 *                       type: string
 *     responses:
 *       201:
 *         description: Currículo criado com sucesso.
 *       400:
 *         description: Entrada inválida do usuário.
 *       500:
 *         description: Erro ao criar currículo.
 */
router.post('/', validateSchema(curriculoCreateSchema), createCurriculo);
router.get('/:id', getCurriculoById);
router.get('/', getAllCurriculos);
router.patch('/:id', validateSchema(curriculoUpdateSchema), updateCurriculo);
router.delete('/:id', deleteCurriculo);

export default router;