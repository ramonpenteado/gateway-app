import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import configuration from '@shared/shared/configuration';
import { User } from '../entities/user.entity';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '360s' },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_USERS_HOST,
      port: parseInt(process.env.POSTGRES_USERS_PORT, 10),
      username: process.env.POSTGRES_USERS_USER,
      password: process.env.POSTGRES_USERS_PASSWORD,
      database: process.env.POSTGRES_USERS_DATABASE,
      entities: [User],
      migrations: ['dist/migrations/*.js'],
      migrationsRun: true,
      synchronize: false,
      logging: true,
    }),
  ],
  providers: [UsersService],
})
export class UsersModule {
  constructor(
    private dataSource: DataSource,
  ) {}
}
