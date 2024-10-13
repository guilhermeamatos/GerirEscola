// src/controllers/StudentController.ts

import { Request, Response } from 'express';
import { StudentService } from '../services/StudentService';
import { CreateStudentDTO } from '../dto';

export class StudentController {
  private studentService: StudentService;

  constructor(studentService: StudentService) {
    this.studentService = studentService;
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const studentData: CreateStudentDTO = req.body;
      const newStudent = await this.studentService.createStudent(studentData);
      return res.status(201).json(newStudent);
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
      const student = await this.studentService.getStudentById(id);
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }
      return res.status(200).json(student);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Unknown error occurred' });
    }
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const students = await this.studentService.getAllStudents();
      return res.status(200).json(students);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Unknown error occurred' });
    }
  }

  // Método para atualizar um estudante
// Método para atualizar um estudante
async update(req: Request, res: Response): Promise<Response> {
  try {
    const { id } = req.params;
    const studentData: Partial<CreateStudentDTO> = req.body;

    const updatedStudent = await this.studentService.updateStudent(id, studentData);
    return res.status(200).json(updatedStudent);
  } catch (error) {
    if (error instanceof Error && error.message === 'Student not found') {
      return res.status(404).json({ message: error.message });
    }
    return res.status(500).json({ error: 'An unexpected error occurred' });
  }
}

// Método para deletar um estudante
async delete(req: Request, res: Response): Promise<Response> {
  try {
    const { id } = req.params;

    await this.studentService.deleteStudent(id);
    return res.status(204).send(); // Sucesso, sem conteúdo
  } catch (error) {
    if (error instanceof Error && error.message === 'Student not found') {
      return res.status(404).json({ message: error.message });
    }
    return res.status(500).json({ error: 'An unexpected error occurred' });
  }
  }
}
