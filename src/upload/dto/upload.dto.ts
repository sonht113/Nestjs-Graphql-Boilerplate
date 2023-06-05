import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UploadFileDto {
  @Field()
  uploadFile: string;
}
