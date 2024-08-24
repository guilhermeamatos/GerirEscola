import { Class } from './Class';
export class Student {
    id: string;
    name: string;
    birthdate: Date;
    cpf: string;
    address: string;
    phone: string;
    email: string;
    classId?: string;
    class?: Class;
  
    constructor(id: string, name: string, birthdate: Date, cpf: string, address: string, phone: string, email: string) {
      this.id = id;
      this.name = name;
      this.birthdate = birthdate;
      this.cpf = cpf;
      this.address = address;
      this.phone = phone;
      this.email = email;
    }
  }
  