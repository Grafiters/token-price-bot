import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@services/http/http.service';
import { Header } from '@services/http/type/header.type';
import { defaultHeader } from '@services/unisat/header.type';
import { InscribeData } from '../type/brc20.type';

@Injectable()
export class OrderService {
    private readonly logger = new Logger(OrderService.name);
    private defaultHeader: Header = defaultHeader;
    private inscribeData: InscribeData;
    
    constructor(private readonly httpService: HttpService){}

    public async SearchOrder(orderId: string): Promise<InscribeData | null>{
        try {
            const request = await this.httpService.get(`inscribe/order/${orderId}`, 'unisatbrc', this.defaultHeader);
            
            if(request.data.code === 0){
                this.inscribeData = request.data.data;
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