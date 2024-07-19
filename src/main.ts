import { config } from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TelegramService } from './bot/telegram/telegram.service';
import { TaskService } from './scheduled/task/task.service';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  try {
    startUp()
  } catch (error) {
    Logger.debug("Waiting 5 second to startup again")
    startUp()
  }
}

async function startUp(){
  const logger = new Logger('Main');
  const app = await NestFactory.create(AppModule);
  const telegramService = app.get(TelegramService);
  const taskService = app.get(TaskService);

  Logger.debug("Server Start")

  await Promise.all([
    taskService.handleCron(),
    telegramService.startBot(),
    app.listen(3000)
  ]);

  Logger.debug("Server stop")
  Logger.debug("Restarting the server")
}
config();
bootstrap();
