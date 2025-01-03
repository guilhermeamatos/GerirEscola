import Joi from 'joi';

export const createManagerSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'O nome é obrigatório',
  }),
  cpf: Joi.string().length(11).required().messages({
    'string.empty': 'O CPF é obrigatório',
    'string.length': 'O CPF deve ter 11 dígitos',
  }),
  phone: Joi.string().required().messages({
    'string.empty': 'O telefone é obrigatório',
  }),
  email: Joi.string().email().required().messages({
    'string.empty': 'O email é obrigatório',
    'string.email': 'O email deve ser válido',
  }),
  schoolId: Joi.string().uuid().required(),
});

export const updateManagerSchema = Joi.object({
  name: Joi.string().min(1).max(100).optional().allow(null, ''),  // Permite string vazia mas com erro de validação
  cpf: Joi.string().length(11).optional().allow(null, ''),
  phone: Joi.string().optional().allow(null, ''),
  email: Joi.string().email().optional().allow(null, ''),
  schoolId: Joi.string().uuid().optional().allow(null, ''),
}).custom((value, helpers) => {
  if (value.name === '' || value.cpf === '') {
    return helpers.error('any.invalid'); // Retorna erro padrão do Joi
  }
  return value;
});

