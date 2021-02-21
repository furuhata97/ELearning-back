import AppError from '@shared/errors/AppError';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeCoursesRepository from '@modules/courses/repositories/fakes/FakeCoursesRepository';
import CreateCourseService from '@modules/courses/services/CreateCourseService';
import ListLessonsService from './ListLessonsService';
import CreateLessonService from './CreateLessonService';
import FakeLessonsRepository from '../repositories/fakes/FakeLessonsRepository';

let createCourse: CreateCourseService;
let listLessons: ListLessonsService;
let createLesson: CreateLessonService;
let fakeCoursesRepository: FakeCoursesRepository;
let fakeStorageProvider: FakeStorageProvider;
let fakeLessonsRepository: FakeLessonsRepository;

describe('ListLessons', () => {
  beforeEach(() => {
    fakeCoursesRepository = new FakeCoursesRepository();
    fakeLessonsRepository = new FakeLessonsRepository();
    fakeStorageProvider = new FakeStorageProvider();
    createCourse = new CreateCourseService(
      fakeCoursesRepository,
      fakeStorageProvider,
    );
    createLesson = new CreateLessonService(
      fakeLessonsRepository,
      fakeCoursesRepository,
    );
    listLessons = new ListLessonsService(fakeLessonsRepository);
  });

  it('should be able to list every lesson from a course', async () => {
    const course = await createCourse.execute({
      name: 'Course 1',
      course_image: 'teste.jpg',
    });

    await createLesson.execute({
      name: 'Lesson 1',
      duration: 562,
      course_id: course.id,
      description: 'Tedffrdcf',
      video_url: 'youtube.com/watch?v=rfAsF-VGB4s',
    });

    await createLesson.execute({
      name: 'Lesson 2',
      duration: 874,
      course_id: course.id,
      description: 'Tedffrdcf',
      video_url: 'youtube.com/watch?v=rfDsF-VtGB4',
    });

    await createLesson.execute({
      name: 'Lesson 3',
      duration: 572,
      course_id: course.id,
      description: 'Tedffrdcf',
      video_url: 'youtube.com/watch?v=rfAHgW-VGB4',
    });

    await createLesson.execute({
      name: 'Lesson 4',
      duration: 214,
      course_id: course.id,
      description: 'Tedffrdcf',
      video_url: 'youtube.com/watch?v=FfAsFg-VGB4',
    });

    const lessons = await listLessons.execute({ id: course.id });

    expect(lessons).toHaveLength(4);
    expect(lessons[0].name).toEqual('Lesson 1');
  });
});
