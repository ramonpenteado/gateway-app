import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UsersService {
  constructor(
    private readonly jwtService: JwtService,
  ) {}

  public async getUserByEmail(email: string) {
    return {
      id: 1,
      name: 'John Doe',
      password: '123456',
      email,
    }
  }

  public async getUserById(id: number) {
    return {
      id,
      name: 'John Doe',
      email: 'ramon.penteado@gmail.com',
    }
  }

  async signIn(email: string, pass: string): Promise<any> {
    console.log("email - user service", email)
    const user = await this.getUserByEmail(email);
    console.log("user - user service", user)
    if (user?.password !== pass) {
        throw new UnauthorizedException('Wrong credentials provided');
    }
    const payload = { email: user.email, sub: user.id };
    return {
        access_token: await this.jwtService.signAsync(payload),
    }
  }

}
