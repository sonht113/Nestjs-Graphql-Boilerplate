import { Field, ObjectType } from '@nestjs/graphql';
import { Stream } from 'stream';

@ObjectType()
export class UploadFileInputDto {
  @Field()
  filename: string;

  @Field()
  mimetype: string;

  @Field()
  encoding: string;

  @Field()
  createReadStream: () => Stream;
}
