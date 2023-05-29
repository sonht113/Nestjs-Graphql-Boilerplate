import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('User')
export class UserDto {
  @Field((types) => ID)
  id: string;

  @Field()
  username: string;

  @Field()
  password: string;
}
