import { getRepository, Repository } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  private ormUserRepository: Repository<User>;

  constructor() {
    this.ormUserRepository = getRepository(User);
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormUserRepository.findOne(id);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormUserRepository.findOne({ where: { email } });

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormUserRepository.save(user);
  }

  public async create({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = this.ormUserRepository.create({ name, email, password });

    await this.ormUserRepository.save(user);

    return user;
  }
}

export default UsersRepository;
