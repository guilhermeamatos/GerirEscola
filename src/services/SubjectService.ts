import { SubjectRepository } from '../repositories/SubjectRepository';
import { nameSubjects } from '@prisma/client';
export class SubjectService {
    private subjectRepository: SubjectRepository;
  constructor(subjectRepository: SubjectRepository) {
    this.subjectRepository = subjectRepository;
  }

  async createSubjectsForFundamental1() {
    const cretedSubjects = [];
    const subjects = [
      'LINGUA_PORTUGUESA',
      'MATEMATICA',
      'CIENCIAS',
      'HISTORIA',
      'GEOGRAFIA',
      'EDUCACAO_FISICA',
      'ARTE',
      'ENSINO_RELIGIOSO',
    ];
    for (const subject of subjects) {
      cretedSubjects.push(await this.subjectRepository.create(subject as unknown as nameSubjects));
    }
    return cretedSubjects;
  }

  async createSubjectsForFundamental2() {
    const cretedSubjects = [];
    const subjects = [
       'LINGUA_PORTUGUESA',
        'MATEMATICA',
        'CIENCIAS',
        'HISTORIA',
        'GEOGRAFIA',
        'EDUCACAO_FISICA',
        'ARTE' ,
        'ENSINO_RELIGIOSO' ,
        'INGLES',
    ];
    for (const subject of subjects) {
      cretedSubjects.push(await this.subjectRepository.create(subject as unknown as nameSubjects));
    }
    return cretedSubjects;
  }

}