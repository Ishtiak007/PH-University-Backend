import { z } from 'zod';

// UserName Validation Schema
const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .max(20, 'First Name cannot be more than 20 characters')
    .refine(
      (value) => value.charAt(0).toUpperCase() + value.slice(1) === value,
      { message: 'First Name must be in capitalize format' },
    ),
  middleName: z.string().optional(),
  lastName: z.string().refine((value) => /^[a-zA-Z]+$/.test(value), {
    message: 'Last Name must contain only alphabetic characters',
  }),
});

// Guardian Validation Schema
const guardianValidationSchema = z.object({
  fatherName: z.string(),
  fatherOccupation: z.string(),
  fatherContactNo: z
    .string()
    .min(10, 'Father Contact No must be at least 10 digits')
    .max(15, 'Father Contact No must be at most 15 digits'),
  motherName: z.string(),
  motherOccupation: z.string(),
  motherContactNo: z
    .string()
    .min(10, 'Mother Contact No must be at least 10 digits')
    .max(15, 'Mother Contact No must be at most 15 digits'),
});

// LocalGuardian Validation Schema
const localGuardianValidationSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  contactNo: z
    .string()
    .min(10, 'Contact No must be at least 10 digits')
    .max(15, 'Contact No must be at most 15 digits'),
  address: z.string(),
});

// Student Validation Schema
export const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    student: z.object({
      name: userNameValidationSchema,
      gender: z.enum(['male', 'female', 'other']),
      dateOfBirth: z.date().optional(),
      email: z.string().email('Invalid email format'),
      contactNo: z
        .string()
        .min(10, 'Contact No must be at least 10 digits')
        .max(15, 'Contact No must be at most 15 digits'),
      emergencyContactNumber: z
        .string()
        .min(10, 'Emergency Contact No must be at least 10 digits')
        .max(15, 'Emergency Contact No must be at most 15 digits'),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      guardian: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema,
      admissionSemester: z.string(),
      profileImg: z.string().optional(),
    }),
  }),
});

export const studentValidations = {
  createStudentValidationSchema,
};
