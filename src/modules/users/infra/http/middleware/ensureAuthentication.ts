import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '@config/auth';

import AppError from '@shared/errors/AppError';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthentication(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const cookie_token = request.cookies.token;

  if (!cookie_token) {
    throw new AppError('JWT token missing', 401);
  }

  const { secret } = authConfig.jwt;

  if (!secret) {
    throw new AppError('Unable to authenticate', 401);
  }

  try {
    const decoded = verify(cookie_token, secret);
    const { sub } = decoded as ITokenPayload;
    request.user = {
      id: sub,
    };
    return next();
  } catch {
    throw new AppError('Invalid JWT Token', 401);
  }
}
