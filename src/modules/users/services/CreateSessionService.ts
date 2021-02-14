import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { uuid } from 'uuidv4';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import User from '../infra/typeorm/entities/User';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUserRepository from '../repositories/IUsersRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
  refreshToken: string;
}

@injectable()
class CreateSessionService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password', 401);
    }

    const passwordDecoded = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordDecoded) {
      throw new AppError('Incorrect email/password', 401);
    }

    if (!authConfig.jwt?.secret) {
      throw new AppError('Internal error. Unable to authenticate', 500);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    const refreshToken = uuid();

    const cacheKey = `refreshToken:${refreshToken}`;
    await this.cacheProvider.save(
      cacheKey,
      JSON.stringify({ token, refreshToken, user_id: user.id }),
    );

    return {
      user,
      token,
      refreshToken,
    };
  }
}

export default CreateSessionService;
