import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class GradeRepository {
  // Busca disciplina pelo ID
  async findSubjectById(subjectId: string) {
    return prisma.subject.findUnique({
      where: { id: subjectId },
    });
  }

  // Atualiza ou cria valores das avaliações para uma disciplina
  async upsertAssessmentValues(subjectId: string, assessmentValues: any) {
    return prisma.assessmentValue.upsert({
      where: { subject_id: subjectId },
      update: { ...assessmentValues },
      create: {
        subject_id: subjectId,
        ...assessmentValues,
      },
    });
  }

  // Busca os valores de avaliação de uma disciplina
  async findAssessmentValues(subjectId: string) {
    return prisma.assessmentValue.findUnique({
      where: { subject_id: subjectId },
    });
  }

  // Atualiza ou cria as notas de um aluno
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
  
    // Cria ou atualiza as notas
    const gradeRecord = await prisma.grades.upsert({
      where: { id_enrollment: enrollment.id },
      update: { ...grades },
      create: {
        id_enrollment: enrollment.id,
        ...grades,
      },
    });
  
    // Atualiza o campo `gradesid` na matrícula
    await prisma.enrollment.update({
      where: { id: enrollment.id },
      data: {
        gradesid: gradeRecord.id, // Associa o ID das notas ao campo `gradesid`
      },
    });
  
    return gradeRecord;
  }
  

  // Busca notas e valores de avaliação de uma disciplina
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

    const assessmentValues = await prisma.assessmentValue.findUnique({
      where: { subject_id: subjectId },
    });

    return {
      assessmentValues,
      grades: enrollments.map((enrollment) => ({
        studentId: enrollment.student.id,
        studentName: enrollment.student.name,
        grades: enrollment.grade || {},
      })),
    };
  }
}
