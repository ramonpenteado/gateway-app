import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post
} from "@nestjs/common";

import { Public } from "./authorization/public.decorator";
import { SecurityServices } from "./security.service";


@Controller('auth')
export class SecurityController {

    constructor(private readonly securityService: SecurityServices) {}

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('signin')
    async signIn(@Body() userInfo: {email: string, pass: string, level: string}): Promise<{access_token: string}> {
      const { email, pass, level } = userInfo;
      return await this.securityService.signIn(email, pass, level);
    }

}