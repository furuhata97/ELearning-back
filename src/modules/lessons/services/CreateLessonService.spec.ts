import AppError from '@shared/errors/AppError';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeCoursesRepository from '@modules/courses/repositories/fakes/FakeCoursesRepository';
import CreateCourseService from '@modules/courses/services/CreateCourseService';
import { v4 } from 'uuid';
import FakeLessonsRepository from '../repositories/fakes/FakeLessonsRepository';
import CreateLessonService from './CreateLessonService';

let fakeLessonsRepository: FakeLessonsRepository;
let createLesson: CreateLessonService;
let fakeCoursesRepository: FakeCoursesRepository;
let createCourse: CreateCourseService;
let fakeStorageProvider: FakeStorageProvider;

describe('CreateLesson', () => {
  beforeEach(() => {
    fakeLessonsRepository = new FakeLessonsRepository();
    fakeCoursesRepository = new FakeCoursesRepository();
    fakeStorageProvider = new FakeStorageProvider();
    createLesson = new CreateLessonService(
      fakeLessonsRepository,
      fakeCoursesRepository,
    );
    createCourse = new CreateCourseService(
      fakeCoursesRepository,
      fakeStorageProvider,
    );
  });

  it('should be able to create a new lesson', async () => {
    const course = await createCourse.execute({
      name: 'Example',
      course_image: 'example.png',
    });

    const lesson = await createLesson.execute({
      name: 'Example lesson',
      course_id: course.id,
      duration: 500,
      description: 'Example test for lesson',
      video_url: 'youtube.com/watch?v=h3zP-LY2DN0',
    });

    expect(lesson).toHaveProperty('id');
    expect(lesson.name).toEqual('Example lesson');
  });

  it('shouldn`t be able to create a new lesson with an invalid course id', async () => {
    await expect(
      createLesson.execute({
        name: 'Example lesson',
        course_id: v4(),
        duration: 100,
        description: 'asdfghjkl',
        video_url: 'youtube.com/watch?v=h3zP-LY2DN0',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('shouldn`t be able to create a new lesson with an incorrect course id format', async () => {
    await expect(
      createLesson.execute({
        name: 'Example lesson',
        course_id: 'fake_course.id',
        duration: 100,
        description: 'asdfghjkl',
        video_url: 'youtube.com/watch?v=h3zP-LY2DN0',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new lesson with invalid video url', async () => {
    const course = await createCourse.execute({
      name: 'Example',
      course_image: 'example.png',
    });

    await expect(
      createLesson.execute({
        name: 'Example lesson',
        course_id: course.id,
        duration: 500,
        description: 'Example test for lesson',
        video_url: 'h3zP-LY2DN0',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
