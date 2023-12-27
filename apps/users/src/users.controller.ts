import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern({ cmd: 'get_user_by_id' })
  async getUserById(id: number): Promise<any> {
    return await this.usersService.getUserById(id);
  }

  @MessagePattern({ cmd: 'get_user_by_email' })
  async getUserByEmail(email: string): Promise<any> {
    return await this.usersService.getUserByEmail(email);
  }

  @MessagePattern({ cmd: 'sign_in' })
  async signIn(email: string, pass: string): Promise<any> {
    console.log("email - user controler", email)
    return await this.usersService.signIn(email, pass);
  }
}
