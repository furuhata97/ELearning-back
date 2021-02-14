/* eslint-disable @typescript-eslint/ban-ts-comment */
import AppError from '@shared/errors/AppError';

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateSessionService from './CreateSessionService';
import LogoutService from './LogoutService';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let authenticateUser: CreateSessionService;
let fakeCacheProvider: FakeCacheProvider;
let logout: LogoutService;

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
    logout = new LogoutService(fakeCacheProvider);
  });

  it('should be able to logout user', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const createToken = await authenticateUser.execute({
      email: 'johndoe@example.com',
      password: '123456',
    });

    await logout.execute({
      refreshToken: createToken.refreshToken,
    });

    const loggedout = await fakeCacheProvider.recover(createToken.refreshToken);

    expect(loggedout).toBeUndefined();
  });

  it('should not be able to logout if refreshToken does not exist', async () => {
    const refreshToken = undefined;
    await expect(
      logout.execute({
        // @ts-ignore
        refreshToken,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
