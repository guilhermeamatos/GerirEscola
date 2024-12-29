import { Class } from './Class';
export class Student {
    id: string;
    name: string;
    birthdate: Date;
    cpf: string;
    schoolYear: number;
    address: string;
    phone: string;
    email: string;
    classId?: string;
    class?: Class;
  
    constructor(id: string, name: string, birthdate: Date, cpf: string, address: string, phone: string, email: string,  schoolYear: number) {
      this.id = id;
      this.name = name;
      this.birthdate = birthdate;
      this.cpf = cpf;
      this.address = address;
      this.phone = phone;
      this.email = email;
      this. schoolYear = schoolYear;
    }
  }
  