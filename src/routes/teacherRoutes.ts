// src/routes/teacherRoutes.ts

import { Router } from 'express';
import { TeacherController } from '../controllers/TeacherController';
import { TeacherService } from '../services/TeacherService';
import { TeacherRepository } from '../repositories/TeacherRepository';

const teacherRoutes = Router();
const teacherRepository = new TeacherRepository();
const teacherService = new TeacherService(teacherRepository);
const teacherController = new TeacherController(teacherService);

teacherRoutes.post('/', (req, res) => teacherController.create(req, res));
teacherRoutes.get('/:id', (req, res) => teacherController.getById(req, res));
teacherRoutes.get('/', (req, res) => teacherController.getAll(req, res));
teacherRoutes.put('/:id', (req, res) => teacherController.update(req, res));
teacherRoutes.delete('/:id', (req, res) => teacherController.delete(req, res));

export { teacherRoutes };
