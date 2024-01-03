import { Module } from '@nestjs/common';
import { OkxService } from './okx.service';
import { AppService } from 'src/app.service';
import { HttpService } from '@services/http/http.service';

@Module({
  providers: [OkxService, AppService, HttpService]
})
export class OkxModule {}
