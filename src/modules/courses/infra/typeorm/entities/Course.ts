import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { Expose } from 'class-transformer';
import Lesson from '@modules/lessons/infra/typeorm/entities/Lesson';

@Entity('courses')
class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  image: string;

  @OneToMany(() => Lesson, lesson => lesson.course, { eager: true })
  lessons: Lesson[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'image_url' })
  getImageUrl(): string | null {
    if (this.image === 'null') return null;

    return `${process.env.APP_API_URL}/files/${this.image}`;
  }
}

export default Course;
