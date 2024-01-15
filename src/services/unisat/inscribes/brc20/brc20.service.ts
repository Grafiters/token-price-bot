import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@services/http/http.service';
import { Header } from '@services/http/type/header.type';
import { defaultHeader } from '@services/unisat/header.type';
import { BrcDeploy, BrcMint, BrcTransfer, InscribeData } from '../type/brc20.type';
import { MessagesService } from '@services/messages/messages.service';

@Injectable()
export class Brc20Service {
    private readonly logger = new Logger(Brc20Service.name);
    private defaultHeader: Header = defaultHeader;
    private inscribeData: InscribeData;

    constructor(
        private readonly httpService: HttpService,
        private readonly messgeService: MessagesService
    ){}

    public async brcMint<T>(body: BrcMint): Promise<InscribeData | null | string>{
        try {
            const request = await this.httpService.post(`inscribe/order/create/brc20-mint`, 'unisatbrc', this.defaultHeader, body);
            if(request.data.code === 0){
                this.inscribeData = request.data.data;

                const message = await this.messgeService.inscribeMessage(this.inscribeData)
                return this.inscribeData;
            }else{
                return `Can't minting cause problem ${request.data.msg}`;
            }
        } catch (error) {
            this.logger.error(`error when try to request unisat height block`, error)
            return error;
        }
    }

    public async brcDeploy<T>(body: BrcDeploy): Promise<InscribeData | null>{
        const ticker = await this.tickerInfo(body.brc20Ticker);
        if(ticker){
            throw `Sorry ticker ${body.brc20Ticker} has been deployed`;
        }
        try {
            const request = await this.httpService.post(`inscribe/order/create/brc20-deploy`, 'unisatbrc', this.defaultHeader, body);

            if(request.status === 200){
                this.inscribeData = request.data.data;

                return this.inscribeData;
            }else{
                return null;
            }
        } catch (error) {
            this.logger.error(`error when try to request unisat height block`, error)
            return error;
        }
    }

    public async brcTransfer<T>(body: BrcTransfer): Promise<InscribeData | null>{
        // await this.tickerInfo(body.brc20Ticker);
        try {
            const request = await this.httpService.post(`inscribe/order/create/brc20-transfer`, 'unisatbrc', this.defaultHeader, body);
            
            if(request.status === 200){
                this.inscribeData = request.data.data;

                return this.inscribeData;
            }else{
                return null;
            }
        } catch (error) {
            this.logger.error(`error when try to request unisat height block`, error)
            throw error;
        }
    }

    public async tickerInfo<T>(ticker: string): Promise<{} | null>{
        try {
            const request = await this.httpService.get(`brc20/${ticker}/info`, 'unisat', this.defaultHeader);
            if(request.status === 200){
                console.log(request.data);
                
                return request.data.data;                
            }else{
                throw `Sorry ticker ${ticker} is not deployed`;
            }
        } catch (error) {
            this.logger.error(`error when try to request unisat height block`, error)
            throw error;
        }
    }
}