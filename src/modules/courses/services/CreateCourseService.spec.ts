import AppError from '@shared/errors/AppError';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeCoursesRepository from '../repositories/fakes/FakeCoursesRepository';
import CreateCoursesService from './CreateCourseService';

let createCourse: CreateCoursesService;
let fakeCoursesRepository: FakeCoursesRepository;
let fakeStorageProvider: FakeStorageProvider;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeCoursesRepository = new FakeCoursesRepository();
    fakeStorageProvider = new FakeStorageProvider();
    createCourse = new CreateCoursesService(
      fakeCoursesRepository,
      fakeStorageProvider,
    );
  });

  it('should be able to create a new course', async () => {
    const course = await createCourse.execute({
      name: 'Example',
      course_image: 'teste.jpg',
    });

    expect(course).toHaveProperty('id');
  });

  it('should be able to create a course without provided image', async () => {
    const course = await createCourse.execute({
      name: 'Example',
    });

    expect(course).toHaveProperty('id');
  });
});
