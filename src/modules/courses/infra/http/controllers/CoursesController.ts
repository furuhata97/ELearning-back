import CreateCoursesService from '@modules/courses/services/CreateCourseService';
import EditCourseService from '@modules/courses/services/EditCourseService';
import ListCoursesService from '@modules/courses/services/ListCoursesService';
import { classToClass } from 'class-transformer';
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

    return response.json(classToClass(course));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;
    const { id } = request.params;
    const course_image =
      request.file !== undefined ? request.file.filename : undefined;

    const editCourse = container.resolve(EditCourseService);

    const course = await editCourse.execute({
      id: String(id),
      name,
      course_image,
    });

    return response.json(classToClass(course));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const listCourses = container.resolve(ListCoursesService);

    const courses = await listCourses.execute();

    return response.json(classToClass(courses));
  }
}
