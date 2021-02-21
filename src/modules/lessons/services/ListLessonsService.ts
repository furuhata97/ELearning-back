import { inject, injectable } from 'tsyringe';
import Lesson from '@modules/lessons/infra/typeorm/entities/Lesson';
import ILessonsRepository from '../repositories/ILessonsRepository';

interface IRequest {
  id: string;
}

@injectable()
class ListLessonsService {
  constructor(
    @inject('LessonsRepository')
    private lessonsRepository: ILessonsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Lesson[]> {
    const lessons = await this.lessonsRepository.findByCourseId(id);

    return lessons;
  }
}

export default ListLessonsService;
