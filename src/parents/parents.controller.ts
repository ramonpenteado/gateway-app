import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards } from '@nestjs/common';

import { AuthGuard } from '../security/authentication/auth.guard';
import { AuthByRole } from 'src/security/authorization/roles.decorator';
import { Public } from 'src/security/authorization/public.decorator';
import { Roles } from 'src/security/authorization/roles.enum';

import { Parent } from './entities/parents.entity';
import { ParentService } from './parents.service';

@Controller()
export class ParentController {
  constructor(private readonly parentService: ParentService) {}

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('parent/signup')
  async createParent(@Body() Parent: any): Promise<Parent> {
    return await this.parentService.createParent(Parent);
  }

  @HttpCode(HttpStatus.OK)
  @AuthByRole(Roles.ADMIN)
  @UseGuards(AuthGuard)
  @Get('parent/:email')
  async getParentByEmail(@Param('email') email: string ): Promise<Parent[]> {
    return await this.parentService.getParentByEmail(email.toString());
  }

}
