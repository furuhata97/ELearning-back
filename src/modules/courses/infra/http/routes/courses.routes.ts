import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthentication from '@modules/users/infra/http/middleware/ensureAuthentication';
import CoursesController from '../controllers/CoursesController';

const upload = multer(uploadConfig);

const coursesRouter = Router();

const coursesController = new CoursesController();

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

export default coursesRouter;
