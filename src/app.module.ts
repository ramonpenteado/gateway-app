import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module, Type } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm';

import {
  CrewModule,
  ParentModule,
  PresenceModule,
  StudentModule,
  SecurityModule,
  CourtModule,
} from './modules';

import { ENTITIES } from './modules';

@Module({
  imports: [
    ParentModule,
    StudentModule,
    CourtModule,
    CrewModule,
    PresenceModule,
    SecurityModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_USERS_HOST,
      port: parseInt(process.env.POSTGRES_USERS_PORT),
      username: process.env.POSTGRES_USERS_USER,
      password: process.env.POSTGRES_USERS_PASSWORD,
      database: process.env.POSTGRES_USERS_DATABASE,
      entities: ENTITIES,
      migrations: [`${__dirname}/migrations/*{.ts,.js}`],
      migrationsRun: true,
      logging: true,
      synchronize: true,
    }),
  ]
})
export class AppModule {}
