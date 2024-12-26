import { Nivel } from './enums/Nivel';
export interface CreateClassDTO {
    name: string;
    schoolYear: string;
    schoolId: string;
  }
  
  export interface CreateStudentDTO {
    name: string;
    birthdate: Date;
    cpf: string;
    address: string;
    phone: string;
    email: string;
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
    address: string;
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
  
  