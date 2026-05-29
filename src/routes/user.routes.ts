import { Router } from "express";
import { createUser, getUserById, getAllUsers, updateUser, deleteUser } from "../controllers/user.controller";
import { validateSchema } from "../middleware/validate.middlware";
import { createUserSchema } from "../schemas/user.schema";
import { authLimiter } from '../middleware/rateLimiter.middleware';
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

/**
 * @openapi
 * /user:
 *   post:
 *     summary: Criar uma conta nova
 *     tags:
 *       - User
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *             schema:
 *              type: object
 *              properties:
 *                  nome:
 *                    type: string
 *                    example: "gustavo"
 *                  email:
 *                    type: string
 *                    example: "gustavo@gmail.com"
 *                  senha:
 *                    type: string
 *                    example: 123456
 *                  dataNascimento:
 *                    type: string
 *                    format: date
 *                    example: "2007-02-01"
 *                  documento:
 *                     type: string
 *                     example: "123.456.789-03"
 *     responses:
 *       200:
 *         description: Conta criada com sucesso!
 *       400:
 *         description: Entrada Inválida do usuario!
 *       500:
 *         description: Senha ou email inválidos!
 */
router.post('/', authLimiter, validateSchema(createUserSchema), createUser);

router.use(authenticate);
/**
 * @openapi
 * /user/{id}:
 *   get:
 *     summary: Pegar dados do usuario por ID
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID Numerico para buscar o usuario
 *         schema:
 *            type: integer
 *            example: 1
 *     responses:
 *       200:
 *         description: Dados do usuario
 *       401:
 *         description: Token de autenticação não fornecido no cabeçalho.
 *       404:
 *         description: Usuário não encontrado.
 */
router.get('/:id', getUserById);
/**
 * @openapi
 * /user:
 *   get:
 *     summary: Listar todos os Usuários
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dados de todos os Usuarios com limite de 20 por página
 *       401:
 *         description: Token de autenticação não fornecido no cabeçalho.
 *       404:
 *         description: Nenhum usuario encontrado
 */
router.get('/', getAllUsers);

router.put('/:id', validateSchema(createUserSchema), updateUser);
router.delete('/:id', deleteUser);

export default router;