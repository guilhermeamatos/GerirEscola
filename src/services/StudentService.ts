// src/services/StudentService.ts

import { StudentRepository } from '../repositories/StudentRepository';
import { Student } from '../models/Student';
import { CreateStudentDTO } from '../dto';

export class StudentService {
  private studentRepository: StudentRepository;

  constructor(studentRepository: StudentRepository) {
    this.studentRepository = studentRepository;
  }
  async generateMatricula(): Promise<string> {
    const year = new Date().getFullYear().toString().slice(-2); // Últimos dois dígitos do ano atual
  
    while (true) {
      // Gera um número aleatório de 5 dígitos
      const randomNumber = Math.floor(10000 + Math.random() * 90000);
      const matricula = `${year}${randomNumber}`;
  
      // Verifica se a matrícula já existe
      const exists = await this.studentRepository.existsMatricula(matricula);
  
      if (!exists) {
        return matricula; // Retorna a matrícula se for única
      }
    }
  }
  generatePassword(studentData: CreateStudentDTO): string {
    const day = (studentData.birthdate.getUTCDate()).toString().padStart(2, '0');
    const month = (studentData.birthdate.getMonth() + 1).toString().padStart(2, '0');

    
    const name = studentData.name.split(' ')[0]
      .normalize('NFD') 
      .replace(/[\u0300-\u036f]/g, '') 
      .toLowerCase();

    
    return `${day}${month}${name}`;
  }

  async createStudent(studentData: CreateStudentDTO): Promise<Student> {
    try {
        if (studentData.birthdate) {
            if (typeof studentData.birthdate === 'string') {
                const parsedDate = new Date(studentData.birthdate);
                if (isNaN(parsedDate.getTime())) {
                    throw new Error('Data de nascimento inválida. Use um formato válido.');
                }
                studentData.birthdate = new Date(parsedDate.toISOString().split('T')[0]);
            }
        }
        studentData.matricula = await this.generateMatricula();
        studentData.password = this.generatePassword(studentData);

        return await this.studentRepository.create(studentData);
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error creating student: ${error.message}`);
        }
        throw new Error('Unknown error occurred while creating student');
    }
  }


  async getStudentById(id: string): Promise<Student | null> {
    try {
      return await this.studentRepository.findById(id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error fetching student: ${error.message}`);
      }
      throw new Error('Unknown error occurred while fetching student');
    }
  }

  async getAllStudents(): Promise<Student[]> {
    try {
      return await this.studentRepository.findAll();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error fetching students: ${error.message}`);
      }
      throw new Error('Unknown error occurred while fetching students');
    }
  }

  async updateStudent(id: string, studentData: Partial<CreateStudentDTO>): Promise<Student> {
    const student = await this.studentRepository.findById(id);
    if (!student) {
      throw new Error('Student not found');
    }
  
    // Converte a data de nascimento para o formato Date, se estiver presente
    if (studentData.birthdate) {
      studentData.birthdate = new Date(studentData.birthdate);
    }
  
    return await this.studentRepository.update(id, studentData);
  }
  
  async deleteStudent(id: string): Promise<void> {
    const student = await this.studentRepository.findById(id);
    if (!student) {
      throw new Error('Student not found');
    }
  
    await this.studentRepository.delete(id);
  }
}
