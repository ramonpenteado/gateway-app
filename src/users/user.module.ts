import { Module } from '@nestjs/common';
import { UsersService } from './user.service'
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { databaseConfig } from '../database';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '360s' },
    }),
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => databaseConfig(configService),
      inject: [ConfigService],
    }),
  ],
  providers: [UsersService],
})
export class UsersModule {}
