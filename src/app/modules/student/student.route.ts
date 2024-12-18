import express from 'express';
import { studentControllers } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { updateStudentValidationSchema } from './student.validation';
const router = express.Router();

// will call contorller function
// router.post('/create-student', studentControllers.createStudent);

// get a single student from DB
router.get('/:id', studentControllers.getSingleStudent);

// update a student from DB
router.patch(
  '/:id',
  validateRequest(updateStudentValidationSchema),
  studentControllers.updateStudent,
);

// delete a student from DB
router.delete('/:id', studentControllers.deleteStudent);

// get all student from DB
router.get('/', studentControllers.getAllStudents);

export const StudentRoutes = router;
