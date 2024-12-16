import mongoose from 'mongoose';
import { Student } from './student.model';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';

// get student from db
const getAllStudentFromDb = async () => {
  const result = await Student.find()
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

// get student from db
const getASingleStudentFromDb = async (id: string) => {
  // const result = await Student.findOne({ id });
  const result = await Student.findOne({ id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

// update student from db
const updateStudentFromDb = async (id: string) => {
  const result = await Student.findOne({ id });
  return result;
};

// delete a student from DB
const deleteStudentFromDb = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
    }
    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    // eslint-disable-next-line no-console
    console.log(err);
  }
};

export const studentServices = {
  getAllStudentFromDb,
  getASingleStudentFromDb,
  updateStudentFromDb,
  deleteStudentFromDb,
};
