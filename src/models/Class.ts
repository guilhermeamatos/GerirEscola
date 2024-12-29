
import { School } from './School';
import { Teacher } from './Teacher';
import { Student } from './Student';
import { PrismaClient, nivelClass } from '@prisma/client';

export class Class {
    id: string;
    name: string;
    schoolYear: number;
    numberOfStudents: number;
    schoolId: string;
    school?: School;
    level: nivelClass
    teachersId?: string[] = [];
    teachers?: Teacher[] = [];
    students: Student[] = [];
  
    constructor(id: string, name: string, schoolYear: number,  schoolId: string, numberOfStudents: number, level: nivelClass) {
      this.numberOfStudents = 0;
      this.id = id;
      this.name = name;
      this.schoolYear = schoolYear;
      this.schoolId = schoolId;
      this.level = level;
    }
  }
  