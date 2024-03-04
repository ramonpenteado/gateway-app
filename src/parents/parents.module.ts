import { APP_GUARD } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthGuard } from 'src/security/authentication/auth.guard';
import { Parent } from './entities/parents.entity';
import { ParentController } from './parents.controller';
import { ParentService } from './parents.service'

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '60s' },
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forFeature([Parent]),
  ],
  providers: [ParentService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    }
  ],
  controllers: [ParentController],
})
export class ParentModule {}
