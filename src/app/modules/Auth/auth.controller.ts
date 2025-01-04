import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const loginUser = catchAsync(async (req, res) => {
  const result = sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is logged in successfully!',
    data: result,
  });
});

export const AuthControllers = {
  loginUser,
};
