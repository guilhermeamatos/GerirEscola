// src/controllers/TeacherController.ts

import { Request, Response } from 'express';
import { TeacherService } from '../services/TeacherService';
import { CreateTeacherDTO } from '../dto';

export class TeacherController {
  private teacherService: TeacherService;

  constructor(teacherService: TeacherService) {
    this.teacherService = teacherService;
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const teacherData: CreateTeacherDTO = req.body;
      const newTeacher = await this.teacherService.createTeacher(teacherData);
      return res.status(201).json(newTeacher);
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
      const teacher = await this.teacherService.getTeacherById(id);
      if (!teacher) {
        return res.status(404).json({ message: 'Teacher not found' });
      }
      return res.status(200).json(teacher);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Unknown error occurred' });
    }
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const teachers = await this.teacherService.getAllTeachers();
      return res.status(200).json(teachers);
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
      const teacherData: Partial<CreateTeacherDTO> = req.body;
      const updatedTeacher = await this.teacherService.updateTeacher(id, teacherData);
      return res.status(200).json(updatedTeacher);
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
      await this.teacherService.deleteTeacher(id);
      return res.status(204).send();
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
}
