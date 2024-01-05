import { Module } from '@nestjs/common';
import { UnisatService } from './unisat.service';
import { AppService } from '../../app.service';
import { HttpService } from '@services/http/http.service';
import { InscribesModule } from './inscribes/inscribes.module';

@Module({
    providers: [AppService, UnisatService, HttpService, InscribesModule],
    imports: [InscribesModule]
})
export class UnisatModule {}
