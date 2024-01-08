"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    UserModule: function() {
        return UserModule;
    },
    entities: function() {
        return entities;
    }
});
const _common = require("@nestjs/common");
const _userservice = require("./user.service");
const _userentity = require("../../entities/user.entity");
const _typeorm = require("@nestjs/typeorm");
const _okxservice = require("../../../services/okx/okx.service");
const _config = require("@nestjs/config");
const _okxmodule = require("../../../services/okx/okx.module");
const _httpservice = require("../../../services/http/http.service");
const _messagesservice = require("../../../services/messages/messages.service");
const _encryptionservice = require("../../../utils/encryption.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
const entities = [
    _userentity.UserEntities
];
let UserModule = class UserModule {
};
UserModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forFeature([
                _userentity.UserEntities
            ]),
            _typeorm.TypeOrmModule.forRootAsync({
                imports: [
                    _config.ConfigModule
                ],
                useFactory: async (configService)=>({
                        type: 'postgres',
                        host: configService.get('database').host,
                        port: configService.get('database').port,
                        username: configService.get('database').username,
                        password: configService.get('database').password,
                        database: configService.get('database').database,
                        entities: entities,
                        synchronize: true
                    }),
                inject: [
                    _config.ConfigService
                ]
            }),
            _okxmodule.OkxModule
        ],
        providers: [
            _httpservice.HttpService,
            _messagesservice.MessagesService,
            _encryptionservice.EncryptionService,
            _okxservice.OkxService,
            _userservice.UserService
        ],
        exports: [
            _userservice.UserService
        ]
    })
], UserModule);
