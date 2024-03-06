import { APP_GUARD } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthGuard } from 'src/modules/security/authentication/auth.guard';
import { StudentService } from './students.service'
import { Student } from './entities/students.entity';
import { StudentController } from './students.controller';

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
    TypeOrmModule.forFeature([Student]),
  ],
  providers: [
    StudentService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  controllers: [StudentController],
})
export class StudentModule {}
