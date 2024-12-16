import { z } from 'zod';

const createAcademicFacultyValidationSchema = z.object({
  name: z.string({ invalid_type_error: 'Academic faculty must be a string' }),
});

const updateAcatdemicFucaltyValidationSchema = z.object({
  name: z.string({
    invalid_type_error: 'Academic faculty must be string',
  }),
});

export const academicFacultyValidation = {
  createAcademicFacultyValidationSchema,
  updateAcatdemicFucaltyValidationSchema,
};
