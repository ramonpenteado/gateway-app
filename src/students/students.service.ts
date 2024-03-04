import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";
import { Student } from "./entities/students.entity";

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    private readonly jwtService: JwtService,
  ) {}

  public async getStudentByEmail(email: string): Promise<Student[]> {
    try {
      console.log(email)
      const student = await this.studentRepository.find({
        where: { email },
        relations: ['presence']
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
      return null;
    }
  }

  async signIn(email: string, password: string): Promise<any> {
    const student = await this.getStudentByEmail(email);
    const studentSelected = student[0];
    if (studentSelected?.password !== password) {
        throw new UnauthorizedException('Wrong credentials provided');
    }
    const payload = { email: studentSelected.email, sub: studentSelected.id, aud: studentSelected.roles, roles: [studentSelected.roles] };
    return {
        access_token: await this.jwtService.signAsync(payload),
    }
  }

}
