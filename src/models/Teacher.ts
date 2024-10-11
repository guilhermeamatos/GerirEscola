
import { Class } from './Class';
export class Teacher {
    id: string;
    name: string;
    cpf: string;
    address: string;
    phone: string;
    email: string;
    specialization: string;
    classes: Class[] = [];
  
    constructor(id: string, name: string, cpf: string, address: string, phone: string, email: string, specialization: string) {
      this.id = id;
      this.name = name;
      this.cpf = cpf;
      this.address = address;
      this.phone = phone;
      this.email = email;
      this.specialization = specialization;
    }
  }
  