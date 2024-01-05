import { NestFactory } from '@nestjs/core';
import { TaskService } from './task/task.service';
import { TaskModule } from './task.module';

async function bootstrap() {
  const app = await NestFactory.create(TaskModule);
  const taskService = app.get(TaskService);

  await taskService.handleCron();

  await app.listen(3000);
}
bootstrap();
