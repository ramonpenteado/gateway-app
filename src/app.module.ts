import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Crew, CrewModule } from './crew';
import { ParentModule, Parent } from './parents';
import { PresenceModule, Presence } from './prensence';
import { StudentModule, Student } from './students';
import { SecurityModule } from './security/security.module';
import { Schedule, ScheduleModule } from './schedule';


@Module({
  imports: [
    ParentModule,
    StudentModule,
    CrewModule,
    PresenceModule,
    SecurityModule,
    ScheduleModule,
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
      entities: [Parent, Presence, Crew, Schedule, Student],
      migrations: [`${__dirname}/migrations/*{.ts,.js}`],
      migrationsRun: true,
      logging: true,
      synchronize: true,
    }),
  ]
})
export class AppModule {}
