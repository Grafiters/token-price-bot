import { Injectable, Logger } from '@nestjs/common';
import { ChainToken, SummaryToken, Token, TokenDetail } from '@services/okx/type/okx.type';
import { EncryptionService } from '../../utils/encryption.service';
import { InscribeData } from '@services/unisat/inscribes/type/brc20.type';

@Injectable()
export class MessagesService {
    private readonly logger = new Logger(MessagesService.name);

    constructor(
        private readonly encryptionService: EncryptionService
    ){}

    public async OkxNotifyMessage<T>(OkxData: Token, summaryToken: SummaryToken): Promise<string>{
        this.logger.log(`Start Build Notifify Message`);
        this.logger.debug(OkxData.fromAddress)
        const fromAddress = `https://unisat.io/brc20?q=${OkxData.fromAddress}`;
        const toAddress = `https://unisat.io/brc20?q=${OkxData.toAddress}`;
        const hashUrl = `https://mempool.space/tx/${OkxData.txId}`;
        const tradeOn = `https://www.okx.com/web3/marketplace/ordinals/brc20/${OkxData.token}`;

        const message = `
New ${OkxData.token} Buy!

💵 ${OkxData.amount} ${OkxData.token} | $${this.calculation(OkxData.amount, summaryToken.lastPrice)}
📈 Price: ${OkxData.amount} ${OkxData.token} | $${summaryToken.lastPrice}
📊 24h Volume: ${summaryToken.volume24h} BTC | $${this.calculation(summaryToken.volume24h, summaryToken.lastPrice)}
💰 Marketcap: $${summaryToken.marketCap}

👤 Buyer: <a href="${toAddress}">${await this.encryptionService.parseAddress(OkxData.toAddress)}</a>
👤 Seller: <a href="${fromAddress}">${await this.encryptionService.parseAddress(OkxData.fromAddress)}</a>

<a href="${hashUrl}">View TX</a> | <a href="https://ave.ai/brc/${OkxData.token}-brc20" >Chart</a>| <a href="${tradeOn}">Trade On OKX</a>
        `;

        this.logger.log(`Completed Build Notifify Message`);

        return message;
    }

    public async chainTokenMessage(chainTokenResponse: ChainToken[], ticker: string): Promise<string | null>{
        const mustNetworkList = [];
        this.logger.debug(chainTokenResponse)
        chainTokenResponse.map((item) => {
            if(item.token == ticker){
                item.network.map((net) => {
                    mustNetworkList.push(net.chainShortName)
                });
            }
        });

        if(mustNetworkList.length > 1){
            return mustNetworkList.join(", ");
        }else if(mustNetworkList.length == 1){
            return mustNetworkList[0];
        }else{
            return ""
        }
    }

    public async inscribeMessage(data: InscribeData): Promise<string>{
const message = `
Congrats your mint brc20 token is success!

file: ${data.files[0].filename},
orderId: ${data.orderId},
status: ${data.files[0].status}


`;
        return message;
    }

    private calculation(a,b){
        return a * b;
    }
}