import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";
import { Parent } from "./entities/parents.entity";

@Injectable()
export class ParentService {
  constructor(
    @InjectRepository(Parent)
    private parentRepository: Repository<Parent>,
    private readonly jwtService: JwtService,
  ) {}

  public async getParentByEmail(email: string): Promise<Parent[]> {
    try {
      console.log(email)
      const parent = await this.parentRepository.find({
        where: { email },
      })
      return parent
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async getParentById(id: string): Promise<Parent> {
    try {
      const parent = await this.parentRepository.findOneBy({ id: id })
      return parent;
    } catch (error) {
      return null
    }
  }

  public async createParent(Parent: any): Promise<Parent> {
    try {
      const newParent = await this.parentRepository.save(Parent);
      return newParent;
    } catch (error) {
      return null;
    }
  }

  async signIn(email: string, password: string): Promise<any> {
    const parent = await this.getParentByEmail(email);
    const parentSelected = parent[0];
    if (parentSelected?.password !== password) {
        throw new UnauthorizedException('Wrong credentials provided');
    }
    const payload = { email: parentSelected.email, sub: parentSelected.id, aud: parentSelected.roles, roles: [parentSelected.roles] };
    return {
        access_token: await this.jwtService.signAsync(payload),
    }
  }

}
