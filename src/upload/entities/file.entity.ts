import { Stream } from 'stream';
import { Entity, Column } from 'typeorm';

@Entity()
export class FileUpload {
  @Column()
  filename: string;

  @Column()
  mimetype: string;

  @Column()
  encoding: string;

  @Column()
  createReadStream: () => Stream;
}
