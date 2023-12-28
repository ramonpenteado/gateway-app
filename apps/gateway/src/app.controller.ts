import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './auth-guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

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
    return await this.appService.getUserById(id);
  }

  @UseGuards(AuthGuard)
  @Get('user/:email')
  async getUserByEmail(@Param() email: string ): Promise<any> {
    return await this.appService.getUserByEmail(email);
  }

  @HttpCode(HttpStatus.OK)
  @Post('user/sign_in')
  async signIn(@Body() userInfo: any): Promise<any> {
    const { email, pass } = userInfo;
    console.log("email - gateway controler", email)
    return await this.appService.signIn(email, pass);
  }

}
