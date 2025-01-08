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
      const studentData: CreateStudentDTO = {
        name: req.body.name,
        email: req.body.email,
        birthdate: req.body.birthdate,
        classId: req.body.classId,
        schoolId: req.body.schoolId,
        cpf: req.body.cpf,
        address: req.body.address,
        phone: req.body.phone,
        schoolYear: parseInt(req.body.schoolYear, 10),
        matricula: req.body.matricula,
        password: req.body.password,
      };
      const newStudent = await this.studentService.createStudent(studentData);
      return res.status(201).json(newStudent);
    } catch (error) {
      console.error('Error creating student:', error);
      if (error instanceof Error) {
        if (error.message.includes('CPF já está cadastrado')) {
          return res.status(409).json({ error: error.message }); 
        }else if (error.message.includes('Escola não encontrada')) {
          return res.status(404).json({ error: error.message }); 
        }else  if (error.message.includes('Turma não encontrada')) {
          return res.status(404).json({ error: error.message }); 
        }
   
        
        else {
          return res.status(500).json({ error: error.message });
        }

       
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

  async linkStudentToClass(req: Request, res: Response) {
    const { studentId, classId } = req.body;

    try {
      // Chama o serviço para vincular estudante à classe
      const updatedStudent = await this.studentService.linkStudentToClass(studentId, classId);

      // Retorna o estudante atualizado
      res.status(200).json({
        message: 'Estudante vinculado à classe com sucesso.',
        student: updatedStudent,
      });
    } catch (error) {
      // Trata erros e retorna uma mensagem adequada
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: 'Unknown error occurred' });
      }
    }
  }

  async getStudentsBySchoolAndYear(req: Request, res: Response) {
    const { schoolId, schoolYear } = req.params;

    try {
      // Valida os parâmetros
      if (!schoolId || !schoolYear) {
        return res
          .status(400)
          .json({ error: "schoolId and schoolYear are required" });
      }
      const year = parseInt(schoolYear, 10);
      if (isNaN(year)) {
        return res.status(400).json({ error: "Invalid year" });
      }
      const students = await this.studentService.getStudentsBySchoolAndYear(schoolId, year);

      return res.status(200).json(students);
    } catch (error) {
      console.log(error);
      if (error instanceof Error && error.message === "School not found") {
        return res.status(404).json({ error: "School not found" });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getStudentsBySubject(req: Request, res: Response) {
    const { subjectId } = req.params;
    console.log(subjectId);
    try {
      const students = await this.studentService.getStudentsBySubject(subjectId);
      return res.status(200).json(students);
    } catch (error: any) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }
}
