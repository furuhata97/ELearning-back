import { getRepository, Repository } from 'typeorm';

import ICoursesRepository from '@modules/courses/repositories/ICoursesRepository';
import ICreateCourseDTO from '@modules/courses/dtos/ICreateCourseDTO';

import Course from '../entities/Course';

class CoursesRepository implements ICoursesRepository {
  private ormCourseRepository: Repository<Course>;

  constructor() {
    this.ormCourseRepository = getRepository(Course);
  }

  public async create({ name, image }: ICreateCourseDTO): Promise<Course> {
    const course = !image
      ? this.ormCourseRepository.create({ name })
      : this.ormCourseRepository.create({ name, image });

    await this.ormCourseRepository.save(course);

    return course;
  }

  public async save(course: Course): Promise<Course> {
    return this.ormCourseRepository.save(course);
  }

  public async findById(id: string): Promise<Course | undefined> {
    const course = await this.ormCourseRepository.findOne(id);

    return course;
  }

  public async findAll(): Promise<Course[]> {
    const courses = await this.ormCourseRepository.find();

    return courses;
  }
}

export default CoursesRepository;
