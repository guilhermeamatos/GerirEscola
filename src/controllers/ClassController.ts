// src/controllers/ClassController.ts

import { Request, Response } from 'express';
import { ClassService } from '../services/ClassService';
import { CreateClassDTO } from '../dto';

export class ClassController {
  private classService: ClassService;

  constructor(classService: ClassService) {
    this.classService = classService;
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const classData: CreateClassDTO = {
        name: req.body.name,
        schoolId: req.body.schoolId,
        schoolYear: parseInt(req.body.schoolYear, 10),
        level: req.body.level,
      }
      
      const newClass = await this.classService.createClass(classData);
      return res.status(201).json(newClass);
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
      const classData = await this.classService.getClassById(id);
      if (!classData) {
        return res.status(404).json({ message: 'Class not found' });
      }
      return res.status(200).json(classData);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Unknown error occurred' });
    }
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const classes = await this.classService.getAllClasses();
      return res.status(200).json(classes);
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
      const classData: Partial<CreateClassDTO> = req.body;
      const updatedClass = await this.classService.updateClass(id, classData);
      return res.status(200).json(updatedClass);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Class not found') {
          return res.status(404).json({ error: 'Class not found' }); // Retorna 404 se a classe não for encontrada
        }
        return res.status(500).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
  
  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      await this.classService.deleteClass(id);
      return res.status(204).send(); // Retorna 204 se a exclusão foi bem-sucedida
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Class not found') {
          return res.status(404).json({ error: 'Class not found' }); // Retorna 404 se a classe não for encontrada
        }
        return res.status(500).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Unknown error occurred' });
    }
  }

  async getClassesBySchoolId(req: Request, res: Response): Promise<void> {
    try {
      const { schoolId } = req.params; // Pega o ID da escola dos parâmetros da URL
      const classes = await this.classService.getClassesBySchoolId(schoolId);
      res.status(200).json(classes); // Retorna as turmas em JSON
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
  
}
