// src/services/TeacherService.ts

import { TeacherRepository } from '../repositories/TeacherRepository';
import { Teacher as TeacherModel } from '../models/Teacher';
import { CreateTeacherDTO } from '../dto';

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
    return this.teacherRepository.update(id, teacherData);
  }

  async deleteTeacher(id: string): Promise<void> {
    await this.teacherRepository.delete(id);
  }
}
