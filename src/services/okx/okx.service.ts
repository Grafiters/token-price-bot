import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@services/http/http.service';
import { Header } from '@services/http/type/header.type';
import { Token, TokenDetail, SummaryToken, ChainToken, NetworkToken } from './type/okx.type';
import { MessagesService } from '@services/messages/messages.service';

type ChainTokenResponse = {
    page: number,
    limit: number,
    totalPage: number,
    tokenList: ChainToken[]
}
@Injectable()
export class OkxService {
    private readonly logger = new Logger(OkxService.name);
    private tickerOn: string;
    private defaultLimit: number;
    private tokenData: Token;
    private tokenDetail: TokenDetail;
    private chainToken: NetworkToken;
    private summaryToken: SummaryToken;
    private chainTokenResponse: ChainTokenResponse;

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

    public async TokenActivity(ticker: string, height: number, contractAddress: string, chainId: number): Promise<string>{
        const path = `explorer/btc/transaction-list?token=${ticker}&limit=100&actionType=transfer&blockHeight=${height}`;
        try {
            const response = await this.httpService.get(path, 'okx', this.defaultHeader);
            if(response.data.code !== 0){
                this.tokenData = response.data.data[0].inscriptionsList.filter(item => parseInt(item.index) >= 0)[0]
                this.logger.debug(this.tokenData)
                if(this.tokenData && this.tokenData.index >= 0){
                    await this.priceTokenData(contractAddress, chainId)
                    const message = await this.messageService.OkxNotifyMessage(this.tokenData, this.summaryToken);
    
                    return message;
                }else{
                    return "";
                }
            }else{
                return "";
            }
        } catch (error) {
            console.log(`Error on fetching data activity ${error}`);
            return error;            
        }
    }

    public async GetDetailToken<T>(ticker: string): Promise<TokenDetail | null | string>{
        try {
            const path = `explorer/btc/token-details?token=${ticker}`;
            const response = await this.httpService.get(path, 'okx', this.defaultHeader);
            
            this.tokenDetail = response.data.data[0]
            return this.tokenDetail
        } catch (error) {
            console.log(`Error on fetching data activity ${error}`);
            return error
        }
    }

    public async tokenDetailCall<T>(ticker: string, network: string): Promise<NetworkToken | string>{
        try {
            const data = await this.chainTokenList(ticker, 'json');

            if(typeof data !== 'string'){
                let networkDeployed = false;
                this.logger.debug(JSON.stringify(data))
                data.map((item) => {
                    item.network.map((net) => {
                        if(net.chainShortName == network){
                            networkDeployed = true
                            this.chainToken = net;
                        }
                    });
                });

                if(!networkDeployed){
                    return null;
                }
            }

            return this.chainToken;
        } catch (error) {
            console.log(`Error on fetching data activity ${error}`);
            return error
        }
    }

    public async priceTokenData<T>(incriptionId: string, chainId: number): Promise<SummaryToken>{
        const path = `explorer/tokenprice/market-data?chainId=${chainId}&tokenContractAddress=${incriptionId}`;
        try {
            const response = await this.httpService.get(path, 'okx', this.defaultHeader);
            this.summaryToken = response.data.data[0]
            return this.summaryToken;
        } catch (error) {
            console.log(`Error on fetching data activity ${error}`);
            throw(error);            
        }
    }

    public async chainTokenList(ticker: string, response: string = 'string'): Promise<string | ChainToken[]>{
        const path = `explorer/tokenprice/token-list?token=${ticker}`;
        try {
            this.logger.debug(path)
            const responseData = await this.httpService.get(path, 'okx', this.defaultHeader);
            if(parseInt(responseData.data.code) === 0){
                this.chainTokenResponse = responseData.data.data;

                if(response == 'string'){
                    const message = await this.messageService.chainTokenMessage(this.chainTokenResponse[0].tokenList, ticker);
                    this.logger.debug(message)
                    return message;
                }else{
                    return this.chainTokenResponse[0].tokenList;
                }
            }else{
                return "Token doesnt have any chain";
            }
        } catch (error) {
            console.log(`Error on fetching data activity ${error}`);
            return "Please wait a minute";            
        }
    }

    public async blockChecker(ticker: string){
        const path = `explorer/tokenprice/token-list?token=${ticker}`;
        try {
            const response = await this.httpService.get(path, 'okx', this.defaultHeader);
            if(response.data.code === 0){
                this.chainTokenResponse = response.data.data;
                const message = await this.messageService.chainTokenMessage(this.chainTokenResponse.tokenList, ticker);
                return message;
            }else{
                throw new Error('Token doesnt have any chain')
            }
        } catch (error) {
            console.log(`Error on fetching data activity ${error}`);
            throw(error);            
        }
    }
}