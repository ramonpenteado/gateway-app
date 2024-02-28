import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './user.service';
import { AuthGuard } from '../security/authentication/auth.guard';
import { User } from './entities/user.entity';
import { Roles } from 'src/security/authorization/roles.enum';
import { AuthByRole } from 'src/security/authorization/roles.decorator';
import { Public } from 'src/security/authorization/public.decorator';

@Controller()
export class UsersController {
  constructor(private readonly userService: UsersService) {}

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
  @Post('user/signin')
  async signIn(@Body() userInfo: {email: string, pass: string}): Promise<{access_token: string}> {
    const { email, pass } = userInfo;
    return await this.userService.signIn(email, pass);
  }

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('user/signup')
  async createUser(@Body() user: any): Promise<User> {
    return await this.userService.createUser(user);
  }

  @HttpCode(HttpStatus.OK)
  @AuthByRole(Roles.ADMIN)
  @UseGuards(AuthGuard)
  @Get('user/:email')
  async getUserByEmail(@Param('email') email: string ): Promise<User[]> {
    return await this.userService.getUserByEmail(email.toString());
  }

}
