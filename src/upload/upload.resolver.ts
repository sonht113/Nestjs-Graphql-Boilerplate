import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { createWriteStream } from 'fs';
import { FileUpload } from './upload.type';
import { join } from 'path';
import { HttpException, HttpStatus } from '@nestjs/common';

@Resolver()
export class UploadResolver {
  @Mutation(() => Boolean)
  async uploadFile(image: Promise<FileUpload>) {
    const { createReadStream, filename } = await image;
    return new Promise(async (resolve) => {
      createReadStream()
        .pipe(
          createWriteStream(join(process.cwd(), `./src/uploads/${filename}`)),
        )
        .on('finish', () =>
          resolve({
            image: filename,
          }),
        )
        .on('error', () => {
          new HttpException('Could not save image', HttpStatus.BAD_REQUEST);
        });
    });
  }
}
