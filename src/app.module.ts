import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TelegramModule } from './bot/telegram/telegram.module';
import { TaskService } from './scheduled/task/task.service';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import { HttpService } from './services/http/http.service';
import { EncryptionService } from './utils/encryption.service';
import { UnisatService } from './services/unisat/unisat.service';
import { UnisatModule } from './services/unisat/unisat.module';
import { OkxModule } from './services/okx/okx.module';
import { MessagesService } from './services/messages/messages.service';
import botfatherConfig from './configs/botfather.config';
import { OkxService } from '@services/okx/okx.service';
import { TelegramService } from './bot/telegram/telegram.service';

@Module({
  imports: [
    TelegramModule,
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [botfatherConfig],
    }),
    UnisatModule,
    OkxModule,
  ],
  controllers: [AppController],
  providers: [AppService, TaskService, HttpService, EncryptionService, UnisatService, MessagesService, OkxService, TelegramService],
})
export class AppModule {}