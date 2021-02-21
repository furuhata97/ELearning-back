import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthentication from '@modules/users/infra/http/middleware/ensureAuthentication';
import CoursesController from '../controllers/CoursesController';
import LessonsFromCourseController from '../controllers/LessonsFromCourseController';

const upload = multer(uploadConfig);

const coursesRouter = Router();

const coursesController = new CoursesController();
const lessonsFromCourseController = new LessonsFromCourseController();

coursesRouter.post(
  '/',
  ensureAuthentication,
  upload.single('course_image'),
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      course_image: Joi.string(),
    },
  }),
  coursesController.create,
);

coursesRouter.put(
  '/:id',
  ensureAuthentication,
  upload.single('course_image'),
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      course_image: Joi.string(),
    },
  }),
  coursesController.update,
);

coursesRouter.get('/', coursesController.show);

coursesRouter.get(
  '/:id/lessons',
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
  }),
  lessonsFromCourseController.show,
);

export default coursesRouter;
