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
        specialization: teacherData.specialization,
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
      newTeacher.specialization
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
      teacher.specialization
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
        teacher.specialization
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
      updatedTeacher.specialization
    );
  }

  
  async delete(id: string): Promise<void> {
    await prisma.teacher.delete({
      where: { id },
    });
  }
}
