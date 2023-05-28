import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';
import { StudentValidate } from './student.validate';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>,
  ) {}

  async getStudents(): Promise<Student[]> {
    return this.studentRepository.find();
  }

  async getStudent(id: string): Promise<Student> {
    return this.studentRepository.findOne({
      where: {
        id,
      },
    });
  }

  async getManyStudents(studentIds: string[]): Promise<Student[]> {
    return this.studentRepository.find({
      where: {
        id: {
          $in: studentIds,
        } as any,
      },
    });
  }

  async createStudent(body: StudentValidate): Promise<Student> {
    const { firstName, lastName } = body;
    const student = this.studentRepository.create({
      id: uuid(),
      firstName,
      lastName,
    });
    return this.studentRepository.save(student);
  }
}
