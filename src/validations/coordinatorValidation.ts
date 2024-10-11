import Joi from 'joi';

// Validação para criação de um novo coordenador
export const createCoordinatorValidationSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  cpf: Joi.string().length(11).required(),
  address: Joi.string().max(255).required(),
  phone: Joi.string().max(20).required(),
  email: Joi.string().email().required(),
  schoolId: Joi.string().uuid().required(), // ID da escola é obrigatório
});

// Validação para atualização de um coordenador existente
export const updateCoordinatorValidationSchema = Joi.object({
  name: Joi.string().min(3).max(100).optional(),
  cpf: Joi.string().length(11).optional(),
  address: Joi.string().max(255).optional(),
  phone: Joi.string().max(20).optional(),
  email: Joi.string().email().optional(),
  schoolId: Joi.string().uuid().optional(),
});
