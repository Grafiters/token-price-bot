import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppService } from 'src/app.service';
import { TaskService } from './task/task.service';
import { ConfigModule } from '@nestjs/config';
import botfatherConfig from 'src/configs/botfather.config';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [botfatherConfig],
    }),
  ],
  providers: [AppService, TaskService],
})
export class TaskModule {}
