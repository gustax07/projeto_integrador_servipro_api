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
 *                       example: "2026-06-11T16:45:00Z"
 *                     dataFim:
 *                       type: string
 *                       format: date
 *                       example: "2026-06-11T16:45:00Z"      
 *                     status:
 *                       type: string
 *                       enum: [ATIVO, INATIVO]
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
 *                       example: "2026-06-11T16:45:00Z"
 *                     dataFim:
 *                       type: string
 *                       format: date
 *                       example: "2026-06-11T16:45:00Z"
 *                     status:
 *                       type: string
 *                       enum: [EM_ANDAMENTO, CONCLUIDO, INTERROMPIDO]
 *               habilidades:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                    nome:
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


/**
 * @openapi
 * /curriculo/{id}:
 *   get:
 *     summary: Exibe o currículo do usuário autenticado pelo ID.
 *     tags:
 *       - Currículo
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID numérico do currículo a ser exibido.
 *         schema:
 *            type: integer
 *            example: 1
 *     responses:
 *       201:
 *         description: Currículo criado com sucesso.
 *       404:
 *         description: Curriculo não encontrada.
 *       401:
 *         description: Token de autenticação não fornecido no cabeçalho.
 *       500:
 *         description: Erro interno do servidor.
 */
router.get('/:id', getCurriculoById);

/**
 * @openapi
 * /curriculo:
 *   get:
 *     summary: Retorna uma lista paginada de currículos.
 *     tags:
 *       - Currículo
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Currículo criado com sucesso.
 *       400:
 *         description: Entrada inválida do usuário.
 *       500:
 *         description: Erro ao criar currículo.
 */
router.get('/', getAllCurriculos);

/**
 * @openapi
 * /curriculo/{id}:
 *   patch:
 *     summary: Atualiza um currículo existente usando seu ID único.
 *     tags:
 *       - Currículo
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do currículo a ser atualizado.
 *         schema:
 *            type: integer
 *            example: 1
 *       - in: query
 *         name: idExperencia
 *         required: false
 *         description: ID da experiencia a ser atualizado.
 *         schema:
 *            type: integer
 *            example: 1
 *       - in: query
 *         name: idCurso
 *         required: false
 *         description: ID do curso a ser atualizado.
 *         schema:
 *            type: integer
 *            example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
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
 *                       example: "Empresa XYZ"
 *                     dataInicio:
 *                       type: string
 *                       format: date
 *                       example: "2026-06-23T16:45:00Z"
 *                     dataFim:
 *                       type: string
 *                       format: date
 *                       example: "2026-06-23T16:45:00Z"      
 *                     status:
 *                       type: string
 *                       enum: [ATIVO, INATIVO]
 *               cursos:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     nomeCurso:
 *                       type: string
 *                       example: "Curso de Desenvolvimento Web"            
 *                     tipo:
 *                       type: string
 *                       enum: [BACHARELADO, TECNÓLOGO, LICENCIATURA, TÉCNICOS, CURSO_LIVRE, OUTROS]
 *                     instituicao:
 *                       type: string
 *                       example: "Instituição ABC"
 *                     dataInicio:
 *                       type: string
 *                       format: date
 *                       example: "2026-06-11T16:45:00Z"
 *                     dataFim:
 *                       type: string
 *                       format: date
 *                       example: "2026-06-11T16:45:00Z"
 *                     status:
 *                       type: string
 *                       enum: [EM_ANDAMENTO, CONCLUIDO, INTERROMPIDO]
 *               habilidades:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                    nome:
 *                       type: string
 *                       example: "JavaScript"
 *     responses:
 *       201:
 *         description: 
 *       400:
 *         description: Entrada inválida do usuário.
 *       500:
 *         description: Erro ao criar currículo.
 */
router.patch('/:id', validateSchema(curriculoUpdateSchema), updateCurriculo);

/**
 * @openapi
 * /curriculo/{id}:
 *   delete:
 *     summary: Exclui um currículo existente usando seu ID único.
 *     tags:
 *       - Currículo
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do currículo a ser excluído.
 *         schema:
 *            type: integer
 *            example: 1
 *     responses:
 *       201:
 *         description: Currículo criado com sucesso.
 *       404:
 *         description: Curriculo não encontrada.
 *       401:
 *         description: Token de autenticação não fornecido no cabeçalho.
 *       500:
 *         description: Erro interno do servidor.
 */
router.delete('/:id', deleteCurriculo);

export default router;