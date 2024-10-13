import request from 'supertest';
import { app } from '../server'; 

// Função para gerar um CPF aleatório (apenas números válidos para testes)
const generateUniqueCPF = () => {
  return Math.floor(Math.random() * 100000000000).toString().padStart(11, '0'); 
};

describe('Coordinator Endpoints', () => {
  let createdSchoolId: string;
  let createdCoordinatorId: string;

  // Antes de todos os testes, cria uma escola para ser usada nos testes de coordenador
  beforeAll(async () => {
    await request(app).delete('/schools'); // Exemplo de limpeza via endpoint, caso exista
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

  // Teste de criação de um novo coordenador
  it('should create a new coordinator successfully', async () => {
    const response = await request(app)
      .post('/coordinators')
      .send({
        name: 'Coordenador Teste',
        cpf: generateUniqueCPF(), // Gera um CPF único para o teste
        address: 'Rua Exemplo, 123',
        phone: '999999999',
        email: 'coordenador@teste.com',
        schoolId: createdSchoolId,
      });

    console.log('Response:', response.body);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('Coordenador Teste');
    createdCoordinatorId = response.body.id;  // Salva o ID para os próximos testes
  });

  // Teste de validação: falta o nome
  it('should return 400 if name is missing', async () => {
    const response = await request(app)
      .post('/coordinators')
      .send({
        cpf: generateUniqueCPF(),
        address: 'Rua Exemplo, 123',
        phone: '999999999',
        email: 'coordenador@teste.com',
        schoolId: createdSchoolId,
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
  });

  // Teste de validação: falta o CPF
  it('should return 400 if cpf is missing', async () => {
    const response = await request(app)
      .post('/coordinators')
      .send({
        name: 'Coordenador Teste',
        address: 'Rua Exemplo, 123',
        phone: '999999999',
        email: 'coordenador@teste.com',
        schoolId: createdSchoolId,
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
  });

  // Teste de busca por todos os coordenadores
  it('should fetch all coordinators', async () => {
    const response = await request(app).get('/coordinators');

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  // Teste de busca por ID
  it('should fetch a coordinator by ID', async () => {
    const response = await request(app).get(`/coordinators/${createdCoordinatorId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', createdCoordinatorId);
    expect(response.body.name).toBe('Coordenador Teste');
  });

  // Teste de coordenador não encontrado
  it('should return 404 if coordinator is not found', async () => {
    const response = await request(app).get('/coordinators/invalid-id');

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message');
  });

  // Teste de atualização do coordenador
  it('should update a coordinator successfully', async () => {
    const response = await request(app)
      .put(`/coordinators/${createdCoordinatorId}`)
      .send({
        name: 'Coordenador Atualizado',
        cpf: generateUniqueCPF(),
        address: 'Rua Atualizada, 456',
        phone: '999888777',
        email: 'coordenador@atualizado.com',
        schoolId: createdSchoolId,
      });
    console.log('Response up:', response.body);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', createdCoordinatorId);
    expect(response.body.name).toBe('Coordenador Atualizado');
  });

  it('should return 400 if updating with invalid data', async () => {
    const response = await request(app)
      .put(`/coordinators/${createdCoordinatorId}`)
      .send({
        name: '',  // Campos inválidos ou vazios
        cpf: '',
        address: 'Rua Atualizada, 456',
      });
  
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
  });
  
  // Teste de coordenador não encontrado ao atualizar
  it('should return 404 if coordinator to update is not found', async () => {
    const response = await request(app).put('/coordinators/invalid-id').send({
      name: 'Coordenador Não Encontrado',
      cpf: generateUniqueCPF(),
      address: 'Rua Exemplo, 123',
      phone: '999999999',
      email: 'naoencontrado@teste.com',
      schoolId: createdSchoolId,
    });

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message');
  });

  // Teste de exclusão do coordenador
  it('should delete a coordinator successfully', async () => {
    const response = await request(app).delete(`/coordinators/${createdCoordinatorId}`);

    expect(response.status).toBe(204);  // Sucesso, sem conteúdo
  });

  // Teste de coordenador não encontrado ao excluir
  it('should return 404 if coordinator to delete is not found', async () => {
    const response = await request(app).delete('/coordinators/invalid-id');

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message');
  });
});
