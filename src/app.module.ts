import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TelegramModule } from './bot/telegram/telegram.module';
import { TaskService } from './scheduled/task/task.service';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import botfatherConfig from './configs/botfather.config';

@Module({
  imports: [
    TelegramModule,
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [botfatherConfig],
    }),
  ],
  controllers: [AppController],
  providers: [AppService, TaskService],
})
export class AppModule {}
