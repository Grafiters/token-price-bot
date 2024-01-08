"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "InscribesModule", {
    enumerable: true,
    get: function() {
        return InscribesModule;
    }
});
const _common = require("@nestjs/common");
const _brc20service = require("./brc20/brc20.service");
const _httpservice = require("../../http/http.service");
const _orderservice = require("./order/order.service");
const _refundservice = require("./refund/refund.service");
const _messagesservice = require("../../messages/messages.service");
const _encryptionservice = require("@utils/encryption.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let InscribesModule = class InscribesModule {
};
InscribesModule = _ts_decorate([
    (0, _common.Module)({
        providers: [
            _brc20service.Brc20Service,
            _httpservice.HttpService,
            _orderservice.OrderService,
            _refundservice.RefundService,
            _messagesservice.MessagesService,
            _encryptionservice.EncryptionService
        ]
    })
], InscribesModule);
