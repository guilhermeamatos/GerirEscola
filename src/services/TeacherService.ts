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
  async dataValidation(teacherData: CreateTeacherDTO) {
    const { cpf, email, matricula } = teacherData;

    // Verificar CPF
    const existingTeacherByCPF = await this.teacherRepository.getTeacherByCPF(cpf);
    if (existingTeacherByCPF) {
      throw new Error("Um professor já está cadastrado com este CPF.");
    }

    // Verificar Email
    const existingTeacherByEmail = await this.teacherRepository.getTeacherByEmail(email);
    if (existingTeacherByEmail) {
      throw new Error("Um professor já está cadastrado com este email.");
    }

    // Verificar Matricula (se fornecida)
    if (matricula) {
      const existingTeacherByMatricula = await this.teacherRepository.getTeacherByMatricula(matricula);
      if (existingTeacherByMatricula) {
        throw new Error("Um professor já está cadastrado com esta matrícula.");
      }
    }

    return "Validação concluída com sucesso.";
  }
  generatePassword(teacherData: CreateTeacherDTO){
    const password = teacherData.cpf.slice(0, 3) + teacherData.name.split(' ')[0];
    return password;
  }

  async createTeacher(teacherData: CreateTeacherDTO): Promise<TeacherModel> {
    await this.dataValidation(teacherData);
    teacherData.password = this.generatePassword(teacherData)
    return this.teacherRepository.create(teacherData);
  }
  async processSpreadsheet(data: any[]) {
    for (const row of data) {
      const teacherData: CreateTeacherDTO = {
        name: row['name'],
        matricula: row['matricula'],
        concursado: row['concursado'] === 'true',
        cpf: row['cpf'],
        address: row['address'],
        phone: row['phone'],
        email: row['email'],
        password: row['password'],
        specialization: row['specialization'],
      };

      await this.createTeacher(teacherData);
    }
  };

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
  async getTeachersBySchoolId(schoolId: string) {
    if (!schoolId) {
      throw new Error("O ID da escola é obrigatório.");
    }

    // Verificar se a escola existe
    const school = await this.teacherRepository.findSchoolById(schoolId);
    if (!school) {
      throw new Error("Escola não encontrada.");
    }

    const teachers = await this.teacherRepository.findTeachersBySchoolId(schoolId);

    if (!teachers.length) {
      throw new Error("Nenhum professor encontrado para esta escola.");
    }

    return teachers;
  }

}
