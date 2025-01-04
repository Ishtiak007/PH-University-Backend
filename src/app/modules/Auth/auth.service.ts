import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import httpStatus from 'http-status';

const loginUser = async (payload: TLoginUser) => {
  //checking if the user is exists
  const isUserExists = await User.findOne({ id: payload?.id });

  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found');
  }

  // checking if the use is already deleted

  const isDeleted = isUserExists?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted');
  }

  // checking if the use is blocked

  const userStatus = isUserExists?.status;

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked');
  }
  return {};
};

export const AuthServices = {
  loginUser,
};
