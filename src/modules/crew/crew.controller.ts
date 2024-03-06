import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { CrewService } from './crew.service';
import { AuthGuard } from '../security/authentication/auth.guard';
import { Crew } from './entities/crew.entity';
import { Roles } from 'src/modules/security/authorization/roles.enum';
import { AuthByRole } from 'src/modules/security/authorization/roles.decorator';


@Controller('crew')
export class CrewController {
    constructor(private readonly crewService: CrewService) {}

    @Get()
    @UseGuards(AuthGuard)
    @AuthByRole(Roles.ADMIN)
    public async getcrew(): Promise<Crew[]> {
        try {
            const crew = await this.crewService.getCrew();
            return crew;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    @AuthByRole(Roles.ADMIN)
    public async getcrewById(@Param('id') id: string): Promise<Crew> {
        try {
            const crew = await this.crewService.getCrewById(id);
            return crew;
        } catch (error) {
            return null;
        }
    }

    @Post()
    @UseGuards(AuthGuard)
    @AuthByRole(Roles.ADMIN)
    public async createcrew(@Body() crew: any): Promise<Crew> {
        try {
            const newcrew = await this.crewService.createCrew(crew);
            return newcrew;
        } catch (error) {
            return null;
        }
    }
}