"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Brc20Service", {
    enumerable: true,
    get: function() {
        return Brc20Service;
    }
});
const _common = require("@nestjs/common");
const _httpservice = require("../../../http/http.service");
const _headertype = require("../../header.type");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let Brc20Service = class Brc20Service {
    async brcMint(body) {
        await this.tickerInfo(body.brc20Ticker);
        try {
            const request = await this.httpService.post(`inscribe/order/create/brc20-mint`, 'unisatbrc', this.defaultHeader, body);
            if (request.status === 200) {
                this.inscribeData = request.data.data;
                return this.inscribeData;
            } else {
                return null;
            }
        } catch (error) {
            this.logger.error(`error when try to request unisat height block`, error);
            throw error;
        }
    }
    async brcDeploy(body) {
        const ticker = await this.tickerInfo(body.brc20Ticker);
        if (ticker) {
            throw `Sorry ticker ${body.brc20Ticker} has been deployed`;
        }
        try {
            const request = await this.httpService.post(`inscribe/order/create/brc20-deploy`, 'unisatbrc', this.defaultHeader, body);
            if (request.status === 200) {
                this.inscribeData = request.data.data;
                return this.inscribeData;
            } else {
                return null;
            }
        } catch (error) {
            this.logger.error(`error when try to request unisat height block`, error);
            throw error;
        }
    }
    async brcTransfer(body) {
        await this.tickerInfo(body.brc20Ticker);
        try {
            const request = await this.httpService.post(`inscribe/order/create/brc20-transfer`, 'unisatbrc', this.defaultHeader, body);
            if (request.status === 200) {
                this.inscribeData = request.data.data;
                return this.inscribeData;
            } else {
                return null;
            }
        } catch (error) {
            this.logger.error(`error when try to request unisat height block`, error);
            throw error;
        }
    }
    async tickerInfo(ticker) {
        try {
            const request = await this.httpService.get(`brc20/${ticker}/info`, 'unisat', this.defaultHeader);
            if (request.status === 200) {
                console.log(request.data);
                return request.data.data;
            } else {
                throw `Sorry ticker ${ticker} is not deployed`;
            }
        } catch (error) {
            this.logger.error(`error when try to request unisat height block`, error);
            throw error;
        }
    }
    constructor(httpService){
        this.httpService = httpService;
        this.logger = new _common.Logger(Brc20Service.name);
        this.defaultHeader = _headertype.defaultHeader;
    }
};
Brc20Service = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _httpservice.HttpService === "undefined" ? Object : _httpservice.HttpService
    ])
], Brc20Service);
