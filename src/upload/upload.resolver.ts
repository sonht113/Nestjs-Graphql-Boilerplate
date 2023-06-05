import { Resolver, Mutation, Args } from '@nestjs/graphql';
import * as GraphQLUpload from 'graphql-upload';
import { FileUpload } from './entities/file.entity';
import { UploadService } from './upload.service';
import { UploadFileDto } from './dto/upload.dto';

@Resolver(() => UploadFileDto)
export class UploadResolver {
  constructor(private readonly uploadService: UploadService) {}
  @Mutation(() => String)
  async uploadFile(
    @Args({ name: 'file', type: () => GraphQLUpload })
    file: FileUpload,
  ) {
    return await this.uploadService.uploadFile(file);
  }
}
