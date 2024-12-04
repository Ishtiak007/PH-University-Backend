import { TStudent } from './student.interface';
import { Student } from './student.model';

const createStudentIntoDB = async (studentData: TStudent) => {
  if (await Student.isUserExists(studentData.id)) {
    throw new Error('User already exists!!!!!!!!!!');
  }

  const result = await Student.create(studentData); // built in static method

  // const student = new Student(studentData); //create an instance

  // if (await student.isUserExists(studentData.id)) {
  //   throw new Error('User already exists!');
  // }

  // const result = await student.save(); // built in instance method
  return result;
};

// get student from db
const getAllStudentFromDb = async () => {
  const result = await Student.find();
  return result;
};

// get student from db
const getASingleStudentFromDb = async (id: string) => {
  const result = await Student.findOne({ id });
  return result;
};

// delete a student from DB
const deleteStudentFromDb = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const studentServices = {
  createStudentIntoDB,
  getAllStudentFromDb,
  getASingleStudentFromDb,
  deleteStudentFromDb,
};
