import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { ConfigService } from '@nestjs/config';
import { UnisatService } from '@services/unisat/unisat.service';
import { HttpService } from '@services/http/http.service';

@Module({
  providers: [TelegramService, ConfigService, UnisatService, HttpService],
  exports: [TelegramService],
})
export class TelegramModule {}
