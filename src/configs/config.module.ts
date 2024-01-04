import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import botfatherConfig from './botfather.config';
import okxConfig from './okx.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [botfatherConfig, okxConfig],
    }),
  ],
  exports: [ConfigModule],
})
export class ConfigAppModule {}
