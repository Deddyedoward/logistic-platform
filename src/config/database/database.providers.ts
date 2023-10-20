import { Users } from "src/modules/users/users.entity";
import { DataSource } from "typeorm"

export const databaseProviders = [
    {
        provide: 'DATA_SOURCE',
        useFactory: async () => {
            const dataSource = new DataSource({
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'postgres',
                password: 'mypass',
                database: 'nest',
                entities: [
                    Users
                ],
                synchronize: true,
                logging: true
            })

            return dataSource.initialize();
        }
    }
]