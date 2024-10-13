// src/services/ClassService.ts

import { ClassRepository } from '../repositories/ClassRepository';
import { Class as ClassModel } from '../models/Class';
import { CreateClassDTO } from '../dto';

export class ClassService {
  private classRepository: ClassRepository;

  constructor(classRepository: ClassRepository) {
    this.classRepository = classRepository;
  }

  async createClass(classData: CreateClassDTO): Promise<ClassModel> {
    return this.classRepository.create(classData);
  }

  async getClassById(id: string): Promise<ClassModel | null> {
    return this.classRepository.findById(id);
  }

  async getAllClasses(): Promise<ClassModel[]> {
    return this.classRepository.findAll();
  }

  async updateClass(id: string, classData: Partial<CreateClassDTO>): Promise<ClassModel> {
    // Verifica se a classe existe
    const existingClass = await this.classRepository.findById(id);
    if (!existingClass) {
      throw new Error('Class not found'); // Pode ser substituído por um erro customizado se houver
    }
    
    // Se a classe existe, realiza a atualização
    return this.classRepository.update(id, classData);
  }
  
  async deleteClass(id: string): Promise<void> {
    // Verifica se a classe existe
    const existingClass = await this.classRepository.findById(id);
    if (!existingClass) {
      throw new Error('Class not found'); // Pode ser substituído por um erro customizado se houver
    }
  
    // Se a classe existe, realiza a exclusão
    await this.classRepository.delete(id);
  }  
}
