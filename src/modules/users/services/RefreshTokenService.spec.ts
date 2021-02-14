import AppError from '@shared/errors/AppError';

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateSessionService from './CreateSessionService';
import RefreshTokenService from './RefreshTokenService';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let authenticateUser: CreateSessionService;
let fakeCacheProvider: FakeCacheProvider;
let refreshToken: RefreshTokenService;

describe('RefreshToken', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    authenticateUser = new CreateSessionService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );
    refreshToken = new RefreshTokenService(
      fakeUsersRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to refresh token', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const createToken = await authenticateUser.execute({
      email: 'johndoe@example.com',
      password: '123456',
    });

    const refreshedToken = await refreshToken.execute({
      id: user.id,
      refreshToken: createToken.refreshToken,
    });

    expect(refreshedToken).toHaveProperty('token');
    expect(refreshedToken.user).toEqual(user);
  });

  it('should not be able to refresh if refreshToken does not exist', async () => {
    await expect(
      refreshToken.execute({
        id: 'erfwbrg',
        refreshToken: 'vdfbvdfbdsdsv',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to refresh if user id is different from id in refreshToken', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const createToken = await authenticateUser.execute({
      email: 'johndoe@example.com',
      password: '123456',
    });

    await expect(
      refreshToken.execute({
        id: 'erfwbrg',
        refreshToken: createToken.refreshToken,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  //   await expect(
  //     authenticateUser.execute({
  //       email: 'johndoe@example.com',
  //       password: '1234567',
  //     }),
  //   ).rejects.toBeInstanceOf(AppError);
  // });
});
