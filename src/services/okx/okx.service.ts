import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@services/http/http.service';
import { Header } from '@services/http/type/header.type';
import { Token, TokenDetail } from './type/okx.type';
import { MessagesService } from '@services/messages/messages.service';

@Injectable()
export class OkxService {
    private readonly logger = new Logger(OkxService.name);
    private tickerOn: string;
    private defaultLimit: number;
    private tokenData: Token;
    private tokenDetail: TokenDetail;

    private defaultHeader: Header = {
        'Ok-Access-Key': '1897ad11-6ba4-43b8-b447-978616f07415',
        'OK_ACCESS_SIGN': null,
        'OK_ACCESS_TIMESTAMP': null,
        'OK_ACCESS_PASSPHRASE': null,
        'x-apiKey': null,
        'Authorization': null
    }

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
        private readonly messageService: MessagesService
    ) {
        const mustOkxTokenConfig = this.configService.get('tokenticker')
        const { token } = mustOkxTokenConfig;
        this.defaultLimit = 20;
        this.tickerOn = token;
    }

    public async TokenActivity(){
        const path = `explorer/btc/transaction-list?token=${this.tickerOn}&limit=1`;
        try {
            const response = await this.httpService.get(path, 'okx', this.defaultHeader);

            this.tokenData = response.data.data[0].inscriptionsList[0]
            const tokenPrice = await this.priceTokenData();

            const message = await this.messageService.OkxNotifyMessage(this.tokenData, await this.tokenDetailCall());

            return message;
        } catch (error) {
            console.log(`Error on fetching data activity ${error}`);
            throw(error);            
        }
    }

    public async tokenDetailCall<T>(): Promise<TokenDetail>{
        const path = `explorer/btc/token-details?token=${this.tickerOn}`;
        try {
            const response = await this.httpService.get(path, 'okx', this.defaultHeader);

            this.tokenDetail = response.data.data[0]
            console.log(this.tokenDetail);
            return this.tokenDetail;
        } catch (error) {
            console.log(`Error on fetching data activity ${error}`);
            throw(error);            
        }
    }

    public async priceTokenData(){
        const path = `explorer/tokenprice/market-data?chainId=0&tokenContractAddress=${this.tokenData.inscriptionId}`;
        try {
            const response = await this.httpService.get(path, 'okx', this.defaultHeader);

            this.logger.debug(response.data)
        } catch (error) {
            console.log(`Error on fetching data activity ${error}`);
            throw(error);            
        }
    }
}
