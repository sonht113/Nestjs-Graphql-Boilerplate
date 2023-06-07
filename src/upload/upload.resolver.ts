import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UploadService } from './upload.service';
import { UploadFileDto } from './dto/upload.dto';
import { GraphQLUpload } from 'apollo-upload-server';

@Resolver(() => UploadFileDto)
export class UploadResolver {
  constructor(private readonly uploadService: UploadService) {}
  @Mutation(() => String)
  async uploadFile(
    @Args('file')
    file: GraphQLUpload,
  ) {
    return await this.uploadService.uploadFile(file);
  }
}
