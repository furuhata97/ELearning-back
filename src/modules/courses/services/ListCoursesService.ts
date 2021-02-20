import { inject, injectable } from 'tsyringe';
import Course from '@modules/courses/infra/typeorm/entities/Course';
import ICoursesRepository from '../repositories/ICoursesRepository';

@injectable()
class ListCoursesService {
  constructor(
    @inject('CoursesRepository')
    private coursesRepository: ICoursesRepository,
  ) {}

  public async execute(): Promise<Course[]> {
    const courses = await this.coursesRepository.findAll();

    return courses;
  }
}

export default ListCoursesService;
