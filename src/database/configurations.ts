import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Crew } from 'src/crew/entities/crew.entity';
import { Parent } from 'src/parents';
import { Presence } from 'src/prensence/entities/presence.entity';
import { Schedule } from 'src/schedule/entities/schedule.entity';
import { Student } from 'src/students';

export const databaseConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: configService.get('POSTGRES_USERS_HOST'),
    port: configService.get('POSTGRES_USERS_PORT'),
    username: configService.get('POSTGRES_USERS_USER'),
    password: configService.get('POSTGRES_USERS_PASSWORD'),
    database: configService.get('POSTGRES_USERS_DATABASE'),
    entities: [Parent, Presence, Crew, Schedule, Student],
    migrations: [`${__dirname}/migrations/*{.ts,.js}`],
    migrationsRun: true,
    logging: true,
})