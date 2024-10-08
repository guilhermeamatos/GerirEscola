// src/controllers/SchoolController.ts

import { Request, Response } from 'express';
import { SchoolService } from '../services/SchoolService';
import { CreateSchoolDTO } from '../dto';

export class SchoolController {
  private schoolService: SchoolService;

  constructor(schoolService: SchoolService) {
    this.schoolService = schoolService;
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const schoolData: CreateSchoolDTO = req.body;
      const newSchool = await this.schoolService.createSchool(schoolData);
      return res.status(201).json(newSchool);
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
      const school = await this.schoolService.getSchoolById(id);
      if (!school) {
        return res.status(404).json({ message: 'School not found' });
      }
      return res.status(200).json(school);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Unknown error occurred' });
    }
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const schools = await this.schoolService.getAllSchools();
      return res.status(200).json(schools);
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
      const schoolData: Partial<CreateSchoolDTO> = req.body;
      const updatedSchool = await this.schoolService.updateSchool(id, schoolData);
      return res.status(200).json(updatedSchool);
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
      await this.schoolService.deleteSchool(id);
      return res.status(204).send();
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
}
