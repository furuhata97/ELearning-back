import { validate } from 'uuid';

import ICoursesRepository from '@modules/courses/repositories/ICoursesRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Lesson from '../infra/typeorm/entities/Lesson';
import ILessonRepository from '../repositories/ILessonsRepository';
import videoUrlParser from '../utils/videoUrlParser';

interface IRequest {
  name: string;
  duration: number;
  course_id: string;
  description: string;
  video_url: string;
}

@injectable()
class CreateLessonService {
  constructor(
    @inject('LessonsRepository')
    private lessonsRepository: ILessonRepository,

    @inject('CoursesRepository')
    private coursesRepository: ICoursesRepository,
  ) {}

  public async execute({
    name,
    duration,
    course_id,
    description,
    video_url,
  }: IRequest): Promise<Lesson> {
    if (!validate(course_id)) {
      throw new AppError('Invalid ID format', 422);
    }

    const course = await this.coursesRepository.findById(course_id);

    if (!course) {
      throw new AppError('Course not found', 404);
    }

    const video_id = videoUrlParser(video_url);

    if (video_id.length === 0) {
      throw new AppError('Invalid video URL', 422);
    }

    const lesson = await this.lessonsRepository.create({
      name,
      duration,
      course_id,
      description,
      video_id,
    });

    return lesson;
  }
}

export default CreateLessonService;
