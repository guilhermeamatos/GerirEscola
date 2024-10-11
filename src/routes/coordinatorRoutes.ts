import { Router } from 'express';
import { CoordinatorController } from '../controllers/CoordinatorController';
import { CoordinatorService } from '../services/CoordinatorService';
import { CoordinatorRepository } from '../repositories/CoordinatorRepository';
import { validate } from '../middlewares/validationMiddleware';
import { createCoordinatorValidationSchema, updateCoordinatorValidationSchema } from '../validations/coordinatorValidation';


const coordinatorRoutes = Router();
const coordinatorRepository = new CoordinatorRepository();
const coordinatorService = new CoordinatorService(coordinatorRepository);
const coordinatorController = new CoordinatorController(coordinatorService);

/**
 * @swagger
 * tags:
 *   name: Coordinators
 *   description: Gestão de coordenadores
 */

/**
 * @swagger
 * /coordinators:
 *   post:
 *     summary: Cria um novo coordenador
 *     tags: [Coordinators]
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
 *               name: "Coordenador A"
 *               cpf: "12345678901"
 *               address: "Rua X, 123"
 *               phone: "123456789"
 *               email: "coordenador@example.com"
 *               schoolId: "id-da-escola"
 *     responses:
 *       200:
 *         description: Coordenador criado com sucesso
 *       500:
 *         description: Erro no servidor
 */
coordinatorRoutes.post('/', validate(createCoordinatorValidationSchema), (req, res) => coordinatorController.create(req, res));

/**
 * @swagger
 * /coordinators/{id}:
 *   get:
 *     summary: Obtém os detalhes de um coordenador por ID
 *     tags: [Coordinators]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: O ID do coordenador
 *     responses:
 *       200:
 *         description: Detalhes do coordenador
 *       404:
 *         description: Coordenador não encontrado
 *       500:
 *         description: Erro no servidor
 */
coordinatorRoutes.get('/:id', (req, res) => coordinatorController.getById(req, res));

/**
 * @swagger
 * /coordinators:
 *   get:
 *     summary: Retorna todos os coordenadores
 *     tags: [Coordinators]
 *     responses:
 *       200:
 *         description: Lista de coordenadores
 *       500:
 *         description: Erro no servidor
 */
coordinatorRoutes.get('/', (req, res) => coordinatorController.getAll(req, res));

/**
 * @swagger
 * /coordinators/{id}:
 *   put:
 *     summary: Atualiza um coordenador por ID
 *     tags: [Coordinators]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: O ID do coordenador
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
 *               name: "Coordenador B"
 *               cpf: "98765432101"
 *               address: "Rua Y, 456"
 *               phone: "987654321"
 *               email: "coordenadorb@example.com"
 *               schoolId: "id-da-escola"
 *     responses:
 *       200:
 *         description: Coordenador atualizado com sucesso
 *       404:
 *         description: Coordenador não encontrado
 *       500:
 *         description: Erro no servidor
 */
coordinatorRoutes.put('/:id', validate(updateCoordinatorValidationSchema), (req, res) => coordinatorController.update(req, res));

/**
 * @swagger
 * /coordinators/{id}:
 *   delete:
 *     summary: Deleta um coordenador por ID
 *     tags: [Coordinators]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: O ID do coordenador
 *     responses:
 *       200:
 *         description: Coordenador deletado com sucesso
 *       404:
 *         description: Coordenador não encontrado
 *       500:
 *         description: Erro no servidor
 */
coordinatorRoutes.delete('/:id', (req, res) => coordinatorController.delete(req, res));

export { coordinatorRoutes };
