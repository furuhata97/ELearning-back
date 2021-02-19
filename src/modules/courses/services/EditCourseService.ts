import { injectable, inject } from 'tsyringe';
import { validate } from 'uuid';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import AppError from '@shared/errors/AppError';
import ICoursesRepository from '../repositories/ICoursesRepository';
import Course from '../infra/typeorm/entities/Course';

interface IRequest {
  id: string;
  name: string;
  course_image?: string;
}

@injectable()
class EditCourseService {
  constructor(
    @inject('CoursesRepository')
    private coursesRepository: ICoursesRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ id, name, course_image }: IRequest): Promise<Course> {
    if (!validate(id)) {
      throw new AppError('Invalid ID format', 422);
    }

    const course = await this.coursesRepository.findById(id);

    if (!course) {
      throw new AppError('Course noit found', 404);
    }

    if (course.image !== 'null' && course_image) {
      await this.storageProvider.deleteFile(course.image);
    }

    course.name = name;
    if (course_image) {
      course.image = await this.storageProvider.saveFile(course_image);
    }

    await this.coursesRepository.save(course);

    return course;
  }
}

export default EditCourseService;
