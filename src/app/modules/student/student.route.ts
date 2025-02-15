import express from 'express';
import { studentControllers } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { updateStudentValidationSchema } from './student.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
const router = express.Router();

// will call contorller function
// router.post('/create-student', studentControllers.createStudent);

// get a single student from DB
router.get(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
  studentControllers.getSingleStudent,
);

// update a student from DB
router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(updateStudentValidationSchema),
  studentControllers.updateStudent,
);

// delete a student from DB
router.delete(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  studentControllers.deleteStudent,
);

// get all student from DB
router.get(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  studentControllers.getAllStudents,
);

export const StudentRoutes = router;
