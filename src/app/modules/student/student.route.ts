import express from 'express';
import { studentControllers } from './student.controller';
const router = express.Router();

// will call contorller function
// router.post('/create-student', studentControllers.createStudent);

// get a single student from DB
router.get('/:studentId', studentControllers.getSingleStudent);

// delete a student from DB
router.delete('/:studentId', studentControllers.deleteStudent);

// get all student from DB
router.get('/', studentControllers.getAllStudents);

export const StudentRoutes = router;
