import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";

import { Student } from "./entities/students.entity";

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  public async getStudentByEmail(email: string): Promise<Student[]> {
    try {
      const student = await this.studentRepository.find({
        where: { email },
        relations: ['parent']
      })
      return student
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async getStudentById(id: string): Promise<Student> {
    try {
      const student = await this.studentRepository.findOneBy({ id: id })
      return student;
    } catch (error) {
      return null
    }
  }

  public async createStudent(student: any): Promise<Student> {
    try {
      const newStudent = await this.studentRepository.save(student);
      return newStudent;
    } catch (error) {
      console.log(error)
      return null;
    }
  }

}
