import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from './lesson.entity';
import { Repository } from 'typeorm';
import { AssignStudentToLessonValidate } from 'src/lesson/lesson.validate';
import { LessonValidate } from './lesson.validate';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson) private lessonRepository: Repository<Lesson>,
  ) {}

  async getLessons(): Promise<Lesson[]> {
    return this.lessonRepository.find();
  }

  async getLesson(id: string): Promise<Lesson> {
    return this.lessonRepository.findOne({
      where: {
        id,
      },
    });
  }

  async createLesson(body: LessonValidate): Promise<Lesson> {
    const { name, startDate, endDate, students } = body;
    const lesson = this.lessonRepository.create({
      id: uuid(),
      name,
      startDate,
      endDate,
      students,
    });
    return this.lessonRepository.save(lesson);
  }

  async assignStudentsToLesson(
    body: AssignStudentToLessonValidate,
  ): Promise<Lesson> {
    const { lessonId, studentIds } = body;

    const lesson = await this.lessonRepository.findOne({
      where: {
        id: lessonId,
      },
    });

    lesson.students = [...lesson.students, ...studentIds];
    return this.lessonRepository.save(lesson);
  }
}
