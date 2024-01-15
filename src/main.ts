import { config } from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TelegramService } from './bot/telegram/telegram.service';
import { TaskService } from './scheduled/task/task.service';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Main');
  const app = await NestFactory.create(AppModule);
  const telegramService = app.get(TelegramService);
  const taskService = app.get(TaskService);

  await Promise.all([
    taskService.handleCron(),
    telegramService.startBot(),
    app.listen(3000)
  ]);
}
config();
bootstrap();
