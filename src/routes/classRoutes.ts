import { Router } from 'express';
import { ClassController } from '../controllers/ClassController';
import { ClassService } from '../services/ClassService';
import { ClassRepository } from '../repositories/ClassRepository';
import { validate } from '../middlewares/validationMiddleware';
import { createClassValidationSchema, updateClassValidationSchema } from '../validations/classValidation';

const classRoutes = Router();
const classRepository = new ClassRepository();
const classService = new ClassService(classRepository);
const classController = new ClassController(classService);

/**
 * @swagger
 * tags:
 *   name: Classes
 *   description: Gestão de turmas
 */

/**
 * @swagger
 * /classes:
 *   post:
 *     summary: Cria uma nova turma
 *     tags: [Classes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               schoolYear:
 *                 type: string
 *               schoolId:
 *                 type: string
 *             example:
 *               name: "Turma A"
 *               schoolYear: "2024"
 *               schoolId: "id-da-escola"
 *     responses:
 *       200:
 *         description: Turma criada com sucesso
 *       500:
 *         description: Erro no servidor
 */
classRoutes.post('/', validate(createClassValidationSchema), (req, res) => classController.create(req, res));


/**
 * @swagger
 * /classes/{id}:
 *   get:
 *     summary: Obtém os detalhes de uma turma por ID
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: O ID da turma
 *     responses:
 *       200:
 *         description: Detalhes da turma
 *       404:
 *         description: Turma não encontrada
 *       500:
 *         description: Erro no servidor
 */
classRoutes.get('/:id', (req, res) => classController.getById(req, res));

/**
 * @swagger
 * /classes:
 *   get:
 *     summary: Retorna todas as turmas
 *     tags: [Classes]
 *     responses:
 *       200:
 *         description: Lista de turmas
 *       500:
 *         description: Erro no servidor
 */
classRoutes.get('/', (req, res) => classController.getAll(req, res));

/**
 * @swagger
 * /classes/{id}:
 *   put:
 *     summary: Atualiza uma turma por ID
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: O ID da turma
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               schoolYear:
 *                 type: string
 *               schoolId:
 *                 type: string
 *             example:
 *               name: "Turma B"
 *               schoolYear: "2025"
 *               schoolId: "id-da-escola"
 *     responses:
 *       200:
 *         description: Turma atualizada com sucesso
 *       404:
 *         description: Turma não encontrada
 *       500:
 *         description: Erro no servidor
 */
classRoutes.put('/:id', validate(updateClassValidationSchema), (req, res) => classController.update(req, res));

/**
 * @swagger
 * /classes/{id}:
 *   delete:
 *     summary: Deleta uma turma por ID
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: O ID da turma
 *     responses:
 *       200:
 *         description: Turma deletada com sucesso
 *       404:
 *         description: Turma não encontrada
 *       500:
 *         description: Erro no servidor
 */
classRoutes.delete('/:id', (req, res) => classController.delete(req, res));

export { classRoutes };
