import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import httpStatus from 'http-status';
import bcrypt from 'bcrypt';

const loginUser = async (payload: TLoginUser) => {
  //checking if the user is exists
  const user = await User.isUserExistsByCustomId(payload.id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found');
  }

  // // checking if the use is already deleted
  // const isDeleted = isUserExists?.isDeleted;

  // if (isDeleted) {
  //   throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted');
  // }

  // // checking if the use is blocked
  // const userStatus = isUserExists?.status;

  // if (userStatus === 'blocked') {
  //   throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked');
  // }

  // checking if the password is correct
  if (!(await User.isPasswordMatched(payload?.password, user?.password)))
    // //access granted : send accesstoken, refressToken
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched!');
  return {};
};

export const AuthServices = {
  loginUser,
};
