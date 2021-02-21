import { v4 } from 'uuid';

import ICreateLessonDTO from '@modules/lessons/dtos/ICreateLessonDTO';
import ILessonsRepository from '../ILessonsRepository';

import Lesson from '../../infra/typeorm/entities/Lesson';

class FakeLessonsRepository implements ILessonsRepository {
  private lessons: Lesson[] = [];

  public async findById(id: string): Promise<Lesson | undefined> {
    const foundLesson = this.lessons.find(lesson => lesson.id === id);

    return foundLesson;
  }

  public async findByCourseId(id: string): Promise<Lesson[]> {
    const lessons = this.lessons.filter(lesson => lesson.course_id === id);

    return lessons;
  }

  public async create({
    name,
    duration,
    course_id,
    description,
    video_id,
  }: ICreateLessonDTO): Promise<Lesson> {
    const lesson = new Lesson();

    Object.assign(lesson, {
      id: v4(),
      name,
      duration,
      course_id,
      description,
      video_id,
    });

    this.lessons.push(lesson);

    return lesson;
  }

  public async save(lesson: Lesson): Promise<Lesson> {
    const findIndex = this.lessons.findIndex(
      findLesson => findLesson.id === lesson.id,
    );

    this.lessons[findIndex] = lesson;

    return lesson;
  }
}

export default FakeLessonsRepository;
