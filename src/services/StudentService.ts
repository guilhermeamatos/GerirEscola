// src/services/StudentService.ts

import { StudentRepository } from '../repositories/StudentRepository';
import { Student } from '../models/Student';
import { CreateStudentDTO } from '../dto';

export class StudentService {
  private studentRepository: StudentRepository;

  constructor(studentRepository: StudentRepository) {
    this.studentRepository = studentRepository;
  }

  async createStudent(studentData: CreateStudentDTO): Promise<Student> {
    try {
      // Verifique se 'birthdate' está presente e o converta para o formato Date
      if (studentData.birthdate) {
        studentData.birthdate = new Date(studentData.birthdate);
      }
  
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
