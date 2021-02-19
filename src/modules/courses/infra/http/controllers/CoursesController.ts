import CreateCoursesService from '@modules/courses/services/CreateCourseService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class CoursesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;
    const course_image =
      request.file !== undefined ? request.file.filename : undefined;

    const createCourse = container.resolve(CreateCoursesService);

    const course = await createCourse.execute({
      name,
      course_image,
    });

    return response.json(course);
  }
}
