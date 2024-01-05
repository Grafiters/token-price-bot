import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@services/http/http.service';
import { Header } from '@services/http/type/header.type';
import { defaultHeader } from '@services/unisat/header.type';

@Injectable()
export class OrderService {
    private readonly logger = new Logger(OrderService.name);
    private defaultHeader: Header = defaultHeader;
    
    constructor(private readonly httpService: HttpService){}

    public async SearchOrder(orderId: string){
        try {
            const request = await this.httpService.get(`inscribe/order/${orderId}`, 'unisatbrc', this.defaultHeader);
            
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