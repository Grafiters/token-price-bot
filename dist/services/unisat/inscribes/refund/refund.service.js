"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RefundService", {
    enumerable: true,
    get: function() {
        return RefundService;
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
let RefundService = class RefundService {
    async refundEstimate() {
        try {
            const request = await this.httpService.get(`inscribe/order/create/brc20-mint`, 'unisatbrc', this.defaultHeader);
            if (request.status === 200) {
                this.estimate = request.data.data;
                return this.estimate;
            } else {
                return null;
            }
        } catch (error) {
            this.logger.error(`error when try to request unisat height block`, error);
            throw error;
        }
    }
    async refund() {
        try {
            const request = await this.httpService.get(`inscribe/order/create/brc20-mint`, 'unisatbrc', this.defaultHeader);
            if (request.status === 200) {
                this.refundTx = request.data.data;
                return this.refundTx;
            } else {
                return null;
            }
        } catch (error) {
            this.logger.error(`error when try to request unisat height block`, error);
            throw error;
        }
    }
    constructor(httpService){
        this.httpService = httpService;
        this.logger = new _common.Logger(RefundService.name);
        this.defaultHeader = _headertype.defaultHeader;
    }
};
RefundService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _httpservice.HttpService === "undefined" ? Object : _httpservice.HttpService
    ])
], RefundService);
