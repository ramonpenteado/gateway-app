import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";
import { Classes } from "./entities/classes.entity";

@Injectable()
export class ClassesService {
    constructor(
        @InjectRepository(Classes)
        private classesRepository: Repository<Classes>,
    ) {}

    public async getClasses(): Promise<Classes[]> {
        try {
            const classes = await this.classesRepository.find();
            return classes;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    public async getClassById(id: string): Promise<Classes> {
        try {
            const classes = await this.classesRepository.findOneBy({ id: id });
            return classes;
        } catch (error) {
            return null;
        }
    }

    public async createClass(classes: any): Promise<Classes> {
        try {
            const newClasses = await this.classesRepository.save(classes);
            return newClasses;
        } catch (error) {
            return null;
        }
    }

    public async updateClass(id: string, classes: any): Promise<Classes> {
        try {
            const updatedClasses = await this.classesRepository.update(id, classes);
            return updatedClasses.raw;
        } catch (error) {
            return null;
        }
    }

    public async deleteClass(id: string): Promise<Classes> {
        try {
            const deletedClasses = await this.classesRepository.delete(id);
            return deletedClasses.raw;
        } catch (error) {
            return null;
        }
    }
}
