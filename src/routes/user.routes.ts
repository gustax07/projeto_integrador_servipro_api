import { Router } from "express";
import { createUser, getUserById, getAllUsers, updateUser, deleteUser } from "../controllers/user.controller";
import { validateSchema } from "../middleware/validate.middlware";
import { createUserSchema, updateUserSchema } from "../schemas/user.schema";
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
 *         description: erro ao criar usuário
 */
router.post('/', authLimiter, validateSchema(createUserSchema), createUser);


// ----------------------------- Rotas com Autenticação -------------------------------- \\

router.use(authenticate);

// ----------------------------- Listar Usuário por ID -------------------------------- \\

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

// ----------------------------- Listar Todos os Usuários -------------------------------- \\

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

// ----------------------------- Editar o Usuario pelo ID -------------------------------- \\

/**
 * @openapi
 * /user/{id}:
 *   patch:
 *     summary: Editar Usuario pelo ID
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
 *         description: Alteração de dados 
 *       401:
 *         description: Token de autenticação não fornecido no cabeçalho.
 *       404:
 *         description: Usuário não encontrado.
 *       500:
 *         description: Erro ao editar usuario.
 */

router.patch('/:id', validateSchema(updateUserSchema), updateUser);

// ----------------------------- Apagar o Usuario pelo ID -------------------------------- \\

/**
 * @openapi
 * /user/{id}:
 *   delete:
 *     summary: Apagar o Usuario pelo ID
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID Numerico para apagar o usuario
 *         schema:
 *            type: integer
 *            example: 1
 *     responses:
 *       200:
 *         description: Usuario deletado do banco de dados
 *       401:
 *         description: Token de autenticação não fornecido no cabeçalho.
 *       404:
 *         description: Usuário não encontrado.
 *       500:
 *         description: Erro ao apagar Usuário
 */

router.delete('/:id', deleteUser);



export default router;