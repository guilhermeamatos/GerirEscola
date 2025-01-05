import { PrismaClient } from "@prisma/client";
import Subject from "../models/Subject";
import { nameSubjects } from '@prisma/client';

type OmitIdSubject = Omit<Subject, "id">;

const prisma = new PrismaClient();

export class SubjectRepository {
    async create(nome: nameSubjects): Promise<Subject> {
        try {
            const subject = await prisma.subject.create({
                data: {
                    name: nome
                },
            });
    
            return subject; // Retorna a subject criada
        } catch (error) {
            console.error("Erro ao criar a subject:", error);
            throw error; // Relança o erro para ser tratado no nível superior
        }
    }

    async getSubjectsByClass(classId: string) {
        return prisma.subject.findMany({
          where: {
            class_id: classId,
          },
        });
      }

    async createEnrollment(studentId: string, subjectId: string) {
    return prisma.enrollment.create({
        data: {
        student_id: studentId,
        subject_id: subjectId,
        grade: null, // Inicialmente a nota é nula
        attendance: null, // Inicialmente a frequência é nula
          },
        });
      }
}