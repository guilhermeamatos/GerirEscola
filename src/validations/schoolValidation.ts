import Joi from 'joi';

export const createSchoolSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'O nome da escola é obrigatório',
  }),
  address: Joi.string().required().messages({
    'string.empty': 'O endereço é obrigatório',
  }),
  phone: Joi.string().required().messages({
    'string.empty': 'O telefone é obrigatório',
  }),
  email: Joi.string().email().required().messages({
    'string.empty': 'O email é obrigatório',
    'string.email': 'O email deve ser válido',
  }),
  nivel: Joi.string()
  .valid('INFANTIL', 'FUNDAMENTAL_1', 'FUNDAMENTAL_2', 'FUNDAMENTAL_1_2', 'INFANTIL_FUNDAMENTAL_1', 'INFANTIL_FUNDAMENTAL_1_2')
  .required()
  .messages({
    'string.empty': 'O nível é obrigatório',
    'any.only': 'O nível deve ser um dos seguintes valores: INFANTIL, FUNDAMENTAL_1, FUNDAMENTAL_2, FUNDAMENTAL_1_2, INFANTIL_FUNDAMENTAL_1, INFANTIL_FUNDAMENTAL_1_2',
  }),

});

export const updateSchoolSchema = Joi.object({
  name: Joi.string().optional(),
  address: Joi.string().optional(),
  phone: Joi.string().optional(),
  email: Joi.string().email().optional(),
  nivel: Joi.string()
  .valid('INFANTIL', 'FUNDAMENTAL_1', 'FUNDAMENTAL_2', 'FUNDAMENTAL_1_2', 'INFANTIL_FUNDAMENTAL_1', 'INFANTIL_FUNDAMENTAL_1_2')
  .optional()

});
