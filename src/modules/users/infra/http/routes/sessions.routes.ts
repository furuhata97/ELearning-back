import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import SessionsController from '../controllers/SessionsController';
import RefreshTokenController from '../controllers/RefreshTokenController';

import ensureAuthenticated from '../middleware/ensureAuthentication';

const sessionsRouter = Router();
const sessionsController = new SessionsController();
const refreshTokenController = new RefreshTokenController();

sessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  sessionsController.create,
);

sessionsRouter.get('/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

sessionsRouter.delete('/logout', sessionsController.delete);

sessionsRouter.post(
  '/refresh',
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().required(),
    },
  }),
  refreshTokenController.create,
);

export default sessionsRouter;
