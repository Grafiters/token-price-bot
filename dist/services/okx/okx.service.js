"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "OkxService", {
    enumerable: true,
    get: function() {
        return OkxService;
    }
});
const _common = require("@nestjs/common");
const _config = require("@nestjs/config");
const _httpservice = require("../http/http.service");
const _messagesservice = require("../messages/messages.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let OkxService = class OkxService {
    async TokenActivity() {
        const path = `explorer/btc/transaction-list?token=${this.tickerOn}&limit=1&actionType=transfer`;
        try {
            const response = await this.httpService.get(path, 'okx', this.defaultHeader);
            this.tokenData = response.data.data[0].inscriptionsList[0];
            console.log(this.tokenData);
            await this.tokenDetailCall();
            await this.priceTokenData();
            const message = await this.messageService.OkxNotifyMessage(this.tokenData, this.summaryToken);
            return message;
        } catch (error) {
            console.log(`Error on fetching data activity ${error}`);
            throw error;
        }
    }
    async tokenDetailCall() {
        const path = `explorer/btc/token-details?token=${this.tickerOn}`;
        try {
            const response = await this.httpService.get(path, 'okx', this.defaultHeader);
            this.tokenDetail = response.data.data[0];
            return this.tokenDetail;
        } catch (error) {
            console.log(`Error on fetching data activity ${error}`);
            throw error;
        }
    }
    async priceTokenData() {
        const path = `explorer/tokenprice/market-data?chainId=0&tokenContractAddress=${this.tokenDetail.inscriptionId}`;
        try {
            const response = await this.httpService.get(path, 'okx', this.defaultHeader);
            this.logger.debug(response.data.data[0]);
            this.summaryToken = response.data.data[0];
        } catch (error) {
            console.log(`Error on fetching data activity ${error}`);
            throw error;
        }
    }
    constructor(httpService, configService, messageService){
        this.httpService = httpService;
        this.configService = configService;
        this.messageService = messageService;
        this.logger = new _common.Logger(OkxService.name);
        this.defaultHeader = {
            'Ok-Access-Key': '1897ad11-6ba4-43b8-b447-978616f07415',
            'OK_ACCESS_SIGN': null,
            'OK_ACCESS_TIMESTAMP': null,
            'OK_ACCESS_PASSPHRASE': null,
            'x-apiKey': null,
            'Authorization': null
        };
        const mustOkxTokenConfig = this.configService.get('tokenticker');
        const { token } = mustOkxTokenConfig;
        this.defaultLimit = 20;
        this.tickerOn = token;
    }
};
OkxService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _httpservice.HttpService === "undefined" ? Object : _httpservice.HttpService,
        typeof _config.ConfigService === "undefined" ? Object : _config.ConfigService,
        typeof _messagesservice.MessagesService === "undefined" ? Object : _messagesservice.MessagesService
    ])
], OkxService);
