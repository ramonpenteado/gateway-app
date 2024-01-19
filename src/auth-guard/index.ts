import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor (
        private jwtService: JwtService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException('No token provided')
        }
        try {
            const payload = await this.jwtService.verifyAsync(
                token,
                { secret: process.env.JWT_SECRET },
            );
            request.user = payload;
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [ type, token ] = request.headers.authorization.split(' ') ?? []
        const lowerCaseType = type?.toLowerCase();
        return lowerCaseType === 'bearer' ? token : undefined;
    }

}