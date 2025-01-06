// src/services/StudentService.ts

import { StudentRepository } from '../repositories/StudentRepository';
import { Student } from '../models/Student';
import { SubjectRepository } from '../repositories/SubjectRepository';
import { SubjectService } from './SubjectService';
import { CreateStudentDTO } from '../dto';
import e from 'express';

export class StudentService {
  private studentRepository: StudentRepository;
  private subjectService: SubjectService;
  private subjectRepository: SubjectRepository;

  constructor(studentRepository: StudentRepository) {
    this.studentRepository = studentRepository;
    this.subjectRepository = new SubjectRepository();
    this.subjectService = new SubjectService(this.subjectRepository);
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


  async validateDataBeforeCreate(studentData: CreateStudentDTO): Promise<void> {
    if(studentData.cpf) {
      const cpfExists = await this.studentRepository.existsCpf(studentData.cpf);
      if (cpfExists) {
        throw new Error(`CPF já está cadastrado: ${studentData.cpf}`);
      }
    }
   
    const schoolExists = await this.studentRepository.existsSchool(studentData.schoolId);
    if (!schoolExists) {
      throw new Error(`Escola não encontrada: ${studentData.schoolId}`);
    }
    if (studentData.classId) {
      const classExists = await this.studentRepository.existsClass(studentData.classId);
      if (!classExists) {
        throw new Error(`Turma não encontrada: ${studentData.classId}`);
      }
    }
  }
  

  async createStudent(studentData: CreateStudentDTO): Promise<Student> {
    try {
        await this.validateDataBeforeCreate(studentData);
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

        const createStudent = await this.studentRepository.create(studentData);
        if (studentData.classId) {
          this.enrollStudentInClass(createStudent.id, studentData.classId);
        }

        return createStudent;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error creating student: ${error.message}`);
        }
        throw new Error('Unknown error occurred while creating student');
    }
  }

  async enrollStudentInClass(studentId: string, classId: string) {
    const subjects = await this.subjectRepository.getSubjectsByClass(classId);
    console.log(subjects.length);

    if (subjects.length === 0) {
      throw new Error('Não há disciplinas associadas a essa classe.');
    }

    const enrollments = subjects.map(subject =>
      this.subjectRepository.createEnrollment(studentId, subject.id)
    );

    await Promise.all(enrollments);

    console.log(`Estudante com ID ${studentId} matriculado em todas as disciplinas da classe ${classId}.`);
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

  async linkStudentToClass(studentId: string, classId: string) {
    const student = await this.studentRepository.findById(studentId);
    const studentExists = await this.studentRepository.checkStudentExists(studentId);
    if (!studentExists) {
      throw new Error('Estudante não encontrado.'); 
    }

    const classExists = await this.studentRepository.checkClassExists(classId);
    if (!classExists) {
      throw new Error('Classe não encontrada.'); 
    }

    if (student?.classId) {
      if (student?.classId === classId) {
        throw new Error('O estudante já está vinculado a esta turma.');
      }

      const currentEnrollments = await this.subjectRepository.getEnrollmentsByStudent(studentId);
      const hasNonTransferableSubjects = currentEnrollments.some((enrollment) => !enrollment.transfer);

      if (hasNonTransferableSubjects) {
        throw new Error(
          'O estudante possui disciplinas que não permitem transferência. Realize a transferência administrativa.'
        );
      }

      for (const enrollment of currentEnrollments) {
        await this.subjectRepository.deleteEnrollment(enrollment.id);
      }


    }

    const updatedStudent = await this.studentRepository.updateStudentClass(studentId, classId);

    await this.enrollStudentInClass(studentId, classId);

    return updatedStudent; 
  }
}
