import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  public async getUserByEmail(email: string): Promise<User[]> {
    try {
      console.log(email)
      const user = await this.userRepository.find({ where: { email }})
      return user
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async getUserById(id: string): Promise<User> {
    try {
      const user = await this.userRepository.findOneBy({ id: id })
      return user;
    } catch (error) {
      return null
    }
  }

  public async createUser(user: any): Promise<User> {
    try {
      const newUser = await this.userRepository.save(user);
      return newUser;
    } catch (error) {
      return null;
    }
  }

  async signIn(email: string, password: string): Promise<any> {
    const user = await this.getUserByEmail(email);
    const userSelected = user[0];
    if (userSelected?.password !== password) {
        throw new UnauthorizedException('Wrong credentials provided');
    }
    const payload = { email: userSelected.email, sub: userSelected.id, aud: userSelected.roles, roles: [userSelected.roles] };
    return {
        access_token: await this.jwtService.signAsync(payload),
    }
  }

}
