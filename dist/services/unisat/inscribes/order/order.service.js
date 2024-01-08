"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "OrderService", {
    enumerable: true,
    get: function() {
        return OrderService;
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
let OrderService = class OrderService {
    async SearchOrder(orderId) {
        try {
            const request = await this.httpService.get(`inscribe/order/${orderId}`, 'unisatbrc', this.defaultHeader);
            if (request.status === 200) {
                return request.data.data;
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
        this.logger = new _common.Logger(OrderService.name);
        this.defaultHeader = _headertype.defaultHeader;
    }
};
OrderService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _httpservice.HttpService === "undefined" ? Object : _httpservice.HttpService
    ])
], OrderService);
