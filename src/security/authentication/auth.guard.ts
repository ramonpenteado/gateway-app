import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from 'src/security/authorization/public.decorator';
import { ROLES_KEY } from 'src/security/authorization/roles.decorator';
import { Roles } from 'src/security/authorization/roles.enum';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor (
        private jwtService: JwtService,
        private reflector: Reflector
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException('No token provided')
        }

        try {
            const payload = await this.validateToken(token);
            request['user'] = payload;
        } catch {
            throw new UnauthorizedException();
        }

        const requiredRoles = this.reflector.getAllAndOverride<Roles[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (requiredRoles) {
            const user = request['user'];
            if (!requiredRoles.some((role) => user.roles?.includes(role))) {
                throw new UnauthorizedException('Insufficient permissions');
            }
        }

        return true;
    }

    private async validateToken(token: string): Promise<any> {
        return this.jwtService.verifyAsync(token, { secret: process.env.JWT_SECRET });
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [ type, token ] = request.headers.authorization.split(' ') ?? []
        const lowerCaseType = type?.toLowerCase();
        return lowerCaseType === 'bearer' ? token : undefined;
    }

}
