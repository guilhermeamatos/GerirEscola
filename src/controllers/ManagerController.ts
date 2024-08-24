// src/controllers/ManagerController.ts

import { Request, Response } from 'express';
import { ManagerService } from '../services/ManagerService';
import { CreateManagerDTO } from '../dto';

export class ManagerController {
  private managerService: ManagerService;

  constructor(managerService: ManagerService) {
    this.managerService = managerService;
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const managerData: CreateManagerDTO = req.body;
      const newManager = await this.managerService.createManager(managerData);
      return res.status(201).json(newManager);
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
      const manager = await this.managerService.getManagerById(id);
      if (!manager) {
        return res.status(404).json({ message: 'Manager not found' });
      }
      return res.status(200).json(manager);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Unknown error occurred' });
    }
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const managers = await this.managerService.getAllManagers();
      return res.status(200).json(managers);
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
      const managerData: Partial<CreateManagerDTO> = req.body;
      const updatedManager = await this.managerService.updateManager(id, managerData);
      return res.status(200).json(updatedManager);
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
      await this.managerService.deleteManager(id);
      return res.status(204).send();
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
}
