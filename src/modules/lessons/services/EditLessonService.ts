import { injectable, inject } from 'tsyringe';
import { validate } from 'uuid';

import AppError from '@shared/errors/AppError';
import ICoursesRepository from '@modules/courses/repositories/ICoursesRepository';
import ILessonsRepository from '../repositories/ILessonsRepository';
import Lesson from '../infra/typeorm/entities/Lesson';
import videoUrlParser from '../utils/videoUrlParser';

interface IRequest {
  id: string;
  name: string;
  duration: number;
  course_id: string;
  description: string;
  video_url: string;
}

@injectable()
class EditLessonService {
  constructor(
    @inject('LessonsRepository')
    private lessonsRepository: ILessonsRepository,

    @inject('CoursesRepository')
    private coursesRepository: ICoursesRepository,
  ) {}

  public async execute({
    id,
    name,
    duration,
    course_id,
    description,
    video_url,
  }: IRequest): Promise<Lesson> {
    if (!validate(id)) {
      throw new AppError('Invalid ID format', 422);
    }

    const lesson = await this.lessonsRepository.findById(id);

    if (!lesson) {
      throw new AppError('Lesson not found', 404);
    }

    if (!validate(course_id)) {
      throw new AppError('Invalid course ID format');
    }

    const course = await this.coursesRepository.findById(course_id);

    if (!course) {
      throw new AppError('Course not found', 404);
    }

    const video_id = videoUrlParser(video_url);

    if (video_id.length === 0) throw new AppError('Invalid video URL', 422);

    lesson.name = name;
    lesson.duration = duration;
    lesson.course_id = course_id;
    lesson.description = description;
    lesson.video_id = video_id;

    await this.lessonsRepository.save(lesson);

    return lesson;
  }
}

export default EditLessonService;
