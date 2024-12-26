import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CourseValidations } from './course.validation';
import { CourseControllers } from './course.controller';
const router = express.Router();

router.post(
  '/create-academic-faculty',
  validateRequest(CourseValidations.createCourseValidationSchema),
  CourseControllers.createCourse,
);

router.get('/:id', CourseControllers.getSingleCourse);

// router.patch(
//   '/:id',
//   validateRequest(
//     academicFacultyValidation.updateAcatdemicFacaltyValidationSchema,
//   ),
//   CourseControllers.updateAcademicFaculty,
// );

router.get('/', CourseControllers.getAllCourses);

export const CourseRoutes = router;
