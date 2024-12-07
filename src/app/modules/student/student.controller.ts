import { NextFunction, Request, RequestHandler, Response } from 'express';
import { studentServices } from './student.services';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

// get all students from db
const getAllStudents: RequestHandler = async (req, res, next) => {
  try {
    const result = await studentServices.getAllStudentFromDb();

    res.status(200).json({
      success: true,
      message: 'Students are retrieved successfully',
      data: result,
    });
  } catch (err) {
    // res.status(500).json({
    //   success: false,
    //   message: err.message || 'something went worng',
    //   data: err,
    // });
    next(err);
  }
};

// get single student from db
const getSingleStudent: RequestHandler = async (req, res, next) => {
  try {
    const { studentId } = req.params;
    const result = await studentServices.getASingleStudentFromDb(studentId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Signle student is retrieved successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

// delete a student from db
const deleteStudent: RequestHandler = async (req, res, next) => {
  try {
    const { studentId } = req.params;
    const result = await studentServices.deleteStudentFromDb(studentId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student deleted successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const studentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
