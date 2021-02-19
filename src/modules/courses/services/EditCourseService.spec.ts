import AppError from '@shared/errors/AppError';
import { v4 } from 'uuid';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeCoursesRepository from '../repositories/fakes/FakeCoursesRepository';
import CreateCoursesService from './CreateCourseService';
import EditCourseService from './EditCourseService';

let createCourse: CreateCoursesService;
let fakeCoursesRepository: FakeCoursesRepository;
let fakeStorageProvider: FakeStorageProvider;
let editCourse: EditCourseService;

describe('EditCourse', () => {
  beforeEach(() => {
    fakeCoursesRepository = new FakeCoursesRepository();
    fakeStorageProvider = new FakeStorageProvider();
    createCourse = new CreateCoursesService(
      fakeCoursesRepository,
      fakeStorageProvider,
    );
    editCourse = new EditCourseService(
      fakeCoursesRepository,
      fakeStorageProvider,
    );
  });

  it('should be able to edit an existing course', async () => {
    const course = await createCourse.execute({
      name: 'Example',
      course_image: 'teste.jpg',
    });

    const editedCourse = await editCourse.execute({
      id: course.id,
      name: 'Curso Editado',
      course_image: 'imagem_editada.png',
    });

    expect(editedCourse.name).toEqual('Curso Editado');
    expect(editedCourse.image).toEqual('imagem_editada.png');
    expect(editedCourse.id).toEqual(course.id);
  });

  it('should not be able to process an ID different from UUID', async () => {
    await expect(
      editCourse.execute({
        id: 'randomText',
        name: 'Curso Editado',
        course_image: 'imagem_editada.png',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to edit an unexisting course', async () => {
    await expect(
      editCourse.execute({
        id: v4(),
        name: 'Curso Editado',
        course_image: 'imagem_editada.png',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to edit an existing course without sending a new image', async () => {
    const course = await createCourse.execute({
      name: 'Example',
      course_image: 'teste.jpg',
    });

    const editedCourse = await editCourse.execute({
      id: course.id,
      name: 'Curso Editado',
    });

    expect(editedCourse.name).toEqual('Curso Editado');
    expect(editedCourse.image).toEqual('teste.jpg');
  });

  it('should be able to edit an existing course without any image', async () => {
    const course = await createCourse.execute({
      name: 'Example',
    });

    const editedCourse = await editCourse.execute({
      id: course.id,
      name: 'Curso Editado',
    });

    expect(editedCourse.name).toEqual('Curso Editado');
    expect(editedCourse.image).toEqual('null');
  });

  it('should be able to add image to an existing course without image', async () => {
    const course = await createCourse.execute({
      name: 'Example',
    });

    const editedCourse = await editCourse.execute({
      id: course.id,
      name: 'Curso Editado',
      course_image: 'newImage.png',
    });

    expect(editedCourse.name).toEqual('Curso Editado');
    expect(editedCourse.image).toEqual('newImage.png');
  });
});
