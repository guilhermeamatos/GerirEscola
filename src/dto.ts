import { Nivel } from './enums/Nivel';
import {nivelClass } from '@prisma/client';
export interface CreateClassDTO {
    name: string;
    schoolYear: number;
    schoolId: string;
    level: nivelClass;
  }
  
  export interface CreateStudentDTO {
    name: string;
    birthdate: Date;
    cpf: string;
    address: string;
    phone: string;
    email: string;
    schoolYear: number;
    matricula: string;
    password: string;
    schoolId: string;
    classId: string;
  }
  
  export interface CreateTeacherDTO {
    name: string;
    matricula: string;
    concursado: boolean;
    cpf: string;
    address: string;
    phone: string;
    email: string;
    password: string;
    specialization: string;
  }

  export interface TeacherResponseDTO {
    id: string;
    name: string;
    matricula: string;
    concursado: boolean;
    cpf: string;
    address: string;
    phone: string;
    email: string;
    specialization: string;
    classes: any[]; // Ajuste conforme necessário
    schools: string[]; // Lista dos nomes das escolas associadas
  }
  
  export interface TeacherLoginDTO {
    id: string;
    password: string;
  }
  
  export interface CreateCoordinatorDTO {
    name: string;
    cpf: string;
    address: string;
    phone: string;
    email: string;
    password: string;
    schoolId: string;
  }
  
  export interface CreateManagerDTO {
    name: string;
    cpf: string;
    phone: string;
    email: string;
    password: string;
    schoolId: string;
  }
  // src/dto.ts

export interface CreateSchoolDTO {
    name: string;
    address: string;
    phone: string;
    email: string;
    nivel: Nivel;
  }
  
  