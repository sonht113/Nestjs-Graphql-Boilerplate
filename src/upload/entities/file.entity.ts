import { Field } from '@nestjs/graphql';
import { Stream } from 'stream';
import { Entity } from 'typeorm';

@Entity()
export class FileUpload {
  @Field()
  filename: string;

  @Field()
  mimetype: string;

  @Field()
  encoding: string;

  @Field()
  createReadStream: () => Stream;
}
