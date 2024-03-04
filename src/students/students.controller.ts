import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { StudentService } from './students.service';
import { AuthGuard } from '../security/authentication/auth.guard';
import { Student } from './entities/students.entity';
import { Roles } from 'src/security/authorization/roles.enum';
import { AuthByRole } from 'src/security/authorization/roles.decorator';
import { Public } from 'src/security/authorization/public.decorator';

@Controller()
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get('/healthcheck')
  @HttpCode(HttpStatus.OK)
  healthcheck(): any {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    }
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('student/signin')
  async signIn(@Body() studentInfo: {email: string, pass: string}): Promise<{access_token: string}> {
    const { email, pass } = studentInfo;
    return await this.studentService.signIn(email, pass);
  }

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('student/signup')
  async createstudent(@Body() student: any): Promise<Student> {
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
