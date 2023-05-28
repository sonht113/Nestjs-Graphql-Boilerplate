import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { LessonType } from './lesson.type';
import { LessonService } from './lesson.service';
import {
  AssignStudentToLessonValidate,
  LessonValidate,
} from './lesson.validate';
import { StudentService } from 'src/student/student.service';
import { Lesson } from './lesson.entity';

@Resolver((of) => LessonType)
export class LessonResolver {
  constructor(
    private studentService: StudentService,
    private lessonService: LessonService,
  ) {}

  @Query((returns) => [LessonType])
  getAllLesson() {
    return this.lessonService.getLessons();
  }

  @Query((returns) => LessonType)
  getLessonById(@Args('id') id: string) {
    return this.lessonService.getLesson(id);
  }

  @Mutation((returns) => LessonType)
  createLesson(@Args('body') body: LessonValidate) {
    return this.lessonService.createLesson(body);
  }

  @Mutation((returns) => LessonType)
  assignStudentsToLesson(@Args('body') body: AssignStudentToLessonValidate) {
    return this.lessonService.assignStudentsToLesson(body);
  }

  @ResolveField()
  async students(@Parent() lesson: Lesson) {
    return this.studentService.getManyStudents(lesson.students);
  }
}
