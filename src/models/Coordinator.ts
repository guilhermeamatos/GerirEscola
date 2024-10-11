import { School } from './School';
export class Coordinator {
    id: string;
    name: string;
    cpf: string;
    address: string;
    phone: string;
    email: string;
    schoolId: string;
    school?: School;
  
    constructor(id: string, name: string, cpf: string, address: string, phone: string, email: string, schoolId: string) {
      this.id = id;
      this.name = name;
      this.cpf = cpf;
      this.address = address;
      this.phone = phone;
      this.email = email;
      this.schoolId = schoolId;
    }
  }
  