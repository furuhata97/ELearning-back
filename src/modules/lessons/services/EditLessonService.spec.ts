import AppError from '@shared/errors/AppError';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeCoursesRepository from '@modules/courses/repositories/fakes/FakeCoursesRepository';
import CreateCourseService from '@modules/courses/services/CreateCourseService';
import { v4 } from 'uuid';
import FakeLessonsRepository from '../repositories/fakes/FakeLessonsRepository';
import CreateLessonService from './CreateLessonService';
import EditLessonService from './EditLessonService';

let fakeLessonsRepository: FakeLessonsRepository;
let createLesson: CreateLessonService;
let editLesson: EditLessonService;
let fakeCoursesRepository: FakeCoursesRepository;
let createCourse: CreateCourseService;
let fakeStorageProvider: FakeStorageProvider;

describe('EditLesson', () => {
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
    editLesson = new EditLessonService(
      fakeLessonsRepository,
      fakeCoursesRepository,
    );
  });

  it('should be able to edit a lesson', async () => {
    const course = await createCourse.execute({
      name: 'Example',
      course_image: 'example.png',
    });

    const lesson = await createLesson.execute({
      name: 'Example lesson',
      course_id: course.id,
      duration: 500,
      description: 'Example test for lesson',
      video_url: 'youtube.com/watch?v=h7nS-LY7FV8',
    });

    const editedLesson = await editLesson.execute({
      id: lesson.id,
      name: 'Edited lesson',
      course_id: course.id,
      duration: 800,
      description: 'esderfed',
      video_url: 'youtube.com/watch?v=h3zP-LY2DN0',
    });

    expect(editedLesson).toHaveProperty('id');
    expect(editedLesson.name).toEqual('Edited lesson');
    expect(editedLesson.video_id).toEqual('h3zP-LY2DN0');
  });

  it('shouldn`t be able to edit a lesson with an invalid id', async () => {
    await expect(
      editLesson.execute({
        id: v4(),
        name: 'Example lesson',
        course_id: v4(),
        duration: 100,
        description: 'asdfghjkl',
        video_url: 'youtube.com/watch?v=h3zP-LY2DN0',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('shouldn`t be able to edit a lesson with an incorrect id format', async () => {
    await expect(
      editLesson.execute({
        id: 'grefe',
        name: 'Example lesson',
        course_id: v4(),
        duration: 100,
        description: 'asdfghjkl',
        video_url: 'youtube.com/watch?v=h3zP-LY2DN0',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('shouldn`t be able to edit a lesson with an incorrect course id format', async () => {
    const course = await createCourse.execute({
      name: 'Example',
      course_image: 'example.png',
    });

    const lesson = await createLesson.execute({
      name: 'Example lesson',
      course_id: course.id,
      duration: 500,
      description: 'Example test for lesson',
      video_url: 'youtube.com/watch?v=h7nS-LY7FV8',
    });

    await expect(
      editLesson.execute({
        id: lesson.id,
        name: 'Example lesson',
        course_id: 'edfrtgrr',
        duration: 100,
        description: 'asdfghjkl',
        video_url: 'youtube.com/watch?v=h3zP-LY2DN0',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('shouldn`t be able to edit a lesson with an incorrect course id', async () => {
    const course = await createCourse.execute({
      name: 'Example',
      course_image: 'example.png',
    });

    const lesson = await createLesson.execute({
      name: 'Example lesson',
      course_id: course.id,
      duration: 500,
      description: 'Example test for lesson',
      video_url: 'youtube.com/watch?v=h7nS-LY7FV8',
    });

    await expect(
      editLesson.execute({
        id: lesson.id,
        name: 'Example lesson',
        course_id: v4(),
        duration: 100,
        description: 'asdfghjkl',
        video_url: 'youtube.com/watch?v=h3zP-LY2DN0',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('shouldn`t be able to edit a lesson with an incorrect video url', async () => {
    const course = await createCourse.execute({
      name: 'Example',
      course_image: 'example.png',
    });

    const lesson = await createLesson.execute({
      name: 'Example lesson',
      course_id: course.id,
      duration: 500,
      description: 'Example test for lesson',
      video_url: 'youtube.com/watch?v=h7nS-LY7FV8',
    });

    await expect(
      editLesson.execute({
        id: lesson.id,
        name: 'Edited lesson',
        course_id: course.id,
        duration: 800,
        description: 'esderfed',
        video_url: 'h3zP-LY2DN0',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
