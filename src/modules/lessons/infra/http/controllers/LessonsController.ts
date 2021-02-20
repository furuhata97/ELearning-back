import CreateLessonsService from '@modules/lessons/services/CreateLessonService';
import videoUrlParser from '@modules/lessons/utils/videoUrlParser';
import AppError from '@shared/errors/AppError';
// import EditLessonService from '@modules/lessons/services/EditLessonService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class LessonsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, duration, course_id, description, video_url } = request.body;

    const video_id = videoUrlParser(video_url);

    if (video_id.length === 0) {
      throw new AppError('Invalid URL', 422);
    }

    const createLesson = container.resolve(CreateLessonsService);

    const lesson = await createLesson.execute({
      name,
      duration,
      course_id,
      description,
      video_id,
    });

    return response.json(lesson);
  }

  // public async update(request: Request, response: Response): Promise<Response> {
  //   const { name } = request.body;
  //   const { id } = request.params;
  //   const lesson_image =
  //     request.file !== undefined ? request.file.filename : undefined;

  //   const editLesson = container.resolve(EditLessonService);

  //   const lesson = await editLesson.execute({
  //     id: String(id),
  //     name,
  //     lesson_image,
  //   });

  //   return response.json(classToClass(lesson));
  // }
}
