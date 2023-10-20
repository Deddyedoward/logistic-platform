import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import databaseConfig from "./database.config";

@Module({
    imports: [
      ConfigModule.forRoot({
        load: [databaseConfig],
      }),
    ],
    exports: [ConfigModule]
  })
export class ConfigurationModule {}