import AppError from '@shared/errors/AppError';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeCoursesRepository from '../repositories/fakes/FakeCoursesRepository';
import CreateCoursesService from './CreateCourseService';
import ListCoursesService from './ListCoursesService';

let createCourse: CreateCoursesService;
let listCourses: ListCoursesService;
let fakeCoursesRepository: FakeCoursesRepository;
let fakeStorageProvider: FakeStorageProvider;

describe('ListCourses', () => {
  beforeEach(() => {
    fakeCoursesRepository = new FakeCoursesRepository();
    fakeStorageProvider = new FakeStorageProvider();
    createCourse = new CreateCoursesService(
      fakeCoursesRepository,
      fakeStorageProvider,
    );
    listCourses = new ListCoursesService(fakeCoursesRepository);
  });

  it('should be able to list every courses', async () => {
    await createCourse.execute({
      name: 'Example 1',
      course_image: 'teste.jpg',
    });

    await createCourse.execute({
      name: 'Example 2',
      course_image: 'teste.jpg',
    });

    await createCourse.execute({
      name: 'Example 3',
      course_image: 'teste.jpg',
    });

    const courses = await listCourses.execute();

    expect(courses).toHaveLength(3);
    expect(courses[0].name).toEqual('Example 1');
  });
});
