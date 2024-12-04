import { Student } from './student.interface';
import { StudentModel } from './student.model';

const createStudentIntoDB = async (studentData: Student) => {
  // const result = await StudentModel.create(student); // built in static method

  const student = new StudentModel(studentData);
  const result = await student.save(); // built in instance method
  return result;
};

// get student from db
const getAllStudentFromDb = async () => {
  const result = await StudentModel.find();
  return result;
};

// get student from db
const getASingleStudentFromDb = async (id: string) => {
  const result = await StudentModel.findOne({ id });
  return result;
};

export const studentServices = {
  createStudentIntoDB,
  getAllStudentFromDb,
  getASingleStudentFromDb,
};
