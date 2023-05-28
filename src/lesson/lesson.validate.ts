import { Field, ID, InputType } from '@nestjs/graphql';
import { IsDateString, IsUUID, MinLength } from 'class-validator';

@InputType()
export class LessonValidate {
  @MinLength(2)
  @Field()
  name: string;

  @IsDateString()
  @Field()
  startDate: string;

  @IsDateString()
  @Field()
  endDate: string;

  @IsUUID('4', { each: true })
  @Field(() => [ID], { defaultValue: [] })
  students: string[];
}

@InputType()
export class AssignStudentToLessonValidate {
  @IsUUID()
  @Field((type) => ID)
  lessonId: string;

  @IsUUID('4', { each: true })
  @Field((type) => [ID])
  studentIds: string[];
}
