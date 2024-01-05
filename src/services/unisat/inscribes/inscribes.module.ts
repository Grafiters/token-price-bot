import { Module } from '@nestjs/common';
import { Brc20Service } from './brc20/brc20.service';
import { HttpService } from '@services/http/http.service';
import { OrderService } from './order/order.service';
import { RefundService } from './refund/refund.service';

@Module({
  providers: [Brc20Service, HttpService, OrderService, RefundService]
})
export class InscribesModule {}
