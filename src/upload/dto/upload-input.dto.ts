import { GraphQLUpload, Upload } from 'graphql-upload-minimal';

import { Field, ArgsType } from '@nestjs/graphql';

@ArgsType()
export class UploadInputDto {
  @Field(() => GraphQLUpload)
  file!: Promise<Upload>;
}

@ArgsType()
export class UploadMultipleInputDto {
  @Field(() => [GraphQLUpload])
  files!: Promise<[Upload]>;
}
