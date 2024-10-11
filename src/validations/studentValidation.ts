import Joi from 'joi';

// Validação para criação de um novo aluno
export const createStudentValidationSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  birthdate: Joi.date().required(),
  cpf: Joi.string().length(11).required(),
  address: Joi.string().max(255).required(),
  phone: Joi.string().max(20).required(),
  email: Joi.string().email().required(),
  classId: Joi.string().uuid().optional().allow(null), // Classe pode ser opcional
});

// Validação para atualização de um aluno existente
export const updateStudentValidationSchema = Joi.object({
  name: Joi.string().min(3).max(100).optional(),
  birthdate: Joi.date().optional(),
  cpf: Joi.string().length(11).optional(),
  address: Joi.string().max(255).optional(),
  phone: Joi.string().max(20).optional(),
  email: Joi.string().email().optional(),
  classId: Joi.string().uuid().optional().allow(null),
});
