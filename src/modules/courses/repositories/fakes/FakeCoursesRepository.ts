import { v4 } from 'uuid';

import ICreateCourseDTO from '@modules/courses/dtos/ICreateCourseDTO';
import ICoursesRepository from '../ICoursesRepository';

import Course from '../../infra/typeorm/entities/Course';

class FakeCoursesRepository implements ICoursesRepository {
  private courses: Course[] = [];

  public async findById(id: string): Promise<Course | undefined> {
    const foundCourse = this.courses.find(course => course.id === id);

    return foundCourse;
  }

  public async findAll(): Promise<Course[]> {
    const { courses } = this;

    return courses;
  }

  public async create({ name, image }: ICreateCourseDTO): Promise<Course> {
    const course = new Course();

    Object.assign(course, { id: v4(), name, image });

    this.courses.push(course);

    return course;
  }

  public async save(course: Course): Promise<Course> {
    const findIndex = this.courses.findIndex(
      findCourse => findCourse.id === course.id,
    );

    this.courses[findIndex] = course;

    return course;
  }
}

export default FakeCoursesRepository;
