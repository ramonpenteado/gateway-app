import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";
import { Court } from "./entities/court.entity";

@Injectable()
export class CourtService {
    constructor(
        @InjectRepository(Court)
        private courtRepository: Repository<Court>,
    ) {}

    public async getCourt(): Promise<Court[]> {
        try {
            const court = await this.courtRepository.find();
            return court;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    public async getCourtById(id: string): Promise<Court> {
        try {
            const court = await this.courtRepository.findOne({
                where: { id },
                relations: ['crew', 'crew.students'],
            })
            return court;
        } catch (error) {
            console.log(error)
            return null;
        }
    }

    public async getCourtAndStudentsByCourtId(id: string): Promise<Court> {
        try {
            const court = await this.courtRepository.findOne({
                where: { id },
                relations: ['crew', 'crew.students'],
            })

            const crewId = court.crew.id;

            return court;

        } catch (error) {
            console.log(error)
            return null;
        }
    }

    public async createCourt(court: any): Promise<Court> {
        try {
            const newCourt = await this.courtRepository.save(court);
            return newCourt;
        } catch (error) {
            return null;
        }
    }

    public async updateClass(id: string, Court: any): Promise<Court> {
        try {
            const updatedCourt = await this.courtRepository.update(id, Court);
            return updatedCourt.raw;
        } catch (error) {
            return null;
        }
    }

    public async deleteClass(id: string): Promise<Court> {
        try {
            const deletedCourt = await this.courtRepository.delete(id);
            return deletedCourt.raw;
        } catch (error) {
            return null;
        }
    }
}
