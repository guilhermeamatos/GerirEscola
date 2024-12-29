import { PrismaClient } from '@prisma/client';
import { Teacher as TeacherModel } from '../models/Teacher'; 
const prisma = new PrismaClient();

export class TeacherRepository {
  
  async create(teacherData: Omit<TeacherModel, 'id' | 'classes'>): Promise<TeacherModel> {
    const newTeacher = await prisma.teacher.create({
      data: {
        name: teacherData.name,
        cpf: teacherData.cpf,
        address: teacherData.address,
        phone: teacherData.phone,
        email: teacherData.email,
        password: teacherData.password,
        specialization: teacherData.specialization,
        matricula: teacherData.matricula,
        concursado: teacherData.concursado,
      },
      include: {
        classes: true, 
      },
    });

    return new TeacherModel(
      newTeacher.id,
      newTeacher.name,
      newTeacher.cpf,
      newTeacher.address,
      newTeacher.phone,
      newTeacher.email,
      "",
      newTeacher.specialization ?? "",
      newTeacher.matricula ?? "",
      newTeacher.concursado ?? false // Use um valor padrão para booleano, se necessário
    );
  }

  async findById(id: string): Promise<TeacherModel | null> {
    const teacher = await prisma.teacher.findUnique({
      where: { id },
      include: {
        classes: true, 
      },
    });

    if (!teacher) return null;

    return new TeacherModel(
      teacher.id,
      teacher.name,
      teacher.cpf,
      teacher.address,
      teacher.phone,
      teacher.email,
      "",
      teacher.specialization ?? "",
      teacher.matricula ?? "",
      teacher.concursado ?? false
    );
  }

  async findAll(): Promise<TeacherModel[]> {
    const teachers = await prisma.teacher.findMany({
      include: {
        classes: true, 
      },
    });

    return teachers.map((teacher) => {
      return new TeacherModel(
        teacher.id,
        teacher.name,
        teacher.cpf,
        teacher.address,
        teacher.phone,
        teacher.email,
        "",
        teacher.specialization ?? "",
        teacher.matricula ?? "",
        teacher.concursado ?? false
      );
    });
  }

  async update(id: string, teacherData: Partial<Omit<TeacherModel, 'id' | 'classes'>>): Promise<TeacherModel> {
    const updatedTeacher = await prisma.teacher.update({
      where: { id },
      data: {
        name: teacherData.name,
        cpf: teacherData.cpf,
        address: teacherData.address,
        phone: teacherData.phone,
        email: teacherData.email,
        specialization: teacherData.specialization,
      },
      include: {
        classes: true, 
      },
    });

    return new TeacherModel(
      updatedTeacher.id,
      updatedTeacher.name,
      updatedTeacher.cpf,
      updatedTeacher.address,
      updatedTeacher.phone,
      updatedTeacher.email,
      "",
      updatedTeacher.specialization ?? "",
      updatedTeacher.matricula ?? "",
      updatedTeacher.concursado ?? false
    );
  }

  async delete(id: string): Promise<void> {
    await prisma.teacher.delete({
      where: { id },
    });
  }

  async findByEmail(email: string) {
    return prisma.teacher.findUnique({
      where: { email },
    });
  }
  async getTeacherByCPF(cpf: string) {
    return prisma.teacher.findUnique({
      where: { cpf },
    });
  }

  async getTeacherByEmail(email: string) {
    return prisma.teacher.findUnique({
      where: { email },
    });
  }

  async getTeacherByMatricula(matricula: string) {
    return prisma.teacher.findUnique({
      where: { matricula },
    });
  }
  async findTeachersBySchoolId(schoolId: string) {
    return await prisma.teacher.findMany({
      where: {
        schools: {
          some: {
            id: schoolId,
          },
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        specialization: true,
      },
    });
  }

}
