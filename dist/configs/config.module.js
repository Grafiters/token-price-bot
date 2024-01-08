"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ConfigAppModule", {
    enumerable: true,
    get: function() {
        return ConfigAppModule;
    }
});
const _common = require("@nestjs/common");
const _config = require("@nestjs/config");
const _databasemodule = require("./database/database.module");
const _botfatherconfig = /*#__PURE__*/ _interop_require_default(require("./botfather.config"));
const _okxconfig = /*#__PURE__*/ _interop_require_default(require("./okx.config"));
const _databaseconfig = /*#__PURE__*/ _interop_require_default(require("./database.config"));
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
let ConfigAppModule = class ConfigAppModule {
};
ConfigAppModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _config.ConfigModule.forRoot({
                isGlobal: true,
                load: [
                    _botfatherconfig.default,
                    _okxconfig.default,
                    _databaseconfig.default
                ]
            }),
            _databasemodule.DatabaseModule
        ],
        exports: [
            _config.ConfigModule
        ]
    })
], ConfigAppModule);
