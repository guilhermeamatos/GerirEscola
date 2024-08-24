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
    try {
      return await this.studentRepository.update(id, studentData);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error updating student: ${error.message}`);
      }
      throw new Error('Unknown error occurred while updating student');
    }
  }

  async deleteStudent(id: string): Promise<void> {
    try {
      await this.studentRepository.delete(id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error deleting student: ${error.message}`);
      }
      throw new Error('Unknown error occurred while deleting student');
    }
  }
}
