import { Module } from '@nestjs/common';
import { StudentService } from './students.service'
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/students.entity';
import { StudentController } from './students.controller';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/security/authentication/auth.guard';

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
  providers: [StudentService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    }
  ],
  controllers: [StudentController],
})
export class StudentModule {}
