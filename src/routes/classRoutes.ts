// src/routes/classRoutes.ts

import { Router } from 'express';
import { ClassController } from '../controllers/ClassController';
import { ClassService } from '../services/ClassService';
import { ClassRepository } from '../repositories/ClassRepository';

const classRoutes = Router();
const classRepository = new ClassRepository();
const classService = new ClassService(classRepository);
const classController = new ClassController(classService);

classRoutes.post('/', (req, res) => classController.create(req, res));
classRoutes.get('/:id', (req, res) => classController.getById(req, res));
classRoutes.get('/', (req, res) => classController.getAll(req, res));
classRoutes.put('/:id', (req, res) => classController.update(req, res));
classRoutes.delete('/:id', (req, res) => classController.delete(req, res));

export { classRoutes };
