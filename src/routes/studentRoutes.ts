// src/routes/studentRoutes.ts

import { Router } from 'express';
import { StudentController } from '../controllers/StudentController';
import { StudentService } from '../services/StudentService';
import { StudentRepository } from '../repositories/StudentRepository';
import { validate } from '../middlewares/validationMiddleware';
import { createStudentValidationSchema, updateStudentValidationSchema } from '../validations/studentValidation';

const studentRoutes = Router();
const studentRepository = new StudentRepository();
const studentService = new StudentService(studentRepository);
const studentController = new StudentController(studentService);

/**
 * @swagger
 * tags:
 *   name: Students
 *   description: Gestão de alunos
 */

/**
 * @swagger
 * /students:
 *   post:
 *     summary: Cria um novo aluno
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               birthdate:
 *                 type: string
 *               cpf:
 *                 type: string
 *               address:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               classId:
 *                 type: string
 *             example:
 *               name: "Aluno A"
 *               birthdate: "2005-05-15"
 *               cpf: "12345678901"
 *               address: "Rua A, 100"
 *               phone: "123456789"
 *               email: "aluno@example.com"
 *               classId: "id-da-classe"
 *     responses:
 *       200:
 *         description: Aluno criado com sucesso
 *       500:
 *         description: Erro no servidor
 */
studentRoutes.post('/', validate(createStudentValidationSchema), (req, res) => studentController.create(req, res));

/**
 * @swagger
 * /students/{id}:
 *   get:
 *     summary: Obtém os detalhes de um aluno por ID
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: O ID do aluno
 *     responses:
 *       200:
 *         description: Detalhes do aluno
 *       404:
 *         description: Aluno não encontrado
 *       500:
 *         description: Erro no servidor
 */
studentRoutes.get('/:id', (req, res) => studentController.getById(req, res));

/**
 * @swagger
 * /students:
 *   get:
 *     summary: Retorna todos os alunos
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: Lista de alunos
 *       500:
 *         description: Erro no servidor
 */
studentRoutes.get('/', (req, res) => studentController.getAll(req, res));

/**
 * @swagger
 * /students/{id}:
 *   put:
 *     summary: Atualiza um aluno por ID
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: O ID do aluno
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               birthdate:
 *                 type: string
 *               cpf:
 *                 type: string
 *               address:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               classId:
 *                 type: string
 *             example:
 *               name: "Aluno B"
 *               birthdate: "2005-05-15"
 *               cpf: "98765432101"
 *               address: "Rua B, 200"
 *               phone: "987654321"
 *               email: "alunob@example.com"
 *               classId: "id-da-classe"
 *     responses:
 *       200:
 *         description: Aluno atualizado com sucesso
 *       404:
 *         description: Aluno não encontrado
 *       500:
 *         description: Erro no servidor
 */
studentRoutes.put('/:id', validate(updateStudentValidationSchema), (req, res) => studentController.update(req, res));
/**
 * @swagger
 * /students/{id}:
 *   delete:
 *     summary: Deleta um aluno por ID
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: O ID do aluno
 *     responses:
 *       200:
 *         description: Aluno deletado com sucesso
 *       404:
 *         description: Aluno não encontrado
 *       500:
 *         description: Erro no servidor
 */
studentRoutes.delete('/:id', (req, res) => studentController.delete(req, res));

export { studentRoutes };
