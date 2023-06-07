import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { createWriteStream } from 'fs';
import { GraphQLUpload } from 'apollo-upload-server';

@Injectable()
export class UploadService {
  async uploadFile(file: GraphQLUpload): Promise<string> {
    if (file) {
      // const { filename, mimetype, encoding, createReadStream } = file;
      // const stream = createReadStream();
      const newFileName = this.concatExtension(file.filename);
      const upload: Promise<string> = new Promise((resolve, reject) =>
        file
          .createReadStream()
          .pipe(createWriteStream('./uploads/' + newFileName))
          .on('finish', () => {
            resolve(newFileName);
          })
          .on('error', (err) => {
            reject(err);
          }),
      );

      return upload;
    }
  }

  private concatExtension(filename) {
    const extension = filename.split('.').pop();
    return `${uuidv4()}-${Date.now()}.${extension}`;
  }
}
