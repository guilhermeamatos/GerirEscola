
import { Class } from './Class';
export class Teacher {
    id: string;
    matricula: string;
    concursado: boolean;
    name: string;
    cpf: string;
    address: string;
    phone: string;
    email: string;
    password: string;
    specialization: string;
    classes: Class[] = [];
  
    constructor(id: string, name: string, cpf: string, address: string, phone: string, email: string, password: string, specialization: string, matricula: string, concursado: boolean) {
      this.id = id;
      this.name = name;
      this.cpf = cpf;
      this.address = address;
      this.phone = phone;
      this.email = email;
      this.password = password;
      this.specialization = specialization;
      this.matricula = matricula;
      this.concursado = concursado;
    }
  }
  