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
    password: z.string().max(20).optional(),
    student: z.object({
      name: userNameValidationSchema,
      gender: z.enum(['male', 'female', 'other']),
      dateOfBirth: z.string().optional(),
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
    }),
  }),
});

const updateUserNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20).optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
});

const updateGuardianValidationSchema = z.object({
  fatherName: z.string().optional(),
  fatherOccupation: z.string().optional(),
  fatherContactNo: z.string().optional(),
  motherName: z.string().optional(),
  motherOccupation: z.string().optional(),
  motherContactNo: z.string().optional(),
});

const updateLocalGuardianValidationSchema = z.object({
  name: z.string().optional(),
  occupation: z.string().optional(),
  contactNo: z.string().optional(),
  address: z.string().optional(),
});

export const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: updateUserNameValidationSchema,
      gender: z.enum(['male', 'female', 'other']).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email().optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      bloogGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      guardian: updateGuardianValidationSchema.optional(),
      localGuardian: updateLocalGuardianValidationSchema.optional(),
      admissionSemester: z.string().optional(),
      profileImg: z.string().optional(),
      academicDepartment: z.string().optional(),
    }),
  }),
});

export const studentValidations = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
};
