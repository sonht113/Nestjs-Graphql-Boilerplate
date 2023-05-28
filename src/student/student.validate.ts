import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class StudentValidate {
  @IsNotEmpty()
  @Field()
  firstName: string;

  @IsNotEmpty()
  @Field()
  lastName: string;
}
