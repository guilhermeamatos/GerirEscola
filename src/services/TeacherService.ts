// src/services/TeacherService.ts

import { TeacherRepository } from '../repositories/TeacherRepository';
import { Teacher as TeacherModel } from '../models/Teacher';
import { CreateTeacherDTO } from '../dto';
import { sign } from 'jsonwebtoken';

export class TeacherService {
  private teacherRepository: TeacherRepository;

  constructor(teacherRepository: TeacherRepository) {
    this.teacherRepository = teacherRepository;
  }

  async createTeacher(teacherData: CreateTeacherDTO): Promise<TeacherModel> {
    return this.teacherRepository.create(teacherData);
  }

  async getTeacherById(id: string): Promise<TeacherModel | null> {
    return this.teacherRepository.findById(id);
  }

  async getAllTeachers(): Promise<TeacherModel[]> {
    return this.teacherRepository.findAll();
  }
  async updateTeacher(id: string, teacherData: Partial<CreateTeacherDTO>): Promise<TeacherModel> {
    const teacher = await this.teacherRepository.findById(id);
    if (!teacher) {
      throw new Error('Teacher not found');
    }
  
    return this.teacherRepository.update(id, teacherData);
  }
  
  async deleteTeacher(id: string): Promise<void> {
    const teacher = await this.teacherRepository.findById(id);
    if (!teacher) {
      throw new Error('Teacher not found');
    }
  
    await this.teacherRepository.delete(id);
  } 
  
  async login(email: string, password: string): Promise<string> {
    const teacher = await this.teacherRepository.findByEmail(email);
    if (!teacher || teacher.password !== password) {
      throw new Error('Invalid credentials');
    }
    const token = sign({ id: teacher.id }, 'your_jwt_secret_key', { expiresIn: '1h' });
    return token;
  }
}
