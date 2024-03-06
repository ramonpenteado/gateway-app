import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { PresenceService } from './presence.service';
import { AuthGuard } from '../security/authentication/auth.guard';
import { Presence } from './entities/presence.entity';
import { Roles } from 'src/modules/security/authorization/roles.enum';
import { AuthByRole } from 'src/modules/security/authorization/roles.decorator';


@Controller('presence')
export class PresenceController {
    constructor(private readonly presenceService: PresenceService) {}

    @Get()
    @UseGuards(AuthGuard)
    @AuthByRole(Roles.ADMIN)
    public async getPresence(): Promise<Presence[]> {
        try {
            const presence = await this.presenceService.getPresence();
            return presence;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    @AuthByRole(Roles.ADMIN)
    public async getPresenceById(@Param('id') id: string): Promise<Presence> {
        try {
            const presence = await this.presenceService.getPresenceById(id);
            return presence;
        } catch (error) {
            return null;
        }
    }

}