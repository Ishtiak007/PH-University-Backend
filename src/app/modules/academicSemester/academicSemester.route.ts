import express from 'express';
import { AcademicSemesterControllers } from './academicSemester.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterValidations } from './academicSemesterValidation';
const router = express.Router();

// will call contorller function
// router.post('/create-student', studentControllers.createStudent);

// // get a single student from DB
// router.get('/:studentId', studentControllers.getSingleStudent);

// // delete a student from DB
// router.delete('/:studentId', studentControllers.deleteStudent);

// // get all student from DB
// router.get('/', studentControllers.getAllStudents);

router.post(
  '/create-academic-semester',
  validateRequest(
    AcademicSemesterValidations.createAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.createAcademicSemester,
);

export const AcademicSemesterRoutes = router;
