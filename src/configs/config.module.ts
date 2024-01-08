import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import botfatherConfig from './botfather.config';
import okxConfig from './okx.config';
import databaseConfig from './database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [botfatherConfig, okxConfig, databaseConfig],
    }),
    DatabaseModule,
  ],
  exports: [ConfigModule],
})
export class ConfigAppModule {}
