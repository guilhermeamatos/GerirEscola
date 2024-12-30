import { Class } from './Class';
import { School } from './School';
export class Student {
    id: string;
    name: string;
    matricula: string;
    password: string;
    birthdate: Date;
    cpf: string;
    schoolYear: number;
    address: string;
    phone: string;
    email: string;
    classId?: string;
    class?: Class;
    schoolId: string;
    school?: School;
  
    constructor(id: string, name: string, birthdate: Date, cpf: string, address: string, phone: string, email: string,  schoolYear: number, matricula: string, password: string, schoolId: string) {
      this.id = id;
      this.name = name;
      this.birthdate = birthdate;
      this.cpf = cpf;
      this.address = address;
      this.phone = phone;
      this.email = email;
      this. schoolYear = schoolYear;
      this.matricula = matricula;
      this.password = password;
      this.schoolId = schoolId;
    }
  }
  