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

// Rota para obter estudantes por disciplina
studentRoutes.get('/subject/:subjectId', (req, res) => studentController.getStudentsBySubject(req, res));

// Rota para criar um novo aluno
studentRoutes.post('/', validate(createStudentValidationSchema), (req, res) => studentController.create(req, res));

// Rota para obter os detalhes de um aluno por ID
studentRoutes.get('/:id', (req, res) => studentController.getById(req, res));

// Rota para retornar todos os alunos
studentRoutes.get('/', (req, res) => studentController.getAll(req, res));

// Rota para atualizar um aluno por ID
studentRoutes.put('/:id', validate(updateStudentValidationSchema), (req, res) => studentController.update(req, res));

// Rota para deletar um aluno por ID
studentRoutes.delete('/:id', (req, res) => studentController.delete(req, res));

// Rota para associar um aluno a uma turma
studentRoutes.post('/link-to-class', (req, res) => studentController.linkStudentToClass(req, res));

// Rota para obter alunos por escola e ano letivo
studentRoutes.get('/:schoolId/:schoolYear', studentController.getStudentsBySchoolAndYear.bind(studentController));

export { studentRoutes };
