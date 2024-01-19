import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './user.service';
import { AuthGuard } from '../auth-guard';

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

  @UseGuards(AuthGuard)
  @Get('user/:id')
  async getUserById(@Param() id: number ): Promise<any> {
    return await this.userService.getUserById(id);
  }

  @UseGuards(AuthGuard)
  @Get('user/:email')
  async getUserByEmail(@Param() email: string ): Promise<any> {
    return await this.userService.getUserByEmail(email);
  }

  @HttpCode(HttpStatus.OK)
  @Post('user/signin')
  async signIn(@Body() userInfo: any): Promise<any> {
    const { email, pass } = userInfo;
    console.log("email - gateway controler", email)
    return await this.userService.signIn(email, pass);
  }

}
