import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '../http/http.service';
import { Header } from '../http/type/header.type';
import { Height } from '../http/type/unisat.type';
import { defaultHeader } from './header.type';
import { TransactionResponse } from './inscribes/type/transaction.type';

@Injectable()
export class UnisatService {
    private readonly logger = new Logger(UnisatService.name);
    private heigtResponse: Height;
    private currentHeight: number;
    private responseTransaction: TransactionResponse;

    private defaultHeader: Header = defaultHeader;

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

    public async transactionList(ticker: string): Promise<TransactionResponse | null>{
        if(this.currentHeight == 0){
            await this.getHeight();
        }
        try {
            const request = await this.httpService.get(`${ticker}/history?start=1&limit=2000&type=transfer&height=${this.currentHeight - 3}`, 'unisat', this.defaultHeader);
            
            if(request.status === 200){
                this.responseTransaction = request.data.data;
                return this.responseTransaction;
            }else{
                return null;
            }
        } catch (error) {
            this.logger.error(`error when try to request unisat height block`, error)
            throw error;
        }
    }

    public async getHeight(): Promise<Height | 0>{
        try {
            const request = await this.httpService.get('bestheight', 'unisat', this.defaultHeader);            
            
            if(request.status === 200){
                this.heigtResponse = request.data.data;
                this.currentHeight = this.heigtResponse.height;
                return this.heigtResponse;
            }else{
                return 0;
            }
        } catch (error) {
            this.logger.error(`error when try to request unisat height block`, error)
            throw error;
        }
    }
}
