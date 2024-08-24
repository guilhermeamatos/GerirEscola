// src/routes/managerRoutes.ts

import { Router } from 'express';
import { ManagerController } from '../controllers/ManagerController';
import { ManagerService } from '../services/ManagerService';
import { ManagerRepository } from '../repositories/ManagerRepository';

const managerRoutes = Router();
const managerRepository = new ManagerRepository();
const managerService = new ManagerService(managerRepository);
const managerController = new ManagerController(managerService);

managerRoutes.post('/', (req, res) => managerController.create(req, res));
managerRoutes.get('/:id', (req, res) => managerController.getById(req, res));
managerRoutes.get('/', (req, res) => managerController.getAll(req, res));
managerRoutes.put('/:id', (req, res) => managerController.update(req, res));
managerRoutes.delete('/:id', (req, res) => managerController.delete(req, res));

export { managerRoutes };
