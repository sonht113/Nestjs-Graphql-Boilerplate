import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { StudentType } from './student.type';
import { StudentService } from './student.service';
import { StudentValidate } from './student.validate';

@Resolver((of) => StudentType)
export class StudentResolver {
  constructor(private studentService: StudentService) {}

  @Query((returns) => [StudentType])
  getAllStudent() {
    return this.studentService.getStudents();
  }

  @Query((returns) => StudentType)
  getStudentById(@Args('id') id: string) {
    return this.studentService.getStudent(id);
  }

  @Mutation((returns) => StudentType)
  createStudent(@Args('body') body: StudentValidate) {
    return this.studentService.createStudent(body);
  }
}
