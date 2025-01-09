import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class GradeRepository {
  async findSubjectById(subjectId: string) {
    return prisma.subject.findUnique({
      where: { id: subjectId },
    });
  }

  async upsertGrade(subjectId: string, studentId: string, grades: any) {
    const enrollment = await prisma.enrollment.findUnique({
      where: {
        student_id_subject_id: {
          student_id: studentId,
          subject_id: subjectId,
        },
      },
    });
  
    if (!enrollment) {
      throw { status: 404, message: 'Matrícula não encontrada para o aluno e a disciplina.' };
    }
  
    // Cria ou atualiza a entrada em Grades
    const grade = await prisma.grades.upsert({
      where: { id_enrollment: enrollment.id },
      update: { ...grades },
      create: {
        id_enrollment: enrollment.id,
        ...grades,
      },
    });
  
    // Atualiza o campo gradesid na tabela Enrollment
    await prisma.enrollment.update({
      where: { id: enrollment.id },
      data: {
        gradesid: grade.id,
      },
    });
  
    return grade;
  }
  

  async findGradesBySubject(subjectId: string) {
    const enrollments = await prisma.enrollment.findMany({
      where: { subject_id: subjectId },
      include: {
        student: {
          select: {
            id: true,
            name: true,
          },
        },
        grade: true,
      },
    });
    
    return enrollments.map((enrollment) => ({
      studentId: enrollment.student.id,
      studentName: enrollment.student.name,
      grades: enrollment.grade,
    }));
  }
}
