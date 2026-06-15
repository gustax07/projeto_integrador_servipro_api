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
 *        description: Entrada Inválida do usuario.
 *       404:
 *         description: Setor não encontrado.
 *       401:
 *         description: Token de autenticação não fornecido no cabeçalho.
 *       500:
 *         description: Erro interno do servidor.
 */
router.post('/', validateSchema(s.createPerfilSchema), p.createPerfil);
router.get('/:id', p.getPerfilById);
router.get('/', p.getAllPerfis);
router.patch('/:id', validateSchema(s.updatePerfilSchema), p.updatePerfil);
router.delete('/:id', p.deletePerfil);

export default router;