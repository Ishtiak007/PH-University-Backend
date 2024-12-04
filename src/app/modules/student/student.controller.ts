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
        .required()
        .custom((value, helpers) => {
          const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
          if (firstNameStr !== value) {
            return helpers.error('any.custom', {
              message: `${value} is not in capitalize format`,
            });
          }
          return value;
        }, 'First name capitalization validation'),
      middleName: Joi.string().trim().optional(),
      lastName: Joi.string()
        .required()
        .custom((value, helpers) => {
          if (!/^[a-zA-Z]+$/.test(value)) {
            return helpers.error('any.custom', {
              message: `${value} is not validddddddd`,
            });
          }
          return value;
        }, 'Last name alphabetic validation'),
    });

    // Guardian schema
    const guardianSchema = Joi.object({
      fatherName: Joi.string().required(),
      fatherOccupation: Joi.string().required(),
      fatherContactNo: Joi.string().required(),
      motherName: Joi.string().required(),
      motherOccupation: Joi.string().required(),
      motherContactNo: Joi.string().required(),
    });

    // LocalGuardian schema
    const localGuardianSchema = Joi.object({
      name: Joi.string().required(),
      occupation: Joi.string().required(),
      contactNo: Joi.string().required(),
      address: Joi.string().required(),
    });

    // Student schema
    const studentSchema = Joi.object({
      id: Joi.string().required(),
      name: userNameSchema.required(),
      gender: Joi.string()
        .valid('male', 'female', 'other')
        .required()
        .messages({ 'any.only': '{#value} is not valid' }),
      dateOfBirth: Joi.string().optional(),
      email: Joi.string()
        .email()
        .required()
        .messages({ 'string.email': '{#value} is not a valid email type' }),
      contactNo: Joi.string().required(),
      emergencyContactNo: Joi.string().required(),
      bloodGroup: Joi.string()
        .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
        .optional(),
      presentAddress: Joi.string().required(),
      permanentAddress: Joi.string().required(),
      guardian: guardianSchema.required(),
      localGuardian: localGuardianSchema.required(),
      profileImg: Joi.string().optional(),
      isActive: Joi.string().valid('active', 'blocked').default('active'),
    });

    const { student: studentData } = req.body;

    const { error, value } = studentSchema.validate(studentData);
    console.log({ error }, { value });

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
