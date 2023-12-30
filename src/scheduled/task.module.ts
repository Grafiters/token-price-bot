import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppService } from 'src/app.service';
import { TaskService } from './task/task.service';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [AppService, TaskService],
})
export class TaskModule {}
