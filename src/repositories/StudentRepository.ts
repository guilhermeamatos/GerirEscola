import { PrismaClient } from '@prisma/client';
import { Student as StudentModel } from '../models/Student';

const prisma = new PrismaClient();

export class StudentRepository {
  async create(studentData: Omit<StudentModel, 'id' | 'class'> & { classId?: string }): Promise<StudentModel> {
    try {
      console.log(studentData);
      const newStudent = await prisma.student.create({
        data: {
          name: studentData.name,
          birthdate: studentData.birthdate,
          cpf: studentData.cpf,
          address: studentData.address,
          phone: studentData.phone,
          email: studentData.email,
          school_year: studentData.schoolYear,
          matricula: studentData.matricula,
          password: studentData.password,
          // Relacionamento com a escola usando connect
          school: {
            connect: {
              id: studentData.schoolId, 
            },
          },
          class: studentData.classId ? {
            connect: {
              id: studentData.classId,
            },
          } : undefined,
        },
        include: {
          class: true,
          school: true,
        },
      });
  
      return new StudentModel(
        newStudent.id,
        newStudent.name,
        newStudent.birthdate,
        newStudent.cpf ?? "",
        newStudent.address ?? "",
        newStudent.phone ?? "",
        newStudent.email ?? "",
        newStudent.school_year,
        newStudent.matricula ?? "",
        newStudent.password ?? "",
        newStudent.school.id,
        newStudent.class_id?? ""
      );
    } catch (error) {
      console.error("Error creating student:", error);
      throw new Error("Failed to create student");
    }
  }
  
  async findById(id: string): Promise<StudentModel | null> {
    const student = await prisma.student.findUnique({
      where: { id },
      include: {
        class: true,
      },
    });

    if (!student) return null;

    return new StudentModel(
      student.id,
      student.name,
      student.birthdate,
      student.cpf ?? "",
      student.address ?? "",
      student.school_year.toString(),
      student.email ?? "",
      student.school_year,
      student.matricula ?? "",
      student.password ?? "",
      student.school_id,
      student.class_id?? ""
    );
  }

  async findAll(): Promise<StudentModel[]> {
    const students = await prisma.student.findMany({
      include: {
        class: true,
      },
    });

    return students.map((student) => {
      return new StudentModel(
        student.id,
        student.name,
        student.birthdate,
        student.cpf ?? "",
        student.address ?? "",
        student.phone ?? "",
        student.email ?? "",
        student.school_year,
        student.matricula ?? "",
        student.password ?? "",
        student.school_id,
        student.class_id?? ""
      );
    });
  }

  async update(id: string, studentData: Partial<Omit<StudentModel, 'id' | 'class'>>): Promise<StudentModel> {
    const updatedStudent = await prisma.student.update({
      where: { id },
      data: {
        name: studentData.name,
        birthdate: studentData.birthdate,
        cpf: studentData.cpf,
        address: studentData.address,
        phone: studentData.phone,
        email: studentData.email,
        school_year: studentData.schoolYear ?? undefined,
        password: studentData.password ?? undefined,
        matricula: studentData.matricula ?? undefined,
        class_id: studentData.classId ?? undefined,
        school_id: studentData.schoolId ?? undefined,
      },
      include: {
        class: true,
      },
    });

    return new StudentModel(
      updatedStudent.id,
      updatedStudent.name,
      updatedStudent.birthdate,
      updatedStudent.cpf ?? "",
      updatedStudent.address ?? "",
      updatedStudent.phone ?? "",
      updatedStudent.email ?? "",
      updatedStudent.school_year,
      updatedStudent.matricula ?? "",
      updatedStudent.password ?? "",
      updatedStudent.school_id ?? "",
      updatedStudent.class_id?? ""
    );
  }

  async delete(id: string): Promise<void> {
    await prisma.student.delete({
      where: { id },
    });
  }

  async existsMatricula(matricula: string): Promise<boolean> {
    const existingStudent = await prisma.student.findUnique({
      where: {
        matricula,
      },
    });
    return !!existingStudent; 
  }

  async existsCpf(cpf: string): Promise<boolean> {
    const student = await prisma.student.findUnique({
      where: { cpf }, // Procura um estudante pelo CPF
    });
    return !!student; // Retorna true se encontrar, false caso contrário
  }

  async existsSchool(school_id: string): Promise<boolean> {
    const school = await prisma.school.findUnique({
      where: { id: school_id },
    });
    return !!school; // Retorna true se a escola existir
  }

  
  async existsClass(class_id: string): Promise<boolean> {
    const classRecord = await prisma.class.findUnique({
      where: { id: class_id },
    });
    return !!classRecord; // Retorna true se a turma existir
  }

   // Verifica se o estudante existe
   async checkStudentExists(studentId: string) {
    return prisma.student.findUnique({
      where: { id: studentId },
    });
  }

  // Verifica se a classe existe
  async checkClassExists(classId: string) {
    return prisma.class.findUnique({
      where: { id: classId },
    });
  }

  // Atualiza o estudante com o ID da classe
  async updateStudentClass(studentId: string, classId: string) {
    return prisma.student.update({
      where: { id: studentId },
      data: { class_id: classId },
    });
  }

  async findStudentsBySchoolAndYear(schoolId: string, schoolYear: number) {
    return prisma.student.findMany({
      where: {
        school_id: schoolId,
        school_year: schoolYear,
      },
      include: {
        class: true, 
        school: true, 
      },
    });
  }

  async doesSchoolExist(schoolId: string) {
    const school = await prisma.school.findUnique({
      where: { id: schoolId },
    });
    return !!school; 
  }
}