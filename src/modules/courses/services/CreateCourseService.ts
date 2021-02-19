import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import Course from '../infra/typeorm/entities/Course';
import ICoursesRepository from '../repositories/ICoursesRepository';

interface IRequest {
  name: string;
  course_image?: string;
}

@injectable()
class CreateCoursesService {
  constructor(
    @inject('CoursesRepository')
    private coursesRepository: ICoursesRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ name, course_image }: IRequest): Promise<Course> {
    let filename = course_image || 'null';

    if (course_image) {
      filename = await this.storageProvider.saveFile(course_image);
    } else {
      filename = 'null';
    }

    const course = await this.coursesRepository.create({
      name,
      image: filename,
    });

    return course;
  }
}

export default CreateCoursesService;
