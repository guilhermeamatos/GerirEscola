import { LessonRepository } from '../repositories/LessonRepository';

export class LessonService {
  private lessonRepository: LessonRepository;

  constructor() {
    this.lessonRepository = new LessonRepository();
  }

  async registerLesson(data: { name: string; description?: string; subjectId: string }) {
    // Verifica se a disciplina existe
    const subject = await this.lessonRepository.findSubjectById(data.subjectId);
    if (!subject) {
      throw {
        status: 404,
        message: 'Disciplina não encontrada.',
      };
    }

    // Cria a aula associada à disciplina
    return await this.lessonRepository.createLesson(data);
  }
}
