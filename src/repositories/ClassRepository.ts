import { PrismaClient } from '@prisma/client';
import { Class as ClassModel } from '../models/Class'; // Renomeando para evitar conflito com Prisma

const prisma = new PrismaClient();

export class ClassRepository {
  async create(classData: Omit<ClassModel, 'id' | 'school' | 'teacher' | 'students'>): Promise<ClassModel> {
    const newClass = await prisma.class.create({
      data: {
        name: classData.name,
        school_year: classData.schoolYear,
        school_id: classData.schoolId,
        teacher_id: classData.teacherId ?? undefined, 
      },
      include: {
        school: true,
        teacher: true,
        students: true,
      },
    });

    return new ClassModel(
      newClass.id,
      newClass.name,
      newClass.school_year,
      newClass.school_id
    ); 
  }

  async findById(id: string): Promise<ClassModel | null> {
    const classData = await prisma.class.findUnique({
      where: { id },
      include: {
        school: true,
        teacher: true,
        students: true,
      },
    });

    if (!classData) return null;

    return new ClassModel(
      classData.id,
      classData.name,
      classData.school_year,
      classData.school_id
    ); 
  }

  async findAll(): Promise<ClassModel[]> {
    const classes = await prisma.class.findMany({
      include: {
        school: true,
        teacher: true,
        students: true,
      },
    });

    return classes.map((classData) => {
      return new ClassModel(
        classData.id,
        classData.name,
        classData.school_year,
        classData.school_id
      ); 
    });
  }

  async update(id: string, classData: Partial<Omit<ClassModel, 'school' | 'teacher' | 'students'>>): Promise<ClassModel> {
    const updatedClass = await prisma.class.update({
      where: { id },
      data: {
        name: classData.name,
        school_year: classData.schoolYear,
        school_id: classData.schoolId,
        teacher_id: classData.teacherId ?? undefined, 
      },
      include: {
        school: true,
        teacher: true,
        students: true,
      },
    });

    return new ClassModel(
      updatedClass.id,
      updatedClass.name,
      updatedClass.school_year,
      updatedClass.school_id
    ); 
  }

  async delete(id: string): Promise<void> {
    await prisma.class.delete({
      where: { id },
    });
  }
}
