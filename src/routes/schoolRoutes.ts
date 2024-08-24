// src/routes/schoolRoutes.ts

import { Router } from 'express';
import { SchoolController } from '../controllers/SchoolController';
import { SchoolService } from '../services/SchoolService';
import { SchoolRepository } from '../repositories/SchoolRepository';

const schoolRoutes = Router();
const schoolRepository = new SchoolRepository();
const schoolService = new SchoolService(schoolRepository);
const schoolController = new SchoolController(schoolService);

schoolRoutes.post('/', (req, res) => schoolController.create(req, res));
schoolRoutes.get('/:id', (req, res) => schoolController.getById(req, res));
schoolRoutes.get('/', (req, res) => schoolController.getAll(req, res));
schoolRoutes.put('/:id', (req, res) => schoolController.update(req, res));
schoolRoutes.delete('/:id', (req, res) => schoolController.delete(req, res));

export { schoolRoutes };
