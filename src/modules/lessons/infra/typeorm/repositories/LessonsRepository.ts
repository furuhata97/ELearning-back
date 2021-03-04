import { getRepository, Repository } from 'typeorm';

import ILessonsRepository from '@modules/lessons/repositories/ILessonsRepository';
import ICreateLessonDTO from '@modules/lessons/dtos/ICreateLessonDTO';

import Lesson from '../entities/Lesson';

class LessonsRepository implements ILessonsRepository {
  private ormLessonRepository: Repository<Lesson>;

  constructor() {
    this.ormLessonRepository = getRepository(Lesson);
  }

  public async create({
    name,
    duration,
    course_id,
    description,
    video_id,
  }: ICreateLessonDTO): Promise<Lesson> {
    const lesson = this.ormLessonRepository.create({
      name,
      duration,
      course_id,
      description,
      video_id,
    });

    await this.ormLessonRepository.save(lesson);

    return lesson;
  }

  public async save(lesson: Lesson): Promise<Lesson> {
    return this.ormLessonRepository.save(lesson);
  }

  public async findById(id: string): Promise<Lesson | undefined> {
    const lesson = await this.ormLessonRepository.findOne(id);

    return lesson;
  }

  public async findByCourseId(id: string): Promise<Lesson[]> {
    const lessons = await this.ormLessonRepository.find({
      where: { course_id: id },
      order: { created_at: 'ASC' },
    });

    return lessons;
  }
}

export default LessonsRepository;
