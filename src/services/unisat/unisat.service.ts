import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '../http/http.service';
import { Header } from '../http/type/header.type';
import { Height } from '../http/type/unisat.type';

@Injectable()
export class UnisatService {
    private readonly logger = new Logger(UnisatService.name);
    private heigtResponse: Height;

    private defaultHeader: Header = {
        'OK_ACCESS_KEY': null,
        'OK_ACCESS_SIGN': null,
        'OK_ACCESS_TIMESTAMP': null,
        'OK_ACCESS_PASSPHRASE': null,
        'Authorization': `Bearer 539a15a6705b98a6a5295acceb15d336b218e897362591805bf632276fbaaa49`
    }

    constructor(private readonly httpService: HttpService) {}

    public async getHeight(){
        try {
            const request = await this.httpService.get('bestheight', 'unisat', this.defaultHeader);            
            
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

    public async getList(){
        try {
            const request = await this.httpService.get('list', 'unisat', this.defaultHeader);
            
            if(request.status === 200){
                return request.data.data;
            }else{
                return null;
            }
        } catch (error) {
            this.logger.error(`error when try to request unisat height block`, error)
            throw error;
        }
    }
}
