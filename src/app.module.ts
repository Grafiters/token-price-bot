import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TelegramModule } from './bot/telegram/telegram.module';
import { TaskService } from './scheduled/task/task.service';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpService } from './services/http/http.service';
import { EncryptionService } from './utils/encryption.service';
import { UnisatService } from './services/unisat/unisat.service';
import { UnisatModule } from './services/unisat/unisat.module';
import { OkxModule } from './services/okx/okx.module';
import { MessagesService } from './services/messages/messages.service';
import botfatherConfig from './configs/botfather.config';
import { TelegramService } from './bot/telegram/telegram.service';
import { UserService } from './db/models/user/user.service';
import { UserModule } from './db/models/user/user.module';
import databaseConfig from './configs/database.config';
import { DatabaseModule } from './configs/database/database.module';
import { OkxService } from './services/okx/okx.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntitiesRepository } from '@db/models/user/user.repository';
import { UserEntities } from '@db/entities/user.entity';
import { Brc20Service } from '@services/unisat/inscribes/brc20/brc20.service';
import { OrderService } from '@services/unisat/inscribes/order/order.service';

export const entities = [
  UserEntities
]

@Module({
  imports: [
    TelegramModule,
    ScheduleModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
          type: 'postgres',
          host: configService.get('database').host,
          port: configService.get('database').port,
          username: configService.get('database').username,
          password: configService.get('database').password,
          database: configService.get('database').database,
          entities: entities,
          synchronize: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([UserEntities]),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [botfatherConfig, databaseConfig],
    }),
    UnisatModule,
    OkxModule,
    DatabaseModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    TaskService,
    HttpService,
    EncryptionService,
    UnisatService,
    MessagesService,
    OkxService,
    TelegramService,
    UserService,
    Brc20Service,
    OrderService
  ],
})
export class AppModule {}