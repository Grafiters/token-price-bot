import { Module } from '@nestjs/common';
import { OkxService } from './okx.service';
import { AppService } from '../../app.service';
import { HttpService } from '@services/http/http.service';
import { ConfigModule } from '@nestjs/config';
import okxConfig from '@configs/okx.config';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [okxConfig],
    }),
  ],
  providers: [OkxService, AppService, HttpService],
})
export class OkxModule {}
