import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User, entities } from 'src/users';

export const databaseConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: configService.get('POSTGRES_USERS_HOST'),
    port: configService.get('POSTGRES_USERS_PORT'),
    username: configService.get('POSTGRES_USERS_USER'),
    password: configService.get('POSTGRES_USERS_PASSWORD'),
    database: configService.get('POSTGRES_USERS_DATABASE'),
    // entities,
    entities: [User],
    migrations: [`${__dirname}/migrations/*{.ts,.js}`],
    migrationsRun: true,
    logging: true,
})