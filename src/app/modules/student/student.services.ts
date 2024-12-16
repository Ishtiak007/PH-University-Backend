import { Student } from './student.model';

// get student from db
const getAllStudentFromDb = async () => {
  const result = await Student.find()
    .populate('admissionSemester')
    .populate('academicDepartment');
  return result;
};

// get student from db
const getASingleStudentFromDb = async (id: string) => {
  // const result = await Student.findOne({ id });
  const result = await Student.aggregate([{ $match: { id: id } }]);
  return result;
};

// delete a student from DB
const deleteStudentFromDb = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const studentServices = {
  getAllStudentFromDb,
  getASingleStudentFromDb,
  deleteStudentFromDb,
};
