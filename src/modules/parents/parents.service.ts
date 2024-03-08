import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";

import { Parent } from "./entities/parents.entity";

@Injectable()
export class ParentService {
  constructor(
    @InjectRepository(Parent)
    private parentRepository: Repository<Parent>,
  ) {}

  public async getParentByEmail(email: string): Promise<Parent[]> {
    try {
      const parent = await this.parentRepository.find({
        where: { email },
        relations: ['students']
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

}
