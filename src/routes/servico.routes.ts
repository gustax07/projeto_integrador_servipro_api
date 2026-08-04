import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { createServico, getServicoById, getAllServicos, updateServico, deleteServico } from "../controllers/servico.controller";
import { validateSchema } from "../middleware/validate.middlware";
import { createServicoSchema, updateServicoSchema } from "../schemas/servico.schema";

const router = Router();

router.use(authenticate);
/**
 * @openapi
 * /servico:
 *   post:
 *     summary: Criar/Postar serviço para candidato registrar-se
 *     tags:
 *       - Serviços
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *             schema:
 *              type: object
 *              properties:
 *                  titulo:
 *                     type: string
 *                     example: "Cortar grama"
 *                  formato:
 *                      type: string
 *                      example: "Presencial"
 *                  descricao:
 *                      type: string
 *                      example: "Corte a minha grama do quintal, pois está muito grande, ja tenho cortador ja abastecido"
 *                  requisitos:
 *                      type: string
 *                      example: "Saber cortar grama, saber controlar o cortador"
 *                  salario:
 *                      type: integer
 *                      example: 300
 *                  tipoSalario: 
 *                      type: string
 *                      example: "Único"
 *                  userId:
 *                      type: integer
 *                      example: 1
 *                  setorId:
 *                      type: integer
 *                      example: 1
 *                  imagens:
 *                      type: array
 *                      example: [
 *                         {
 *                            url: "https://example.com/imagem.png",
 *                            tipo: "png",
 *                            principal: true,
 *                         },
 *                         {
 *                            url: "https://example.com/imagem2.png",
 *                            tipo: "png",
 *                            principal: false,
 *                         }
 *                      ]
 *     responses:
 *       200:
 *         description: Serviço criada com sucesso!
 *       400:
 *         description: Entrada Inválida do usuario!
 *       500:
 *         description: erro ao criar usuário
 */
router.post('/', validateSchema(createServicoSchema), createServico);


/**
 * @openapi
 * /servico/{id}:
 *   patch:
 *     summary: Editar Serviço pelo ID
 *     tags:
 *       - Serviços
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *             schema:
 *              type: object
 *              properties:
 *                  titulo:
 *                     type: string
 *                     example: "Limpar o meu computador"
 *                  formato:
 *                      type: string
 *                      example: "Presencial"
 *                  descricao:
 *                      type: string
 *                      example: "Remover aplicativos, fotos e video do meu pc"
 *                  requisitos:
 *                      type: string
 *                      example: "saber usar um computador, fazer manutenção"
 *                  salario:
 *                      type: integer
 *                      example: 250
 *                  tipoSalario: 
 *                      type: string
 *                      example: "Único"
 *                  userId:
 *                      type: integer
 *                      example: 1
 *                  setorId:
 *                      type: integer
 *                      example: 1
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID Numerico para editar um serviço
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
 *         description: Serviço não encontrado.
 *       500:
 *         description: Erro ao editar serviço.
 */
router.patch('/:id', validateSchema(updateServicoSchema), updateServico);


/**
 * @openapi
 * /servico/:
 *   get:
 *     summary: Mostrar todos os serviços
 *     tags:
 *       - Serviços
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Trazer todos os serviços com limite de 20 colunas
 *       401:
 *         description: Token de autenticação não fornecido no cabeçalho.
 *       404:
 *         description: Serviço não encontrado.
 *       500:
 *         description: Erro ao exibir serviços.
 */
router.get('/', getAllServicos);


/**
 * @openapi
 * /servico/{id}:
 *   get:
 *     summary: Exibir o Serviço pelo ID
 *     tags:
 *       - Serviços
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID Numerico para editar um serviço
 *         schema:
 *            type: integer
 *            example: 1
 *     responses:
 *       200:
 *         description: Mostrar o Serviço
 *       401:
 *         description: Token de autenticação não fornecido no cabeçalho.
 *       404:
 *         description: Serviço não encontrado.
 *       500:
 *         description: Erro ao editar serviço.
 */
router.get('/:id', getServicoById);


/**
 * @openapi
 * /servico/{id}:
 *   delete:
 *     summary: Apagar o Serviço pelo ID
 *     tags:
 *       - Serviços
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID Numerico para editar um serviço
 *         schema:
 *            type: integer
 *            example: 1
 *     responses:
 *       200:
 *         description: O Serviço foi deletado com sucesso
 *       401:
 *         description: Token de autenticação não fornecido no cabeçalho.
 *       404:
 *         description: Serviço não encontrado.
 *       500:
 *         description: Erro ao editar serviço.
 */
router.delete('/:id', deleteServico);

export default router
