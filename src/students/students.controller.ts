import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards
} from '@nestjs/common';

import { AuthGuard } from '../security/authentication/auth.guard';
import { AuthByRole } from 'src/security/authorization/roles.decorator';
import { Public } from 'src/security/authorization/public.decorator';
import { Roles } from 'src/security/authorization/roles.enum';
import { Student } from './entities/students.entity';
import { StudentService } from './students.service';

@Controller()
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('student/signup')
  async createstudent(@Body() student: any): Promise<Student> {
    console.log(student)
    return await this.studentService.createStudent(student);
  }

  @HttpCode(HttpStatus.OK)
  @AuthByRole(Roles.ADMIN)
  @UseGuards(AuthGuard)
  @Get('student/:email')
  async getstudentByEmail(@Param('email') email: string ): Promise<Student[]> {
    return await this.studentService.getStudentByEmail(email.toString());
  }

}
