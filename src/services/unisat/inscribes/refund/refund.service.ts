import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@services/http/http.service';
import { Header } from '@services/http/type/header.type';
import { defaultHeader } from '@services/unisat/header.type';
import { RefundEstimate } from '../type/refund.type';

type Refund = {
    txid: string
}

@Injectable()
export class RefundService {
    private readonly logger = new Logger(RefundService.name);
    private defaultHeader: Header = defaultHeader;
    private estimate: RefundEstimate;
    private refundTx: Refund;

    constructor(private readonly httpService: HttpService){}

    public async refundEstimate<T>(): Promise<RefundEstimate>{
        try {
            const request = await this.httpService.get(`inscribe/order/create/brc20-mint`, 'unisatbrc', this.defaultHeader);
            
            if(request.status === 200){
                this.estimate = request.data.data;
                return this.estimate;
            }else{
                return null;
            }
        } catch (error) {
            this.logger.error(`error when try to request unisat height block`, error)
            throw error;
        }
    }

    public async refund<T>(): Promise<Refund>{
        try {
            const request = await this.httpService.get(`inscribe/order/create/brc20-mint`, 'unisatbrc', this.defaultHeader);
            
            if(request.status === 200){
                this.refundTx = request.data.data;
                return this.refundTx;
            }else{
                return null;
            }
        } catch (error) {
            this.logger.error(`error when try to request unisat height block`, error)
            throw error;
        }
    }
}
