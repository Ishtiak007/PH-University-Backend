import express from 'express';
import { studentControllers } from './student.controller';
const router = express.Router();

// will call contorller function
router.post('/create-student', studentControllers.createStudent);

// get all student from DB
router.get('/', studentControllers.getAllStudents);

export const StudentRoutes = router;
