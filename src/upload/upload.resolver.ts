import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UploadService } from './upload.service';
import { ResponseSingleUpload } from './dto/upload.dto';
import { UploadInputDto, UploadMultipleInputDto } from './dto/upload-input.dto';

@Resolver()
export class UploadResolver {
  constructor(private readonly uploadService: UploadService) {}

  @Mutation(() => ResponseSingleUpload)
  async uploadSingleFiles(@Args() args: UploadInputDto): Promise<any> {
    return this.uploadService.uploadSingleToCloudinaryGraphql(args);
  }

  @Mutation(() => [ResponseSingleUpload])
  async uploadMultipleFiles(
    @Args() args: UploadMultipleInputDto,
  ): Promise<any> {
    return this.uploadService.uploadMultipleToCloudinaryGraphql(args);
  }
}
