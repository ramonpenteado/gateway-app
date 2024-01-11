import { DataSource, DataSourceOptions } from "typeorm";

const UsersDataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: process.env.POSTGRES_USERS_HOST,
    port: parseInt(process.env.POSTGRES_USERS_PORT, 10),
    username: process.env.POSTGRES_USERS_USER,
    password: process.env.POSTGRES_USERS_PASSWORD,
    database: process.env.POSTGRES_USERS_DATABASE,
    migrations: ['./migrations/*'],
    migrationsRun: true,
    synchronize: true,
    logging: true,

}

export const UsersDataSource: DataSource = new DataSource(UsersDataSourceOptions)

UsersDataSource.initialize()
    .then(() => console.log('UsersDataSource initialized'))
    .catch((err) => console.log(err))