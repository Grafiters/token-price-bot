import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntities } from '@db/entities/user.entity';
import { UserEntitiesRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OkxService } from '@services/okx/okx.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppModule } from 'src/app.module';
import { OkxModule } from '@services/okx/okx.module';
import { HttpService } from '../../../services/http/http.service';
import { MessagesService } from '../../../services/messages/messages.service';
import { EncryptionService } from '../../../utils/encryption.service';

export const entities = [
  UserEntities
]
@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntities]),
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
    OkxModule
  ],
  providers: [HttpService, MessagesService, EncryptionService, OkxService, UserService],
  exports: [UserService]
})
export class UserModule {}
