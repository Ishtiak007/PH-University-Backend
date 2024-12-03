import { Request, Response } from 'express';
import { studentServices } from './student.services';
import Joi from 'joi';

const createStudent = async (req: Request, res: Response) => {
  try {
    // creating a validation schema using JOI
    const userNameSchema = Joi.object({
      firstName: Joi.string()
        .trim()
        .max(20)
        .regex(/^[A-Z][a-z]*$/)
        .messages({
          'string.max':
            'Max allowed length is 20 - first name cannot be more than 20 characters',
          'string.pattern.base':
            'First name must start with a capital letter and be properly formatted',
          'any.required': 'This first name field is required',
        })
        .required(),
      middleName: Joi.string().trim().optional(),
      lastName: Joi.string()
        .trim()
        .regex(/^[a-zA-Z]+$/)
        .messages({
          'string.pattern.base': '{#value} is not valid',
          'any.required': 'Last Name is required',
        })
        .required(),
    });

    const guardianSchema = Joi.object({
      fatherName: Joi.string().trim().required().messages({
        'any.required': 'This FatherName field is required',
      }),
      fatherOccupation: Joi.string().trim().required().messages({
        'any.required': 'This fatherOccupation field is required',
      }),
      fatherContactNo: Joi.string().trim().required().messages({
        'any.required': 'This fatherContactNo field is required',
      }),
      motherName: Joi.string().trim().required().messages({
        'any.required': 'This motherName field is required',
      }),
      motherOccupation: Joi.string().trim().required().messages({
        'any.required': 'This motherOccupation field is required',
      }),
      motherContactNo: Joi.string().trim().required().messages({
        'any.required': 'This motherContactNo field is required',
      }),
    });

    const localGuardianSchema = Joi.object({
      name: Joi.string().trim().required().messages({
        'any.required': 'This localGuardianSchema field is required',
      }),
      occupation: Joi.string().trim().required().messages({
        'any.required': 'This occupation field is required',
      }),
      contactNo: Joi.string().trim().required().messages({
        'any.required': 'This contactNo field is required',
      }),
      address: Joi.string().trim().required().messages({
        'any.required': 'This address field is required',
      }),
    });

    const studentSchema = Joi.object({
      id: Joi.string().required().messages({
        'any.required': 'ID field is required',
      }),
      name: userNameSchema.required().messages({
        'any.required': 'This name field is required',
      }),
      gender: Joi.string()
        .valid('male', 'female', 'other')
        .required()
        .messages({
          'any.only': '{#value} is not valid',
          'any.required': 'Gender is required',
        }),
      dateOfBirth: Joi.date().iso().required().messages({
        'date.format': 'Date of birth must be in ISO format',
        'any.required': 'Date of birth is required',
      }),
      email: Joi.string().trim().email().required().messages({
        'string.email': 'Your provided email is not valid',
        'any.required': 'Email field is required',
      }),
      contactNo: Joi.string()
        .trim()
        .regex(/^\d{10}$/)
        .required()
        .messages({
          'string.pattern.base': 'Contact number must be 10 digits',
          'any.required': 'Contact number is required',
        }),
      emergencyContactNo: Joi.string()
        .trim()
        .regex(/^\d{10}$/)
        .required()
        .messages({
          'string.pattern.base': 'Emergency contact number must be 10 digits',
          'any.required': 'Emergency contact number is required',
        }),
      bloodGroup: Joi.string()
        .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
        .optional()
        .messages({
          'any.only': '{#value} is not a valid blood group',
        }),
      presentAddress: Joi.string().trim().required().messages({
        'any.required': 'Present address is required',
      }),
      permanentAddress: Joi.string().trim().required().messages({
        'any.required': 'Permanent address is required',
      }),
      guardian: guardianSchema.required().messages({
        'any.required': 'Guardian information is required',
      }),
      localGuardian: localGuardianSchema.required().messages({
        'any.required': 'Local guardian information is required',
      }),
      profileImg: Joi.string().trim().optional(),
      isActive: Joi.string()
        .valid('active', 'blocked')
        .default('active')
        .messages({
          'any.only': '{#value} is not valid for isActive',
        }),
    });

    const { student: studentData } = req.body;
    const result = await studentServices.createStudentIntoDB(studentData);
    res.status(200).json({
      success: true,
      message: 'Student created successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went worng',
      error: err,
    });
  }
};

// get all students from db
const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await studentServices.getAllStudentFromDb();
    res.status(200).json({
      success: true,
      message: 'Students are retrieved successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

// get single student from db
const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await studentServices.getASingleStudentFromDb(studentId);
    res.status(200).json({
      success: true,
      message: 'Signle student is retrieved successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const studentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
};
