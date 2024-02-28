import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";
import { Presence } from "./entities/presence.entity";

@Injectable()
export class PresenceService {
    constructor(
        @InjectRepository(Presence)
        private presenceRepository: Repository<Presence>,
    ) {}

    public async getPresence(): Promise<Presence[]> {
        try {
            const presence = await this.presenceRepository.find();
            return presence;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    public async getPresenceById(id: string): Promise<Presence> {
        try {
            const presence = await this.presenceRepository.findOneBy({ id: id });
            return presence;
        } catch (error) {
            return null;
        }
    }

    public async getPresenceByUserId(userId: string): Promise<Presence[]> {
        try {
            const presence = await this.presenceRepository.find({ where: { users: { id: userId }}});
            return presence;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    public async createPresence(presence: any): Promise<Presence> {
        try {
            const newPresence = await this.presenceRepository.save(presence);
            return newPresence;
        } catch (error) {
            return null;
        }
    }

    public async updatePresence(id: string, presence: any): Promise<Presence> {
        try {
            const updatedPresence = await this.presenceRepository.update(id, presence);
            return updatedPresence.raw;
        } catch (error) {
            return null;
        }
    }

    public async deletePresence(id: string): Promise<Presence> {
        try {
            const deletedPresence = await this.presenceRepository.delete(id);
            return deletedPresence.raw;
        } catch (error) {
            return null;
        }
    }
}