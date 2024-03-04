import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { ParentService } from './parents.service';
import { AuthGuard } from '../security/authentication/auth.guard';
import { Parent } from './entities/parents.entity';
import { Roles } from 'src/security/authorization/roles.enum';
import { AuthByRole } from 'src/security/authorization/roles.decorator';
import { Public } from 'src/security/authorization/public.decorator';

@Controller()
export class ParentController {
  constructor(private readonly parentService: ParentService) {}

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
  @Post('parent/signin')
  async signIn(@Body() ParentInfo: {email: string, pass: string}): Promise<{access_token: string}> {
    const { email, pass } = ParentInfo;
    return await this.parentService.signIn(email, pass);
  }

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('parent/signup')
  async createParent(@Body() Parent: any): Promise<Parent> {
    return await this.parentService.createParent(Parent);
  }

  @HttpCode(HttpStatus.OK)
  @AuthByRole(Roles.ADMIN)
  @UseGuards(AuthGuard)
  @Get('parent/:email')
  async getParentByEmail(@Param('email') email: string ): Promise<Parent[]> {
    return await this.parentService.getParentByEmail(email.toString());
  }

}
