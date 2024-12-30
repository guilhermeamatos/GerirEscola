import { PrismaClient } from '@prisma/client';
import { Student as StudentModel } from '../models/Student';

const prisma = new PrismaClient();

export class StudentRepository {
  async create(studentData: Omit<StudentModel, 'id' | 'class' | 'classId'>): Promise<StudentModel> {
    try {
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
        newStudent.cpf,
        newStudent.address ?? "",
        newStudent.phone ?? "",
        newStudent.email ?? "",
        newStudent.school_year,
        newStudent.matricula ?? "",
        newStudent.password ?? "",
        newStudent.school.id
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
      student.cpf,
      student.address ?? "",
      student.school_year.toString(),
      student.email ?? "",
      student.school_year,
      student.matricula ?? "",
      student.password ?? "",
      student.school_id
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
        student.cpf,
        student.address ?? "",
        student.phone ?? "",
        student.email ?? "",
        student.school_year,
        student.matricula ?? "",
        student.password ?? "",
        student.school_id
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
      updatedStudent.cpf,
      updatedStudent.address ?? "",
      updatedStudent.phone ?? "",
      updatedStudent.email ?? "",
      updatedStudent.school_year,
      updatedStudent.matricula ?? "",
      updatedStudent.password ?? "",
      studentData.schoolId ?? ""
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
}
