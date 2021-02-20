import CreateLessonsService from '@modules/lessons/services/CreateLessonService';
import EditLessonService from '@modules/lessons/services/EditLessonService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class LessonsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, duration, course_id, description, video_url } = request.body;

    const createLesson = container.resolve(CreateLessonsService);

    const lesson = await createLesson.execute({
      name,
      duration,
      course_id,
      description,
      video_url,
    });

    return response.json(lesson);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, duration, course_id, description, video_url } = request.body;
    const { id } = request.params;

    const editLesson = container.resolve(EditLessonService);

    const lesson = await editLesson.execute({
      id: String(id),
      name,
      duration,
      course_id,
      description,
      video_url,
    });

    return response.json(lesson);
  }
}
