import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import bcrypt from 'bcrypt';

const loginUser = async (payload: TLoginUser) => {
  //checking if the user is exists
  const user = await User.isUserExistsByCustomId(payload.id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found');
  }

  // checking if the use is already deleted
  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted');
  }

  // checking if the use is blocked
  const userStatus = user?.status;

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked');
  }

  // checking if the password is correct
  if (!(await User.isPasswordMatched(payload?.password, user?.password)))
    //Access granted : send accesstoken, refressToken
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched!');

  // create token and sent to the client
  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };
  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '10d',
  });

  return {
    accessToken,
    needsPasswordChange: user?.needsPasswordChange,
  };
};

const changePassword = async (
  userData: JwtPayload,
  payload: {
    oldPassword: string;
    newPassword: string;
  },
) => {
  const user = await User.isUserExistsByCustomId(userData.id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found');
  }

  // checking if the use is already deleted
  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted');
  }

  // checking if the use is blocked
  const userStatus = user?.status;

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked');
  }

  // checking if the password is correct
  if (!(await User.isPasswordMatched(payload.oldPassword, user?.password)))
    //Access granted : send accesstoken, refressToken
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched!');

  //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  await User.findOneAndUpdate(
    {
      id: userData.userId,
      role: userData.role,
    },
    {
      password: newHashedPassword,
    },
  );
  return null;
};

export const AuthServices = {
  loginUser,
  changePassword,
};
