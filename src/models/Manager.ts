import { School } from './School';

export class Manager {
  id: string;
  name: string;
  cpf: string;
  
  phone: string;
  email: string;
  password: string;
  schoolId: string;
  school?: School; 

  constructor(id: string, name: string, cpf: string, phone: string, email: string, password: string, schoolId: string) {
    this.id = id;
    this.name = name;
    this.cpf = cpf;
    this.phone = phone;
    this.email = email;
    this.password = password;
    this.schoolId = schoolId;
  }
}