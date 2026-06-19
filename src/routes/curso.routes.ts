import { Router } from "express";
import { createCurso, getCursoById, getAllCursos, updateCurso, deleteCurso } from "../controllers/curso.controller";
import { validateSchema } from "../middleware/validate.middlware";
import { cursoCreateSchema, cursoUpdateSchema } from "../schemas/curso.schema";
import { authenticate } from "../middleware/auth.middleware";
const router = Router();

router.use(authenticate)
/**
 * @openapi
 * /curso:
 *   post:
 *     summary: Cria um novo curso.
 *     description: Cria um novo curso com os dados fornecidos.
 *     tags:
 *       - Cursos
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *             schema:
 *              type: object
 *              properties:
 *                  tipo:
 *                     type: string
 *                     example: "Técnico"
 *                  nomeCurso:
 *                     type: string
 *                     example: "Técnico em Informática"
 *                  instituicao:
 *                     type: string
 *                     example: "Escola Técnica Estadual"
 *                  dataInicio:
 *                     type: string
 *                     example: "2020-01-01"
 *                  dataFim:
 *                      type: string
 *                      example: "2022-12-31"
 *                  curriculoId:
 *                      type: number
 *                      example: 1
 *                  status:
 *                      type: string
 *                      enum: ["Em andamento", "Concluído", "Interrompido"]
 *                      example: "Concluído"   
 *     responses:
 *       201:
 *         description: Curso criado com sucesso.
 *       400:
 *        description: Entrada Inválida do usuario!
 *       401:
 *         description: Token de autenticação não fornecido no cabeçalho.
 *       500:
 *         description: Erro interno do servidor.
 */
router.post('/', validateSchema(cursoCreateSchema), createCurso);

/**
 * @openapi
 * /curso/{id}:
 *   get:
 *     summary: Busca um curso por ID.
 *     description: Retorna os detalhes de um curso específico usando seu ID.
 *     tags:
 *       - Cursos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do curso.
 *         schema:
 *            type: integer
 *            example: 1
 *       - in: query
 *         name: curriculoId
 *         required: true
 *         description: ID do currículo.
 *         schema:
 *            type: integer
 *            example: 1
 *     responses:
 *       201:
 *         description: Curso encontrado com sucesso.
 *       404:
 *         description: Curso não encontrado ou não pertence a este usuário.
 *       401:
 *         description: Token de autenticação não fornecido no cabeçalho.
 *       500:
 *         description: Erro interno do servidor.
 */
router.get('/:id', getCursoById);

/**
 * @openapi
 * /curso:
 *   get:
 *     summary: Busca todos os cursos.
 *     description: Retorna uma lista paginada de todos os cursos.
 *     tags:
 *       - Cursos
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Cursos encontrados com sucesso.
 *       400:
 *        description: Entrada Inválida do usuario!
 *       404:
 *         description: Nenhum curso encontrado.
 *       401:
 *         description: Token de autenticação não fornecido no cabeçalho.
 *       500:
 *         description: Erro interno do servidor.
 */
router.get('/', getAllCursos);

/**
 * @openapi
 * /curso/{id}:
 *   patch:
 *     summary: Atualiza um curso existente.
 *     description: Atualiza os detalhes de um curso específico usando seu ID.
 *     tags:
 *       - Cursos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do curso a ser atualizado.
 *         schema:
 *            type: integer
 *            example: 1
 *       - in: query
 *         name: curriculoId
 *         required: true
 *         description: ID do currículo.
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
 *                  tipo:
 *                     type: string
 *                     example: "Técnico"
 *                  nomeCurso:
 *                     type: string
 *                     example: "Tecnico de Enfermagem"
 *                  instituicao:
 *                     type: string
 *                     example: "Escola Técnica Estadual"
 *                  dataInicio:
 *                     type: string
 *                     example: "2020-01-01"
 *                  dataFim:
 *                      type: string
 *                      example: "2022-12-31"
 *                  curriculoId:
 *                      type: number
 *                      example: 1
 *                  status:
 *                      type: string
 *                      enum: ["Em andamento", "Concluído", "Interrompido"]
 *                      example: "Concluído"
 *     responses:
 *       201:
 *         description: Curso atualizado com sucesso.
 *       400:
 *        description: Entrada Inválida do usuario!
 *       404:
 *         description: Curso não encontrado ou não pertence a este usuário.
 *       401:
 *         description: Token de autenticação não fornecido no cabeçalho.
 *       500:
 *         description: Erro interno do servidor.
 */
router.patch('/:id', validateSchema(cursoUpdateSchema), updateCurso);

/**
 * @openapi
 * /curso/{id}:
 *   delete:
 *     summary: Deleta um curso existente.
 *     description: Deleta um curso específico usando seu ID.
 *     tags:
 *       - Cursos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do curso a ser deletado.
 *         schema:
 *            type: integer
 *            example: 1
 *       - in: query
 *         name: curriculoId
 *         required: true
 *         description: ID do currículo.
 *         schema:
 *            type: integer
 *            example: 1
 *     responses:
 *       201:
 *         description: Curso deletado com sucesso.
 *       404:
 *         description: Curso não encontrado ou não pertence a este usuário.
 *       401:
 *         description: Token de autenticação não fornecido no cabeçalho.
 *       500:
 *         description: Erro interno do servidor.
 */
router.delete('/:id', deleteCurso);

export default router;