import { RequestHandler, Request, Response, NextFunction } from 'express';
import { studentServices } from './student.services';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

// get all students from db
const getAllStudents: RequestHandler = catchAsync(async (req, res, next) => {
  const result = await studentServices.getAllStudentFromDb();

  res.status(200).json({
    success: true,
    message: 'Students are retrieved successfully',
    data: result,
  });
});

// get single student from db
const getSingleStudent = catchAsync(async (req, res, next) => {
  const { studentId } = req.params;
  const result = await studentServices.getASingleStudentFromDb(studentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Signle student is retrieved successfully',
    data: result,
  });
});

// delete a student from db
const deleteStudent: RequestHandler = catchAsync(async (req, res, next) => {
  const { studentId } = req.params;
  const result = await studentServices.deleteStudentFromDb(studentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student deleted successfully',
    data: result,
  });
});

export const studentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
