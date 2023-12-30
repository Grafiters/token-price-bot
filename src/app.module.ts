import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TelegramModule } from './bot/telegram/telegram.module';
import { TaskService } from './scheduled/task/task.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [TelegramModule, ScheduleModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, TaskService],
})
export class AppModule {}
