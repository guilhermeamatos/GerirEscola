

import { Class } from './Class';
import { Coordinator } from './Coordinator';
import { Manager } from './Manager';
import { Nivel } from '../enums/Nivel';

export class School {
    id: string;
    name: string;
    address: string;
    phone: string;
    email: string;
    classes: Class[] = [];
    nivel: Nivel;
    manager?: Manager[] = [];
  
    constructor(id: string, name: string, address: string, phone: string, email: string, nivel: Nivel) {
      this.id = id;
      this.name = name;
      this.address = address;
      this.phone = phone;
      this.email = email;
      this.nivel = nivel;
    }
  }
  