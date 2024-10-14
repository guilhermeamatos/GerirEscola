// src/routes/managerRoutes.ts

import { Router } from 'express';
import { ManagerController } from '../controllers/ManagerController';
import { ManagerService } from '../services/ManagerService';
import { ManagerRepository } from '../repositories/ManagerRepository';
import { validate } from '../middlewares/validationMiddleware';
import { createManagerSchema, updateManagerSchema } from '../validations/managerValidation';

const managerRoutes = Router();
const managerRepository = new ManagerRepository();
const managerService = new ManagerService(managerRepository);
const managerController = new ManagerController(managerService);

/**
 * @swagger
 * tags:
 *   name: Managers
 *   description: Gestão de gestores
 */

/**
 * @swagger
 * /managers:
 *   post:
 *     summary: Cria um novo gestor
 *     tags: [Managers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               cpf:
 *                 type: string
 *               address:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               schoolId:
 *                 type: string
 *             example:
 *               name: "Gestor A"
 *               cpf: "12345678901"
 *               address: "Rua A, 100"
 *               phone: "123456789"
 *               email: "gestor@example.com"
 *               schoolId: "id-da-escola"
 *     responses:
 *       200:
 *         description: Gestor criado com sucesso
 *       500:
 *         description: Erro no servidor
 */
managerRoutes.post('/', validate(createManagerSchema), (req, res) => managerController.create(req, res));


/**
 * @swagger
 * /managers/{id}:
 *   get:
 *     summary: Obtém os detalhes de um gestor por ID
 *     tags: [Managers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: O ID do gestor
 *     responses:
 *       200:
 *         description: Detalhes do gestor
 *       404:
 *         description: Gestor não encontrado
 *       500:
 *         description: Erro no servidor
 */
managerRoutes.get('/:id', (req, res) => managerController.getById(req, res));

/**
 * @swagger
 * /managers:
 *   get:
 *     summary: Retorna todos os gestores
 *     tags: [Managers]
 *     responses:
 *       200:
 *         description: Lista de gestores
 *       500:
 *         description: Erro no servidor
 */
managerRoutes.get('/', (req, res) => managerController.getAll(req, res));

/**
 * @swagger
 * /managers/{id}:
 *   put:
 *     summary: Atualiza um gestor por ID
 *     tags: [Managers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: O ID do gestor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               cpf:
 *                 type: string
 *               address:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               schoolId:
 *                 type: string
 *             example:
 *               name: "Gestor B"
 *               cpf: "98765432101"
 *               address: "Rua B, 200"
 *               phone: "987654321"
 *               email: "gestorb@example.com"
 *               schoolId: "id-da-escola"
 *     responses:
 *       200:
 *         description: Gestor atualizado com sucesso
 *       404:
 *         description: Gestor não encontrado
 *       500:
 *         description: Erro no servidor
 */
managerRoutes.put('/:id', validate(updateManagerSchema), (req, res) => managerController.update(req, res));
/**
 * @swagger
 * /managers/{id}:
 *   delete:
 *     summary: Deleta um gestor por ID
 *     tags: [Managers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: O ID do gestor
 *     responses:
 *       200:
 *         description: Gestor deletado com sucesso
 *       404:
 *         description: Gestor não encontrado
 *       500:
 *         description: Erro no servidor
 */
managerRoutes.delete('/:id', (req, res) => managerController.delete(req, res));

managerRoutes.post('/login', (req, res) => managerController.login(req, res));

export { managerRoutes };
