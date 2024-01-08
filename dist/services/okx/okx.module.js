"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "OkxModule", {
    enumerable: true,
    get: function() {
        return OkxModule;
    }
});
const _common = require("@nestjs/common");
const _okxservice = require("./okx.service");
const _appservice = require("../../app.service");
const _httpservice = require("../http/http.service");
const _config = require("@nestjs/config");
const _okxconfig = /*#__PURE__*/ _interop_require_default(require("@configs/okx.config"));
const _messagesservice = require("../messages/messages.service");
const _encryptionservice = require("@utils/encryption.service");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let OkxModule = class OkxModule {
};
OkxModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _config.ConfigModule.forRoot({
                isGlobal: true,
                load: [
                    _okxconfig.default
                ]
            })
        ],
        providers: [
            _okxservice.OkxService,
            _appservice.AppService,
            _httpservice.HttpService,
            _messagesservice.MessagesService,
            _encryptionservice.EncryptionService
        ]
    })
], OkxModule);
