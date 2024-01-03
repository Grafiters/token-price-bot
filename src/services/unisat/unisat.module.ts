import { Module } from '@nestjs/common';
import { UnisatService } from './unisat.service';
import { AppService } from '../../app.service';
import { HttpService } from '@services/http/http.service';

@Module({
    providers: [AppService, UnisatService, HttpService]
})
export class UnisatModule {}
