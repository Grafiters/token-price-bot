import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '../http/http.service';
import { Header } from '../http/type/header.type';
import { Height } from '../http/type/unisat.type';

@Injectable()
export class UnisatService {
    private readonly logger = new Logger(UnisatService.name);
    private heigtResponse: Height;
    private currentHeight: number;

    private defaultHeader: Header = {
        'OK_ACCESS_KEY': null,
        'OK_ACCESS_SIGN': null,
        'OK_ACCESS_TIMESTAMP': null,
        'OK_ACCESS_PASSPHRASE': null,
        'Authorization': `Bearer 539a15a6705b98a6a5295acceb15d336b218e897362591805bf632276fbaaa49`
    }

    constructor(
        private readonly httpService: HttpService,
    ) {
        this.currentHeight = 0;
    }

    public async getHistoryTicker(){
        if(this.currentHeight == 0){
            await this.getHeight();
        }
        try {
            // const request = await this.httpService.get(`csas/history?start=1&limit=5&type=transfer`, 'unisat', this.defaultHeader);
            const request = await this.httpService.get(`history-by-height/${this.currentHeight - 3}`, 'unisat', this.defaultHeader);
            
            if(request.status === 200){
                this.heigtResponse = request.data.data;
                return this.heigtResponse;
            }else{
                return null;
            }
        } catch (error) {
            this.logger.error(`error when try to request unisat height block`, error)
            throw error;
        }
    }

    public async getHeight(){
        try {
            const request = await this.httpService.get('bestheight', 'unisat', this.defaultHeader);            
            
            if(request.status === 200){
                this.heigtResponse = request.data.data;
                this.currentHeight = this.heigtResponse.height;
                return this.currentHeight;
            }else{
                return this.currentHeight;
            }
        } catch (error) {
            this.logger.error(`error when try to request unisat height block`, error)
            throw error;
        }
    }
}
