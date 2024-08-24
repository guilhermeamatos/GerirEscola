
import { School } from './School';
import { Teacher } from './Teacher';
import { Student } from './Student';

export class Class {
    id: string;
    name: string;
    schoolYear: string;
    schoolId: string;
    school?: School;
    teacherId?: string; 
    teacher?: Teacher;
    students: Student[] = [];
  
    constructor(id: string, name: string, schoolYear: string,  schoolId: string) {
      this.id = id;
      this.name = name;
      this.schoolYear = schoolYear;
      this.schoolId = schoolId;
    }
  }
  