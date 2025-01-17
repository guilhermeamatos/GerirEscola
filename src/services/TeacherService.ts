import { TeacherRepository } from '../repositories/TeacherRepository';
import { Teacher as TeacherModel } from '../models/Teacher';
import { CreateTeacherDTO, TeacherResponseDTO } from '../dto';
import { sign } from 'jsonwebtoken';

export class TeacherService {
  private teacherRepository: TeacherRepository;

  constructor(teacherRepository: TeacherRepository) {
    this.teacherRepository = teacherRepository;
  }

  async dataValidation(teacherData: CreateTeacherDTO) {
    const { cpf, email, matricula } = teacherData;

    // Verificar CPF
    const existingTeacherByCPF = await this.teacherRepository.getTeacherByCPF(cpf);
    if (existingTeacherByCPF) {
      throw new Error("Um professor já está cadastrado com este CPF.");
    }

    // Verificar Email
    const existingTeacherByEmail = await this.teacherRepository.getTeacherByEmail(email);
    if (existingTeacherByEmail) {
      throw new Error("Um professor já está cadastrado com este email.");
    }

    // Verificar Matricula (se fornecida)
    if (matricula) {
      const existingTeacherByMatricula = await this.teacherRepository.getTeacherByMatricula(matricula);
      if (existingTeacherByMatricula) {
        throw new Error("Um professor já está cadastrado com esta matrícula.");
      }
    }

    return "Validação concluída com sucesso.";
  }

  generatePassword(teacherData: CreateTeacherDTO) {
    const password = teacherData.cpf.slice(0, 3) + teacherData.name.split(' ')[0];
    return password;
  }

  async createTeacher(teacherData: CreateTeacherDTO): Promise<TeacherResponseDTO> {
    await this.dataValidation(teacherData);
    teacherData.password = this.generatePassword(teacherData);

    // Não retorna diretamente um `TeacherModel`, mas sim um `TeacherResponseDTO`.
    await this.teacherRepository.create(teacherData);

    // Recupera o professor criado (se necessário)
    return this.teacherRepository.getTeacherByEmail(teacherData.email) as Promise<TeacherResponseDTO>;
  }

  async processSpreadsheet(data: any[]) {
    for (const row of data) {
      const teacherData: CreateTeacherDTO = {
        name: row['name'],
        matricula: row['matricula'],
        concursado: row['concursado'] === 'true',
        cpf: row['cpf'],
        address: row['address'],
        phone: row['phone'],
        email: row['email'],
        password: row['password'],
        specialization: row['specialization'],
      };

      await this.createTeacher(teacherData);
    }
  }

  async getTeacherById(id: string): Promise<TeacherResponseDTO | null> {
    return this.teacherRepository.findById(id);
  }

  async getAllTeachers(): Promise<TeacherResponseDTO[]> {
    return this.teacherRepository.findAll();
  }

  async updateTeacher(id: string, teacherData: Partial<CreateTeacherDTO>): Promise<TeacherResponseDTO> {
    const teacher = await this.teacherRepository.findById(id);
    if (!teacher) {
      throw new Error('Teacher not found');
    }

    // Atualiza os dados no repositório
    await this.teacherRepository.update(id, teacherData);

    // Recupera os dados atualizados
    return this.teacherRepository.findById(id) as Promise<TeacherResponseDTO>;
  }

  async deleteTeacher(id: string): Promise<void> {
    const teacher = await this.teacherRepository.findById(id);
    if (!teacher) {
      throw new Error('Teacher not found');
    }

    await this.teacherRepository.delete(id);
  }

  async login(email: string, password: string): Promise<string> {
    const teacher = await this.teacherRepository.findByEmailForLogin(email);
    if (!teacher || teacher.password !== password) {
      throw new Error('Invalid credentials');
    }
  
    // Gera um token JWT
    const token = sign({ id: teacher.id }, 'your_jwt_secret_key', { expiresIn: '1h' });
    return token;
  }
  

  async getTeachersBySchoolId(schoolId: string) {
    if (!schoolId) {
      throw new Error("O ID da escola é obrigatório.");
    }

    // Verificar se a escola existe
    const school = await this.teacherRepository.findSchoolById(schoolId);
    if (!school) {
      throw new Error("Escola não encontrada.");
    }

    const teachers = await this.teacherRepository.findTeachersBySchoolId(schoolId);

    if (!teachers.length) {
      throw new Error("Nenhum professor encontrado para esta escola.");
    }

    return teachers;
  }

  async getClassesByTeacher(teacherId: string) {
    // Verifica se o professor existe
    const teacher = await this.teacherRepository.findById(teacherId);
    if (!teacher) {
      throw {
        status: 404,
        message: 'Professor não encontrado.',
      };
    }

    // Busca as turmas e disciplinas associadas
    const classes = await this.teacherRepository.findClassesByTeacher(teacherId);

    console.log(classes);

    // Transforma o resultado para um formato mais amigável
    const formattedClasses = classes.map((teacherClass) => ({
      classId: teacherClass.class.id,
      className: teacherClass.class.name,
      nivel: teacherClass.class.nivel,
      subjects: teacherClass.class.subjects.map((subject: any) => ({
        subjectId: subject.id,
        subjectName: subject.name,
      })),
    }));
    return formattedClasses;
  }
}
