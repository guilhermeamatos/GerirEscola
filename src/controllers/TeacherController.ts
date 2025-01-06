// src/controllers/TeacherController.ts

import { Request, Response } from 'express';
import { TeacherService } from '../services/TeacherService';
import { CreateTeacherDTO } from '../dto';
import * as fs from 'fs';
import * as xlsx from 'xlsx';

export class TeacherController {
  private teacherService: TeacherService;

  constructor(teacherService: TeacherService) {
    this.teacherService = teacherService;
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const teacherData: CreateTeacherDTO = req.body;
      console.log(req.body);
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
  
      // O service já lida com a verificação de existência e lança um erro
      const updatedTeacher = await this.teacherService.updateTeacher(id, teacherData);
      return res.status(200).json(updatedTeacher);
    } catch (error) {
      if (error instanceof Error && error.message === 'Teacher not found') {
        // Retorna 404 quando o professor não é encontrado
        return res.status(404).json({ message: error.message });
      }
      // Outros erros são tratados com status 500
      return res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
  
  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
  
      // O service já lida com a verificação de existência e lança um erro
      await this.teacherService.deleteTeacher(id);
      return res.status(204).send(); // Sucesso, sem conteúdo
    } catch (error) {
      if (error instanceof Error && error.message === 'Teacher not found') {
        // Retorna 404 quando o professor não é encontrado
        return res.status(404).json({ message: error.message });
      }
      // Outros erros são tratados com status 500
      return res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }

  async login(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;
      const token = await this.teacherService.login(email, password);
      return res.status(200).json({ token });
    } catch (error) {
      return res.status(401).json({ message: 'Invalid credentials' });
   }
  }

  
  public processTeacherSpreadsheet = async (req: Request, res: Response) => {
    const filePath = req.file?.path;

    if (!filePath) {
      return res.status(400).json({ error: 'Nenhum arquivo foi enviado' });
    }

    try {
      const fileBuffer = fs.readFileSync(filePath);
      const workbook = xlsx.read(fileBuffer, { type: 'buffer' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const data = xlsx.utils.sheet_to_json(worksheet);

      await this.teacherService.processSpreadsheet(data);

      res.status(200).json({ message: 'Professores criados com sucesso' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao processar a planilha' });
    } finally {
      fs.unlinkSync(filePath); // Remove o arquivo após o processamento
    }
  };

  async getTeachersBySchoolIdController(req: Request, res: Response) {
    const { schoolId } = req.params;

    try {
      const teachers = await this.teacherService.getTeachersBySchoolId(schoolId);
      return res.status(200).json(teachers);
    } catch (error) {
      return res.status(400).json({
        message: (error instanceof Error) ? error.message : 'Unknown error occurred',
      });
    }
  }
}