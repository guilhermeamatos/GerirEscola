// src/services/ClassService.ts

import { ClassRepository } from '../repositories/ClassRepository';
import { Class as ClassModel } from '../models/Class';
import { CreateClassDTO } from '../dto';
import { SubjectRepository } from '../repositories/SubjectRepository';
import { SubjectService } from './SubjectService';
import { SchoolRepository } from '../repositories/SchoolRepository';

export class ClassService {
  private classRepository: ClassRepository;
  private subjectService: SubjectService;
  private schoolRepository: SchoolRepository;

  constructor(classRepository: ClassRepository) {
    this.classRepository = classRepository;
    this.subjectService = new SubjectService(new SubjectRepository());
    this.schoolRepository = new SchoolRepository();
  }
  async validateClass(classData: CreateClassDTO): Promise<void> {
    const existSchool = await this.classRepository.findBySchool(classData.schoolId);
    if (!existSchool) {
      throw new Error('School not found');
    }
  }

  async createClass(classData: CreateClassDTO): Promise<ClassModel> {
    let createdSubjects;

    if (classData.level === "FUNDAMENTAL_1") {
      createdSubjects = await this.subjectService.createSubjectsForFundamental1();
    } else if (classData.level === "FUNDAMENTAL_2") {
      createdSubjects = await this.subjectService.createSubjectsForFundamental2();
    }

    await this.validateClass(classData);

    
    const createdClass = await this.classRepository.create(classData);

    
    const subjectIds = createdSubjects?.map(subject => subject.id);
    if (subjectIds) {
      await this.classRepository.relateSubjectsToClass(createdClass.id, subjectIds);
    }
    return createdClass;
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

  async getClassesBySchoolId(schoolId: string): Promise<ClassModel[]> {
    if (!schoolId) {
      throw new Error('O ID da escola é obrigatório.');
    }

    const classes = await this.classRepository.findClassesBySchoolId(schoolId);
    if (classes.length === 0) {
      throw new Error('Nenhuma turma encontrada para a escola fornecida.');
    }

    return classes;
  }

  async getClassesBySchoolAndYear(schoolId: string, schoolYear: number) {
    if (!schoolId || !schoolYear) {
      throw new Error('School ID and School Year are required');
    }

    // Verifica se a escola existe
    const school = await this.schoolRepository.findById(schoolId);
    if (!school) {
      throw new Error('School not found');
    }

    // Busca as turmas
    const classes = await this.classRepository.findClassesBySchoolAndYear(schoolId, schoolYear);

    if (!classes || classes.length === 0) {
      throw new Error('No classes found for the specified school and year');
    }

    return classes;
  }
}
