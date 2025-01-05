import { nameSubjects } from '@prisma/client';

class Subject {
  id: string;
  teacher_id?: string | null;
  class_id?: string | null;
  name: nameSubjects;

  constructor(
    id: string,
    name: nameSubjects,
    teacher_id?: string | null,
    class_id?: string | null
  ) {
    this.id = id;
    this.name = name;
    this.teacher_id = teacher_id ?? null;
    this.class_id = class_id ?? null;
  }
}

export default Subject;
