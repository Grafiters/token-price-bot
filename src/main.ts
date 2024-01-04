import { config } from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TelegramService } from './bot/telegram/telegram.service';
import { TaskService } from './scheduled/task/task.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const telegramService = app.get(TelegramService);
  const taskService = app.get(TaskService);

  // await telegramService.startBot();
  // await taskService.handleCron();

  await app.listen(3000);
}
config();
bootstrap();
