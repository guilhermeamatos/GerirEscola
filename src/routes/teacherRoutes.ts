// src/routes/teacherRoutes.ts

import { Router } from 'express';
import { TeacherController } from '../controllers/TeacherController';
import { TeacherService } from '../services/TeacherService';
import { TeacherRepository } from '../repositories/TeacherRepository';

const teacherRoutes = Router();
const teacherRepository = new TeacherRepository();
const teacherService = new TeacherService(teacherRepository);
const teacherController = new TeacherController(teacherService);

/**
 * @swagger
 * tags:
 *   name: Teachers
 *   description: Gestão de professores
 */

/**
 * @swagger
 * /teachers:
 *   post:
 *     summary: Cria um novo professor
 *     tags: [Teachers]
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
 *               specialization:
 *                 type: string
 *             example:
 *               name: "Professor A"
 *               cpf: "12345678901"
 *               address: "Rua A, 100"
 *               phone: "123456789"
 *               email: "professor@example.com"
 *               specialization: "Matemática"
 *     responses:
 *       200:
 *         description: Professor criado com sucesso
 *       500:
 *         description: Erro no servidor
 */
teacherRoutes.post('/', (req, res) => teacherController.create(req, res));

/**
 * @swagger
 * /teachers/{id}:
 *   get:
 *     summary: Obtém os detalhes de um professor por ID
 *     tags: [Teachers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: O ID do professor
 *     responses:
 *       200:
 *         description: Detalhes do professor
 *       404:
 *         description: Professor não encontrado
 *       500:
 *         description: Erro no servidor
 */
teacherRoutes.get('/:id', (req, res) => teacherController.getById(req, res));

/**
 * @swagger
 * /teachers:
 *   get:
 *     summary: Retorna todos os professores
 *     tags: [Teachers]
 *     responses:
 *       200:
 *         description: Lista de professores
 *       500:
 *         description: Erro no servidor
 */
teacherRoutes.get('/', (req, res) => teacherController.getAll(req, res));

/**
 * @swagger
 * /teachers/{id}:
 *   put:
 *     summary: Atualiza um professor por ID
 *     tags: [Teachers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: O ID do professor
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
 *               specialization:
 *                 type: string
 *             example:
 *               name: "Professor B"
 *               cpf: "98765432101"
 *               address: "Rua B, 200"
 *               phone: "987654321"
 *               email: "professorb@example.com"
 *               specialization: "Física"
 *     responses:
 *       200:
 *         description: Professor atualizado com sucesso
 *       404:
 *         description: Professor não encontrado
 *       500:
 *         description: Erro no servidor
 */
teacherRoutes.put('/:id', (req, res) => teacherController.update(req, res));

/**
 * @swagger
 * /teachers/{id}:
 *   delete:
 *     summary: Deleta um professor por ID
 *     tags: [Teachers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: O ID do professor
 *     responses:
 *       200:
 *         description: Professor deletado com sucesso
 *       404:
 *         description: Professor não encontrado
 *       500:
 *         description: Erro no servidor
 */
teacherRoutes.delete('/:id', (req, res) => teacherController.delete(req, res));

export { teacherRoutes };
