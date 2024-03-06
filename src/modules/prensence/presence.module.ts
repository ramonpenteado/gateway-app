import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/modules/security/authentication/auth.guard';

import { PresenceService } from './presence.service';
import { Presence } from './entities/presence.entity';
import { PresenceController } from './presence.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
    imports: [
        TypeOrmModule.forFeature([Presence]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
              secret: configService.get('JWT_SECRET'),
              signOptions: { expiresIn: '60s' },
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [
        PresenceService,
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
    ],
    controllers: [PresenceController],
})
export class PresenceModule {}