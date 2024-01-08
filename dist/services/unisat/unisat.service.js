"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UnisatService", {
    enumerable: true,
    get: function() {
        return UnisatService;
    }
});
const _common = require("@nestjs/common");
const _httpservice = require("../http/http.service");
const _headertype = require("./header.type");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let UnisatService = class UnisatService {
    async getHistoryTicker() {
        if (this.currentHeight == 0) {
            await this.getHeight();
        }
        try {
            // const request = await this.httpService.get(`csas/history?start=1&limit=5&type=transfer`, 'unisat', this.defaultHeader);
            const request = await this.httpService.get(`history-by-height/${this.currentHeight - 3}`, 'unisat', this.defaultHeader);
            if (request.status === 200) {
                this.heigtResponse = request.data.data;
                return this.heigtResponse;
            } else {
                return null;
            }
        } catch (error) {
            this.logger.error(`error when try to request unisat height block`, error);
            throw error;
        }
    }
    async getHeight() {
        try {
            const request = await this.httpService.get('bestheight', 'unisat', this.defaultHeader);
            if (request.status === 200) {
                this.heigtResponse = request.data.data;
                this.currentHeight = this.heigtResponse.height;
                return this.currentHeight;
            } else {
                return this.currentHeight;
            }
        } catch (error) {
            this.logger.error(`error when try to request unisat height block`, error);
            throw error;
        }
    }
    constructor(httpService){
        this.httpService = httpService;
        this.logger = new _common.Logger(UnisatService.name);
        this.defaultHeader = _headertype.defaultHeader;
        this.currentHeight = 0;
    }
};
UnisatService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _httpservice.HttpService === "undefined" ? Object : _httpservice.HttpService
    ])
], UnisatService);
