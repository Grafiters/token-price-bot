"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TelegramModule", {
    enumerable: true,
    get: function() {
        return TelegramModule;
    }
});
const _common = require("@nestjs/common");
const _telegramservice = require("./telegram.service");
const _config = require("@nestjs/config");
const _unisatservice = require("../../services/unisat/unisat.service");
const _httpservice = require("../../services/http/http.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let TelegramModule = class TelegramModule {
};
TelegramModule = _ts_decorate([
    (0, _common.Module)({
        providers: [
            _telegramservice.TelegramService,
            _config.ConfigService,
            _unisatservice.UnisatService,
            _httpservice.HttpService
        ],
        exports: [
            _telegramservice.TelegramService
        ]
    })
], TelegramModule);
