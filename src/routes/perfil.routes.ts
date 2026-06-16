import { Router } from "express";
import * as p from '../controllers/perfil.controller';
import { authenticate } from "../middleware/auth.middleware";
import { validateSchema } from "../middleware/validate.middlware";
import * as s from "../schemas/perfil.schema";

const router = Router();

router.use(authenticate);

/**
 * @openapi
 * /perfil:
 *   post:
 *     summary: Criar um perfil
 *     tags:
 *       - Perfil
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *             schema:
 *              type: object
 *              properties:
 *                  descricao:
 *                      type: string
 *                      example: "Descrição do Perfil"
 *                  nomeSocial:
 *                      type: string
 *                      example: "Shark"
 *                  viajar:
 *                      type: boolean
 *                      example: true
 *                  exibirPerfil:
 *                      type: boolean
 *                      example: true
 *                  disponibilidade:
 *                      type: string
 *                      emun: ['manhã', 'tarde', 'noite', 'todos os períodos']
 *                      example: 'noite'
 *                  tipoServico:
 *                      type: string
 *                      emun: ['Estágio', 'CLT', 'PJ', 'Freelancer', 'Jovem Aprendiz', 'Autonomo', 'Temporario', 'Outros']
 *                      example: 'Estágio'
 *                  isPrestador:
 *                      type: boolean
 *                      example: true
 *                  isContratante:
 *                      type: boolean
 *                      example: false
 *                  setorId:
 *                      type: integer
 *                      example: 1
 *     responses:
 *       201:
 *         description: Perfil Criado com Sucesso!
 *       400:
 *        description: Perfil já cadastrado!
 *       401:
 *         description: Token de autenticação não fornecido no cabeçalho.
 *       500:
 *         description: Erro interno do servidor.
 */
router.post('/', validateSchema(s.createPerfilSchema), p.createPerfil);

/**
 * @openapi
 * /perfil/{id}:
 *   get:
 *     summary: Exibir um perfil pelo ID
 *     tags:
 *       - Perfil
 *     security:
 *       - bearerAuth: []
 *     parameters: 
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID numerico para exibir um perfil desejado.
 *         schema:
 *            type: integer
 *            example: 1
 *     responses:
 *       201:
 *         description: Exibir os dados do perfil.
 *       401:
 *         description: Token de autenticação não fornecido no cabeçalho.
 *       404: 
 *         description: Perfil não encontrado ou não pertece a este usuario.
 *       500:
 *         description: Erro interno do servidor.
 */
router.get('/:id', p.getPerfilById);

/**
 * @openapi
 * /perfil:
 *   get:
 *     summary: Exibir Todos os perfis.
 *     tags:
 *       - Perfil
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Exibir todos os perfis.
 *       401:
 *         description: Token de autenticação não fornecido no cabeçalho.
 *       404: 
 *         description: Nenhum perfil encontrado.
 *       500:
 *         description: Erro interno do servidor.
 */
router.get('/', p.getAllPerfis);

/**
 * @openapi
 * /perfil/{id}:
 *   patch:
 *     summary: Atualizar um perfil.
 *     tags:
 *       - Perfil
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID numerico do perfil para editar
 *         schema:
 *           type: integer
 *           example: 1        
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *             schema:
 *              type: object
 *              properties:
 *                  descricao:
 *                      type: string
 *                      example: "Descrição do Perfil"
 *                  nomeSocial:
 *                      type: string
 *                      example: "Shark"
 *                  viajar:
 *                      type: boolean
 *                      example: false
 *                  exibirPerfil:
 *                      type: boolean
 *                      example: true
 *                  disponibilidade:
 *                      type: string
 *                      emun: ['manhã', 'tarde', 'noite', 'todos os períodos']
 *                      example: 'manhã'
 *                  tipoServico:
 *                      type: string
 *                      emun: ['Estágio', 'CLT', 'PJ', 'Freelancer', 'Jovem Aprendiz', 'Autonomo', 'Temporario', 'Outros']
 *                      example: 'CLT'
 *                  isPrestador:
 *                      type: boolean
 *                      example: true
 *                  isContratante:
 *                      type: boolean
 *                      example: false
 *                  setorId:
 *                      type: integer
 *                      example: 1
 *     responses:
 *       201:
 *         description: Perfil Editado com Sucesso!
 *       400:
 *        description: Perfil já cadastrado!
 *       401:
 *         description: Token de autenticação não fornecido no cabeçalho.
 *       500:
 *         description: Erro interno do servidor.
 */
router.patch('/:id', validateSchema(s.updatePerfilSchema), p.updatePerfil);

/**
 * @openapi
 * /perfil/{id}:
 *   delete:
 *     summary: Deletar um perfil pelo ID
 *     tags:
 *       - Perfil
 *     security:
 *       - bearerAuth: []
 *     parameters: 
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID numerico para deletar um perfil.
 *         schema:
 *            type: integer
 *            example: 1
 *     responses:
 *       201:
 *         description: Perfil deletado com sucesso.
 *       401:
 *         description: Token de autenticação não fornecido no cabeçalho.
 *       404: 
 *         description: Perfil não encontrado ou não pertece a este usuario.
 *       500:
 *         description: Erro interno do servidor.
 */
router.delete('/:id', p.deletePerfil);

export default router;