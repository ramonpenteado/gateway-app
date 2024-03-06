import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { CourtService } from './court.service';
import { AuthGuard } from '../security/authentication/auth.guard';
import { Court } from './entities/court.entity';
import { Roles } from 'src/modules/security/authorization/roles.enum';
import { AuthByRole } from 'src/modules/security/authorization/roles.decorator';


@Controller('court')
export class CourtController {
    constructor(private readonly courtService: CourtService) {}

    @Get()
    @UseGuards(AuthGuard)
    @AuthByRole(Roles.ADMIN)
    public async getCourt(): Promise<Court[]> {
        try {
            const Court = await this.courtService.getCourt();
            return Court;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    @AuthByRole(Roles.ADMIN)
    public async getCourtById(@Param('id') id: string): Promise<Court> {
        try {
            const Court = await this.courtService.getCourtById(id);
            return Court;
        } catch (error) {
            return null;
        }
    }

    @Post()
    @UseGuards(AuthGuard)
    @AuthByRole(Roles.ADMIN)
    public async createCourt(@Body() Court: any): Promise<Court> {
        try {
            const newCourt = await this.courtService.createCourt(Court);
            return newCourt;
        } catch (error) {
            return null;
        }
    }
}