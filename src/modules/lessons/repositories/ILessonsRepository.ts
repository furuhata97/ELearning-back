import Lesson from '../infra/typeorm/entities/Lesson';

import ICreateLessonDTO from '../dtos/ICreateLessonDTO';

export default interface ILessonRepository {
  findById(id: string): Promise<Lesson | undefined>;
  create(data: ICreateLessonDTO): Promise<Lesson>;
  save(lesson: Lesson): Promise<Lesson>;
  findByCourseId(id: string): Promise<Lesson[]>;
}
