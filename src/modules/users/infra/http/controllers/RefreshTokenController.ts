import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AppError from '@shared/errors/AppError';
import RefreshTokenService from '../../../services/RefreshTokenService';

export default class RefreshTokenController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { id } = request.body;
    const { refreshToken } = request.cookies;

    if (!refreshToken) {
      throw new AppError('No refresh token provided', 401);
    }

    const refresh = container.resolve(RefreshTokenService);

    const { user, token } = await refresh.execute({
      id,
      refreshToken,
    });

    response.cookie('token', token, { httpOnly: true });

    return response.json({ user: classToClass(user) });
  }
}
