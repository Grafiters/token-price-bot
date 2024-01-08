import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppService } from 'src/app.service';
import { TaskService } from './task/task.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import botfatherConfig from 'src/configs/botfather.config';
import { UnisatService } from 'src/services/unisat/unisat.service';
import { UnisatModule } from 'src/services/unisat/unisat.module';
import { TelegramService } from 'src/bot/telegram/telegram.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [botfatherConfig],
    }),
    UnisatModule
  ],
  providers: [AppService, TaskService, UnisatService, ConfigService, TelegramService],
  exports: [TaskModule]
})
export class TaskModule {}
