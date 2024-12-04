import { Request, Response } from 'express';
import { studentServices } from './student.services';
import studentValidationSchema from './student.jod.validation';
// import studentJoivalidationSchema from './student.joi.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;

    // data validation using JOI
    // const { error, value } = studentJoivalidationSchema.validate(studentData);

    // if (error) {
    //   res.status(500).json({
    //     success: false,
    //     message: 'Something went worng',
    //     error: error.details,
    //   });
    // }

    // creating a schema validation using ZOD
    const zodparseData = studentValidationSchema.parse(studentData);

    const result = await studentServices.createStudentIntoDB(zodparseData);

    res.status(200).json({
      success: true,
      message: 'Student created successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went worng',
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
