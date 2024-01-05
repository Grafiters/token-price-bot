import { Injectable, Logger } from '@nestjs/common';
import { Token, TokenDetail } from '@services/okx/type/okx.type';

@Injectable()
export class MessagesService {
    private readonly logger = new Logger(MessagesService.name);

    constructor(){}

    public async OkxNotifyMessage<T>(OkxData: Token, DetailToken: TokenDetail): Promise<string>{
        this.logger.log(`Start Build Notifify Message`);

        const fromAddress = `https://unisat.io/brc20?q=${OkxData.fromAddres}`;
        const toAddress = `https://unisat.io/brc20?q=${OkxData.toAddress}`;
        const hashUrl = `https://mempool.space/tx/${OkxData.txId}`;
        const tradeOn = `https://www.okx.com/web3/marketplace/ordinals/brc20/${OkxData.token}`;

        const message = `
New ${OkxData.token} ${DetailToken.logoUrl} Buy!

💵 ${OkxData.amount} ${OkxData.token}



👤 Buyer: <a href="${toAddress}">Buyer</a>
👤 Seller: <a href="${fromAddress}">Seller</a>

<a href="${hashUrl}">View TX</a> | <a href="https://ave.ai/brc/${OkxData.token}-brc20" >Chart</a>| <a href="${tradeOn}">Trade On OKX</a>
        `;

        this.logger.log(`Completed Build Notifify Message`);

        return message;
    }
}