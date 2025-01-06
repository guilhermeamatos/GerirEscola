import { PrismaClient, nivelClass } from '@prisma/client';
import { Class as ClassModel } from '../models/Class';

const prisma = new PrismaClient();

export class ClassRepository {
  // Cria uma nova classe
  async create(
    classData: Omit<ClassModel, 'id' | 'school' | 'teacher' | 'students' | 'numberOfStudents'|'subjects'>
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
      newClass.nivel,
      [],
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
      classData.nivel,
      [],
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
        classData.nivel,
        [],
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
      updatedClass.nivel,
      [],
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

  async findClassesBySchoolId(schoolId: string): Promise<ClassModel[]> {
    const classesFound = await prisma.class.findMany({
      where: {
        school_id: schoolId,
      },
      include: {
        subjects: true,  // Incluir as disciplinas associadas a cada turma
      },
    });
  
    return classesFound.map((classData) => new ClassModel(
      classData.id,
      classData.name,
      classData.school_year,
      classData.school_id,
      classData.numberOfStudents,
      classData.nivel,
      classData.subjects || [],  // Adicionando as disciplinas associadas
    ));
  }

   async relateSubjectsToClass(classId: string, subjectIds: string[]): Promise<void> {
    const updateOperations = subjectIds.map(subjectId => {
      return prisma.subject.update({
        where: { id: subjectId },
        data: { class_id: classId },
      });
    });

    await prisma.$transaction(updateOperations);
  }


  async findClassesBySchoolAndYear(schoolId: string, schoolYear: number) {
    return prisma.class.findMany({
      where: {
        school_id: schoolId,
        school_year: schoolYear,
      },
      include: {
        school: true,
        teachers: {
          include: { teacher: true },
        },
        students: true,
        subjects: true,
      },
    });
  }
  

}
