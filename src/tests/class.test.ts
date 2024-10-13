import request from 'supertest';
import { app } from '../../src/server'; // Certifique-se de que o caminho para o arquivo do servidor esteja correto
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('Class Endpoints', () => {
  let createdClassId: string;
  let validSchoolId: string;

  beforeAll(async () => {
    // Limpa o banco de dados antes dos testes (cuidado em produção)
    await prisma.class.deleteMany();
    await prisma.school.deleteMany();

    // Cria uma escola para associar à classe
    const schoolResponse = await prisma.school.create({
      data: {
        name: 'Escola Teste',
        address: 'Rua Escola, 123',
        phone: '123456789',
        email: 'escola@teste.com',
        founded_at: new Date(),
      },
    });

    validSchoolId = schoolResponse.id;
  });

  afterAll(async () => {
    // Fecha a conexão com o banco de dados após os testes
    await prisma.$disconnect();
  });

  describe('Create Class Tests', () => {
    it('should create a new class successfully', async () => {
      const response = await request(app)
        .post('/classes')
        .send({
          name: 'Turma 101',
          schoolId: validSchoolId, // Usando o ID da escola criada
          schoolYear: '2023',
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe('Turma 101');
      createdClassId = response.body.id;
    });

    it('should return 400 if name is missing', async () => {
      const response = await request(app)
        .post('/classes')
        .send({
          schoolId: validSchoolId,
          schoolYear: '2023',
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('errors');
    });

    it('should return 400 if schoolYear is missing', async () => {
      const response = await request(app)
        .post('/classes')
        .send({
          name: 'Turma 102',
          schoolId: validSchoolId,
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('errors');
    });
  });

  describe('Get Class Tests', () => {
    it('should fetch all classes', async () => {
      const response = await request(app).get('/classes');

      expect(response.status).toBe(200);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it('should fetch a class by ID', async () => {
      const response = await request(app).get(`/classes/${createdClassId}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', createdClassId);
      expect(response.body.name).toBe('Turma 101');
    });

    it('should return 404 if class is not found', async () => {
      const response = await request(app).get('/classes/invalid-id');

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message');
    });
  });

  describe('Update Class Tests', () => {
    it('should update a class successfully', async () => {
      const response = await request(app)
        .put(`/classes/${createdClassId}`)
        .send({
          name: 'Turma 101 Atualizada',
          schoolId: validSchoolId,
          schoolYear: '2024',
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', createdClassId);
      expect(response.body.name).toBe('Turma 101 Atualizada');
    });

    it('should return 400 if updating with invalid data', async () => {
      console.log('Enviando requisição PUT com dados inválidos...');
      const response = await request(app)
        .put(`/classes/${createdClassId}`)
        .send({
          name: '', // nome vazio
          schoolId: validSchoolId,
        });
    
      console.log('Status retornado:', response.status);
      console.log('Corpo retornado:', response.body);
    
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('errors');
    });
    it('should return 404 if class to update is not found', async () => {
      const response = await request(app)
        .put('/classes/invalid-id')
        .send({
          name: 'Turma Não Existente',
          schoolYear: '2024',
          schoolId: validSchoolId,
        });
    
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error');  // Modificado de 'message' para 'error'
    });
    
  });

  describe('Delete Class Tests', () => {
    it('should delete a class successfully', async () => {
      const response = await request(app).delete(`/classes/${createdClassId}`);

      expect(response.status).toBe(204); // HTTP 204: No Content
    });

    it('should return 404 if class to delete is not found', async () => {
      const response = await request(app).delete('/classes/invalid-id');
    
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error');  // Modificado de 'message' para 'error'
    });
    
  });
});
