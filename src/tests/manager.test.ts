import request from 'supertest';
import { app } from '../server';

describe('Manager Endpoints', () => {
  let createdSchoolId: string;
  let createdManagerId: string;

  // Criação de uma escola antes de todos os testes
  beforeEach(async () => {
    const schoolResponse = await request(app)
      .post('/schools')
      .send({
        name: 'Escola Teste',
        address: 'Rua Exemplo, 123',
        phone: '999999999',
        email: 'escola@teste.com',
        foundedAt: '2000-01-01',
      });
    createdSchoolId = schoolResponse.body.id;
  });

  // Teste de criação de um novo manager
  it('should create a new manager successfully', async () => {
    const response = await request(app)
      .post('/managers')
      .send({
        name: 'Manager Teste',
        cpf: '12345678901',
        address: 'Rua Exemplo, 123',
        phone: '999999999',
        email: 'manager@teste.com',
        schoolId: createdSchoolId,
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('Manager Teste');
    createdManagerId = response.body.id;
  });

  // Teste de validação: falta o nome
  it('should return 400 if name is missing', async () => {
    const response = await request(app)
      .post('/managers')
      .send({
        cpf: '12345678901',
        address: 'Rua Exemplo, 123',
        phone: '999999999',
        email: 'manager@teste.com',
        schoolId: createdSchoolId,
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
  });

  // Teste de validação: falta o CPF
  it('should return 400 if cpf is missing', async () => {
    const response = await request(app)
      .post('/managers')
      .send({
        name: 'Manager Teste',
        address: 'Rua Exemplo, 123',
        phone: '999999999',
        email: 'manager@teste.com',
        schoolId: createdSchoolId,
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
  });

  // Teste de busca por todos os managers
  it('should fetch all managers', async () => {
    const response = await request(app).get('/managers');

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  // Teste de busca por ID
  it('should fetch a manager by ID', async () => {
    const response = await request(app).get(`/managers/${createdManagerId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', createdManagerId);
    expect(response.body.name).toBe('Manager Teste');
  });

  // Teste de manager não encontrado
  it('should return 404 if manager is not found', async () => {
    const response = await request(app).get('/managers/invalid-id');

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message');
  });

  // Teste de atualização do manager
  it('should update a manager successfully', async () => {
    const response = await request(app)
      .put(`/managers/${createdManagerId}`)
      .send({
        name: 'Manager Atualizado',
        address: 'Rua Atualizada, 456',
        phone: '999888777',
        email: 'manager@atualizado.com',
        schoolId: createdSchoolId,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', createdManagerId);
    expect(response.body.name).toBe('Manager Atualizado');
  });

  // Teste de validação ao atualizar com dados inválidos
  it('should return 400 if updating with invalid data', async () => {
    const response = await request(app)
      .put(`/managers/${createdManagerId}`)
      .send({
        name: '',       // Nome vazio
        cpf: '',        // CPF vazio
        address: 'Rua Atualizada, 456',  // Endereço válido
      });
  
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
  });
  

  // Teste de manager não encontrado ao atualizar
  it('should return 404 if manager to update is not found', async () => {
    const response = await request(app).put('/managers/invalid-id').send({
      name: 'Manager Não Encontrado',
      address: 'Rua Exemplo, 123',
      phone: '999999999',
      email: 'naoencontrado@teste.com',
      schoolId: createdSchoolId,
    });

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message');
  });

  // Teste de exclusão do manager
  it('should delete a manager successfully', async () => {
    const response = await request(app).delete(`/managers/${createdManagerId}`);

    expect(response.status).toBe(204); // Sucesso, sem conteúdo
  });

  // Teste de manager não encontrado ao excluir
  it('should return 404 if manager to delete is not found', async () => {
    const response = await request(app).delete('/managers/invalid-id');

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message');
  });
});
