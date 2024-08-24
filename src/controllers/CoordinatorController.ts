// src/controllers/CoordinatorController.ts

import { Request, Response } from 'express';
import { CoordinatorService } from '../services/CoordinatorService';
import { CreateCoordinatorDTO } from '../dto';

export class CoordinatorController {
  private coordinatorService: CoordinatorService;

  constructor(coordinatorService: CoordinatorService) {
    this.coordinatorService = coordinatorService;
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const coordinatorData: CreateCoordinatorDTO = req.body;
      const newCoordinator = await this.coordinatorService.createCoordinator(coordinatorData);
      return res.status(201).json(newCoordinator);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Unknown error occurred' });
    }
  }

  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const coordinator = await this.coordinatorService.getCoordinatorById(id);
      if (!coordinator) {
        return res.status(404).json({ message: 'Coordinator not found' });
      }
      return res.status(200).json(coordinator);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Unknown error occurred' });
    }
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const coordinators = await this.coordinatorService.getAllCoordinators();
      return res.status(200).json(coordinators);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Unknown error occurred' });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const coordinatorData: Partial<CreateCoordinatorDTO> = req.body;
      const updatedCoordinator = await this.coordinatorService.updateCoordinator(id, coordinatorData);
      return res.status(200).json(updatedCoordinator);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Unknown error occurred' });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      await this.coordinatorService.deleteCoordinator(id);
      return res.status(204).send();
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
}
