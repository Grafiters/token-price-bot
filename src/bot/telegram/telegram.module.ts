import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { ConfigService } from '@nestjs/config';
import { UnisatService } from '@services/unisat/unisat.service';
import { HttpService } from '@services/http/http.service';
import { UserService } from '@db/models/user/user.service';
import { UserModule } from '@db/models/user/user.module';
import { OkxService } from '@services/okx/okx.service';
import { MessagesService } from '@services/messages/messages.service';
import { EncryptionService } from '@utils/encryption.service';
import { Brc20Service } from '@services/unisat/inscribes/brc20/brc20.service';
import { OrderService } from '@services/unisat/inscribes/order/order.service';

@Module({
  imports: [UserModule],
  providers: [TelegramService, ConfigService, UnisatService, HttpService, OkxService, MessagesService, EncryptionService, Brc20Service, OrderService],
  exports: [TelegramService],
})
export class TelegramModule {}
