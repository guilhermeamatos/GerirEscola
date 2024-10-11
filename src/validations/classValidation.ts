import Joi from 'joi';

// Validação para criação de uma nova turma
export const createClassValidationSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  schoolYear: Joi.string().min(4).max(9).required(),
  schoolId: Joi.string().uuid().required(), // ID da escola é obrigatório
  teacherId: Joi.string().uuid().optional(), // O teacherId pode ser opcional dependendo da lógica de negócio
});

// Validação para atualização de uma turma existente
export const updateClassValidationSchema = Joi.object({
  name: Joi.string().min(3).max(100).optional(),
  schoolYear: Joi.string().min(4).max(9).optional(),
  schoolId: Joi.string().uuid().optional(), // ID da escola pode ser alterado
  teacherId: Joi.string().uuid().optional(), // O teacherId também pode ser alterado
});
