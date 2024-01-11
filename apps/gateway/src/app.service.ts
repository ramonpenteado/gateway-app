import { Injectable } from '@nestjs/common';
import { UsersService } from '@users/services/users.service';


@Injectable()
export class AppService {

  constructor(
    private readonly usersService: UsersService
  ) {}

  async getUserById(id: number): Promise<any> {
    return await this.usersService.getUserById(id);
  }

  async getUserByEmail(email: string): Promise<any> {
    return await this.usersService.getUserByEmail(email);
  }

  async signIn(email: string, pass: string): Promise<any> {
    console.log("email - gateway service", email)
    return await this.usersService.signIn(email, pass);
  }
}
