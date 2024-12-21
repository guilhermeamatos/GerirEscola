

import { Class } from './Class';
import { Coordinator } from './Coordinator';
import { Manager } from './Manager';

export class School {
    id: string;
    name: string;
    address: string;
    phone: string;
    email: string;
    foundedAt: Date;
    classes: Class[] = [];
    manager?: Manager;
  
    constructor(id: string, name: string, address: string, phone: string, email: string, foundedAt: Date) {
      this.id = id;
      this.name = name;
      this.address = address;
      this.phone = phone;
      this.email = email;
      this.foundedAt = foundedAt;
    }
  }
  