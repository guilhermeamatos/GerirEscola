// src/routes/studentRoutes.ts

import { Router } from 'express';
import { StudentController } from '../controllers/StudentController';
import { StudentService } from '../services/StudentService';
import { StudentRepository } from '../repositories/StudentRepository';

const studentRoutes = Router();
const studentRepository = new StudentRepository();
const studentService = new StudentService(studentRepository);
const studentController = new StudentController(studentService);

studentRoutes.post('/', (req, res) => studentController.create(req, res));
studentRoutes.get('/:id', (req, res) => studentController.getById(req, res));
studentRoutes.get('/', (req, res) => studentController.getAll(req, res));
studentRoutes.put('/:id', (req, res) => studentController.update(req, res));
studentRoutes.delete('/:id', (req, res) => studentController.delete(req, res));

export { studentRoutes };
