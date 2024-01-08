import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { ConfigService } from '@nestjs/config';
import { UnisatService } from '@services/unisat/unisat.service';
import { HttpService } from '@services/http/http.service';
import { UserService } from '@db/models/user/user.service';
import { UserModule } from '@db/models/user/user.module';

@Module({
  imports: [UserModule],
  providers: [TelegramService, ConfigService, UnisatService, HttpService],
  exports: [TelegramService],
})
export class TelegramModule {}
