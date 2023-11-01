import { ConfigService } from "@nestjs/config";
import { Users } from "../../modules/users/users.entity";
import { DataSource } from "typeorm"

export const databaseProviders = [
    {
        provide: 'DATA_SOURCE',
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => {
            const dataSource = new DataSource({
                type: 'postgres',
                host: configService.get<string>('db_host'),
                port: configService.get<number>('db_port'),
                username: configService.get<string>('db_username'),
                password: configService.get<string>('db_password'),
                database: configService.get<string>('db_database'),
                entities: [
                    Users
                ],
                synchronize: true,
                logging: false
            })

            return dataSource.initialize();
        }
    }
]