import Course from '../infra/typeorm/entities/Course';

import ICreateCourseDTO from '../dtos/ICreateCourseDTO';

export default interface ICoursesRepository {
  findById(id: string): Promise<Course | undefined>;
  create(data: ICreateCourseDTO): Promise<Course>;
  save(course: Course): Promise<Course>;
  findAll(): Promise<Course[]>;
}
