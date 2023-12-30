import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import botfatherConfig from './botfather.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [botfatherConfig],
    }),
  ],
  exports: [ConfigModule],
})
export class ConfigAppModule {}
