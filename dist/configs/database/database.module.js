"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DatabaseModule", {
    enumerable: true,
    get: function() {
        return DatabaseModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _config = require("@nestjs/config");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let DatabaseModule = class DatabaseModule {
};
DatabaseModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
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
                        entities: configService.get('database').entities,
                        synchronize: true
                    }),
                inject: [
                    _config.ConfigService
                ]
            })
        ]
    })
], DatabaseModule);
