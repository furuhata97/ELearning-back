import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

// Para cada repository importe sua interface de métodos e o repositório em si
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import ICoursesRepository from '@modules/courses/repositories/ICoursesRepository';
import CoursesRepository from '@modules/courses/infra/typeorm/repositories/CoursesRepository';

// Para cada repositŕio importado utilize o método abaixo, apenas substituindo corretamente os nomes
container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<ICoursesRepository>(
  'CoursesRepository',
  CoursesRepository,
);
