import { Module } from '@nestjs/common';
import { UploadResolver } from './upload.resolver';
import { UploadService } from './upload.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileUpload } from './entities/file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FileUpload])],
  providers: [UploadResolver, UploadService],
})
export class UploadModule {}
