import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import { SemesterRegistrationService } from './semesterRegistration.service';

const createSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await SemesterRegistrationService.createSemesterRegistrationIntoDB(
        req.body,
      );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'SemesterRegistration is created successfully!',
      data: result,
    });
  },
);


const getAllSemesterRegistrations = catchAsync(
  async (req: Request, res: Response) => {
    const result = await SemesterRegistrationService.getAllSemesterRegistrationsFromDB(req.query);
    sendResponse(res,{
      statusCode:httpStatus.OK,
      success:true,
      message:'Semester Registration is retrieved successfully',
      data: result;
    })
  },
);

// const getSingleSemesterRegistration = catchAsync(
//   async (req: Request, res: Response) => {
//     const { id } = req.params;
//   },
// );

// const updateSemesterRegistration = catchAsync(
//   async (req: Request, res: Response) => {
//     const { id } = req.params;
//   },
// );

export const SemesterRegistrationController = {
  createSemesterRegistration,
};
