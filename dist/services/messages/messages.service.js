"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MessagesService", {
    enumerable: true,
    get: function() {
        return MessagesService;
    }
});
const _common = require("@nestjs/common");
const _encryptionservice = require("../../utils/encryption.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let MessagesService = class MessagesService {
    async OkxNotifyMessage(OkxData, summaryToken) {
        this.logger.log(`Start Build Notifify Message`);
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
    calculation(a, b) {
        return a * b;
    }
    constructor(encryptionService){
        this.encryptionService = encryptionService;
        this.logger = new _common.Logger(MessagesService.name);
    }
};
MessagesService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _encryptionservice.EncryptionService === "undefined" ? Object : _encryptionservice.EncryptionService
    ])
], MessagesService);
