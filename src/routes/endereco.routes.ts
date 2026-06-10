import { Router } from "express";
import { createEndereco, deleteEndereco, getAllEnderecos, getEnderecoById, updateEndereco } from "../controllers/endereco.controller";
import { validateSchema } from "../middleware/validate.middlware";
import { createEnderecoSchema, updateEnderecoSchema } from "../schemas/endereco.schema";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();
router.use(authenticate);
/**
 * @openapi
 * /endereco:
 *   post:
 *     summary: Adicionar um ou mais endereços para um usuario
 *     tags:
 *       - Endereço
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *             schema:
 *              type: object
 *              properties:
 *                  logradouro:
 *                     type: string
 *                     example: "Rua Suiça"
 *                  numero:
 *                      type: integer
 *                      example: 10
 *                  bairro:
 *                      type: string
 *                      example: "Santana"
 *                  cep:
 *                      type: string
 *                      example: "12405-500"
 *                  complemento:
 *                      type: string
 *                      example: "portão azul"
 *                  principal:
 *                      type: boolean
 *                      example: true
 *                  cidade:
 *                      type: string
 *                      example: "São Paulo"
 *                  estado: 
 *                      type: string
 *                      example: "SP"
 *                  userId:
 *                      type: integer
 *                      example: 1
 *     responses:
 *       200:
 *         description: Endereço adicionado com sucesso!
 *       400:
 *         description: Entrada Inválida do usuario!
 *       401:
 *         description: Token de autenticação não fornecido no cabeçalho.
 *       500:
 *         description: erro ao adicionar o endereço
 */
router.post('/', validateSchema(createEnderecoSchema), createEndereco);

/**
 * @openapi
 * /endereco/{id}:
 *   patch:
 *     summary: Editar endereço pelo ID
 *     tags:
 *       - Endereço
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID Numerico para editar um endereço
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
 *                  logradouro:
 *                     type: string
 *                     example: "Rua Carvalha"
 *                  numero:
 *                      type: integer
 *                      example: 312
 *                  bairro:
 *                      type: string
 *                      example: "Exaporan"
 *                  cep:
 *                      type: string
 *                      example: "12405-501"
 *                  complemento:
 *                      type: string
 *                      example: "portão preto"
 *                  principal:
 *                      type: boolean
 *                      example: false
 *                  cidade:
 *                      type: string
 *                      example: "Minas Gerais"
 *                  estado: 
 *                      type: string
 *                      example: "MG"
 *                  userId:
 *                      type: integer
 *                      example: 1
 *     responses:
 *       200:
 *         description: Endereço Editado com sucesso!
 *       400:
 *         description: Entrada Inválida do usuario!
 *       401:
 *         description: Token de autenticação não fornecido no cabeçalho.
 *       500:
 *         description: erro ao editar o endereço
 */
router.patch('/:id',validateSchema(updateEnderecoSchema), updateEndereco);

/**
 * @openapi
 * /endereco:
 *   get:
 *     summary: Listar todos endereços de um usuário
 *     tags:
 *       - Endereço
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Mostrar todos os endereços de um usuário com limite de 20 colunas
 *       401:
 *         description: Token de autenticação não fornecido no cabeçalho.
 *       500:
 *         description: erro ao editar o endereço
 */
router.get('/', getAllEnderecos);

/**
 * @openapi
 * /endereco/{id}:
 *   get:
 *     summary: Exibir endereço pelo ID
 *     tags:
 *       - Endereço
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID Numerico para exibir um endereço
 *         schema:
 *            type: integer
 *            example: 1
 *     responses:
 *       200:
 *         description: Exibir endereço pelo ID
 *       400:
 *         description: Endereço não encontrado ou não pertence a este usuário.
 *       401:
 *         description: Token de autenticação não fornecido no cabeçalho.
 *       500:
 *         description: erro ao editar o endereço
 */
router.get('/:id', getEnderecoById);

/**
 * @openapi
 * /endereco/{id}:
 *   delete:
 *     summary: Deletar um endereço pelo ID
 *     tags:
 *       - Endereço
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID Numerico para deletar um endereço
 *         schema:
 *            type: integer
 *            example: 1
 *     responses:
 *       200:
 *         description: Deletar endereço pelo ID
 *       400:
 *         description: Entrada Inválida do usuario!
 *       401:
 *         description: Token de autenticação não fornecido no cabeçalho.
 *       500:
 *         description: erro ao editar o endereço
 */
router.delete('/:id', deleteEndereco);

export default router;