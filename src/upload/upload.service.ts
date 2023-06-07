import { Injectable } from '@nestjs/common';
import { Readable } from 'stream';
import toStream = require('buffer-to-stream');
import { v2 } from 'cloudinary';

@Injectable()
export class UploadService {
  /**
   *
   * @param args upload with GRAPHQL
   * @returns
   */
  // upload single to cloudinary with graphql
  async uploadSingleToCloudinaryGraphql(args: any): Promise<any> {
    console.log(args.file);
    const { createReadStream } = await args.file;
    const stream = createReadStream();
    const buffer = await this.streamToBuffer(stream());
    return this.cloudinary(buffer);
  }

  // upload multiple to cloudinary with graphql
  async uploadMultipleToCloudinaryGraphql(args: any): Promise<any> {
    try {
      const arrayResponse: any[] = [];
      await Promise.all(
        args.files.map(async (file: any) => {
          const result = await this.uploadSingleToCloudinaryGraphql({
            file: file,
          });
          arrayResponse.push(result);
        }),
      );
      return arrayResponse;
    } catch (error) {
      console.log(error);
    }
  }

  async streamToBuffer(stream: Readable): Promise<Buffer> {
    const buffer: Uint8Array[] = [];

    return new Promise((resolve, reject) =>
      stream
        .on('error', (error) => reject(error))
        .on('data', (data) => buffer.push(data))
        .on('end', () => resolve(Buffer.concat(buffer))),
    );
  }

  async cloudinary(buffer: any): Promise<any> {
    return await new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream(
        { folder: 'upload' },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );
      toStream(buffer).pipe(upload);
    });
  }
}
