import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";
import { Crew } from "./entities/crew.entity";

@Injectable()
export class CrewService {
    constructor(
        @InjectRepository(Crew)
        private crewRepository: Repository<Crew>,
    ) {}

    public async getCrew(): Promise<Crew[]> {
        try {
            const crew = await this.crewRepository.find();
            return crew;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    public async getCrewById(id: string): Promise<Crew> {
        try {
            const crew = await this.crewRepository.findOneBy({ id: id });
            return crew;
        } catch (error) {
            return null;
        }
    }

    public async createCrew(crew: any): Promise<Crew> {
        try {
            const newcrew = await this.crewRepository.save(crew);
            return newcrew;
        } catch (error) {
            return null;
        }
    }

    public async updateClass(id: string, crew: any): Promise<Crew> {
        try {
            const updatedcrew = await this.crewRepository.update(id, crew);
            return updatedcrew.raw;
        } catch (error) {
            return null;
        }
    }

    public async deleteClass(id: string): Promise<Crew> {
        try {
            const deletedcrew = await this.crewRepository.delete(id);
            return deletedcrew.raw;
        } catch (error) {
            return null;
        }
    }
}
