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
  schools: string[] = []; // Para armazenar os nomes das escolas, se fornecido

  // Sobrecarga: Construtor sem escolas
  constructor(
    id: string,
    name: string,
    cpf: string,
    address: string,
    phone: string,
    email: string,
    password: string,
    specialization: string,
    matricula: string,
    concursado: boolean
  );

  // Sobrecarga: Construtor com escolas
  constructor(
    id: string,
    name: string,
    cpf: string,
    address: string,
    phone: string,
    email: string,
    password: string,
    specialization: string,
    matricula: string,
    concursado: boolean,
    schools: string[]
  );

  // Implementação principal do construtor
  constructor(
    id: string,
    name: string,
    cpf: string,
    address: string,
    phone: string,
    email: string,
    password: string,
    specialization: string,
    matricula: string,
    concursado: boolean,
    schools?: string[]
  ) {
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
    this.schools = schools ?? []; // Inicializa com um array vazio se não for fornecido
  }
}
