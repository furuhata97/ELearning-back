import ListLessonsService from '@modules/lessons/services/ListLessonsService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class LessonsFromCourseController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const listLessons = container.resolve(ListLessonsService);

    const lessons = await listLessons.execute({
      id: String(id),
    });

    return response.json(lessons);
  }
}
