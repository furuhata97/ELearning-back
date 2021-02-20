import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthentication from '@modules/users/infra/http/middleware/ensureAuthentication';
import LessonsController from '../controllers/LessonsController';

const lessonsRouter = Router();

const lessonsController = new LessonsController();

lessonsRouter.post(
  '/',
  ensureAuthentication,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      duration: Joi.number().required(),
      course_id: Joi.string().required(),
      description: Joi.string().required(),
      video_url: Joi.string().required(),
    },
  }),
  lessonsController.create,
);

lessonsRouter.put(
  '/:id',
  ensureAuthentication,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      duration: Joi.number().required(),
      course_id: Joi.string().required(),
      description: Joi.string().required(),
      video_url: Joi.string().required(),
    },
  }),
  lessonsController.update,
);

export default lessonsRouter;
