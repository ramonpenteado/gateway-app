import { Module } from '@nestjs/common';
import { ParentModule, Parent } from './parents';
import { StudentModule, Student } from './students';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CrewModule } from './crew/crew.module';
import { PresenceModule } from './prensence/presence.module';
import { Crew } from './crew/entities/crew.entity';
import { Presence } from './prensence/entities/presence.entity';
import { Schedule } from './schedule/entities/schedule.entity';

@Module({
  imports: [
    ParentModule,
    StudentModule,
    CrewModule,
    PresenceModule,
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
