import { PrismaClient, nivelClass } from '@prisma/client';
import { Class as ClassModel } from '../models/Class';

const prisma = new PrismaClient();

export class ClassRepository {
  // Cria uma nova classe
  async create(
    classData: Omit<ClassModel, 'id' | 'school' | 'teacher' | 'students' | 'numberOfStudents'>
  ): Promise<ClassModel> {
    const newClass = await prisma.class.create({
      data: {
        name: classData.name,
        school_year: classData.schoolYear,
        school_id: classData.schoolId,
        numberOfStudents: 0, // Inicializa como 0
        nivel: classData.level as nivelClass, // Usa o enum gerado pelo Prisma
      },
      include: {
        school: true,
        teachers: true,
        students: true,
      },
    });

    return new ClassModel(
      newClass.id,
      newClass.name,
      newClass.school_year,
      newClass.school_id,
      newClass.numberOfStudents,
      newClass.nivel // Retorna diretamente o valor do enum do Prisma
    );
  }

  // Busca uma classe por ID
  async findById(id: string): Promise<ClassModel | null> {
    const classData = await prisma.class.findUnique({
      where: { id },
      include: {
        school: true,
        teachers: true,
        students: true,
      },
    });

    if (!classData) return null;

    return new ClassModel(
      classData.id,
      classData.name,
      classData.school_year,
      classData.school_id,
      classData.numberOfStudents,
      classData.nivel // Retorna diretamente o valor do enum do Prisma
    );
  }

  // Busca todas as classes
  async findAll(): Promise<ClassModel[]> {
    const classes = await prisma.class.findMany({
      include: {
        school: true,
        teachers: true,
        students: true,
      },
    });

    return classes.map((classData) => {
      return new ClassModel(
        classData.id,
        classData.name,
        classData.school_year,
        classData.school_id,
        classData.numberOfStudents,
        classData.nivel // Retorna diretamente o valor do enum do Prisma
      );
    });
  }

  // Atualiza uma classe por ID
  async update(
    id: string,
    classData: Partial<Omit<ClassModel, 'school' | 'teacher' | 'students' | 'numberOfStudents'>>
  ): Promise<ClassModel> {
    const updatedClass = await prisma.class.update({
      where: { id },
      data: {
        name: classData.name,
        school_year: classData.schoolYear,
        school_id: classData.schoolId,
        nivel: classData.level as nivelClass, // Usa o enum gerado pelo Prisma
      },
      include: {
        school: true,
        teachers: true,
        students: true,
      },
    });

    return new ClassModel(
      updatedClass.id,
      updatedClass.name,
      updatedClass.school_year,
      updatedClass.school_id,
      updatedClass.numberOfStudents,
      updatedClass.nivel // Retorna diretamente o valor do enum do Prisma
    );
  }

  // Remove uma classe por ID
  async delete(id: string): Promise<void> {
    await prisma.class.delete({
      where: { id },
    });
  }
  async findBySchool(schoolId: string): Promise<boolean> {
    try {
      // Tenta encontrar a escola pelo ID
      const school = await prisma.school.findUnique({
        where: { id: schoolId },
      });

      // Retorna true se a escola for encontrada, false caso contrário
      return !!school;
    } catch (error) {
      console.error('Error while checking school existence:', error);
      throw new Error('Unable to verify school existence');
    }
  }
}
