// src/routes/coordinatorRoutes.ts

import { Router } from 'express';
import { CoordinatorController } from '../controllers/CoordinatorController';
import { CoordinatorService } from '../services/CoordinatorService';
import { CoordinatorRepository } from '../repositories/CoordinatorRepository';

const coordinatorRoutes = Router();
const coordinatorRepository = new CoordinatorRepository();
const coordinatorService = new CoordinatorService(coordinatorRepository);
const coordinatorController = new CoordinatorController(coordinatorService);

coordinatorRoutes.post('/', (req, res) => coordinatorController.create(req, res));
coordinatorRoutes.get('/:id', (req, res) => coordinatorController.getById(req, res));
coordinatorRoutes.get('/', (req, res) => coordinatorController.getAll(req, res));
coordinatorRoutes.put('/:id', (req, res) => coordinatorController.update(req, res));
coordinatorRoutes.delete('/:id', (req, res) => coordinatorController.delete(req, res));

export { coordinatorRoutes };
