"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AppModule", {
    enumerable: true,
    get: function() {
        return AppModule;
    }
});
const _common = require("@nestjs/common");
const _appcontroller = require("./app.controller");
const _appservice = require("./app.service");
const _telegrammodule = require("./bot/telegram/telegram.module");
const _taskservice = require("./scheduled/task/task.service");
const _schedule = require("@nestjs/schedule");
const _config = require("@nestjs/config");
const _httpservice = require("./services/http/http.service");
const _encryptionservice = require("./utils/encryption.service");
const _unisatservice = require("./services/unisat/unisat.service");
const _unisatmodule = require("./services/unisat/unisat.module");
const _okxmodule = require("./services/okx/okx.module");
const _messagesservice = require("./services/messages/messages.service");
const _botfatherconfig = /*#__PURE__*/ _interop_require_default(require("./configs/botfather.config"));
const _okxservice = require("./services/okx/okx.service");
const _telegramservice = require("./bot/telegram/telegram.service");
const _databasemodule = require("./configs/database/database.module");
const _userservice = require("./db/models/user/user.service");
const _usermodule = require("./db/models/user/user.module");
const _databaseconfig = /*#__PURE__*/ _interop_require_default(require("./configs/database.config"));
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
let AppModule = class AppModule {
};
AppModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _telegrammodule.TelegramModule,
            _schedule.ScheduleModule.forRoot(),
            _config.ConfigModule.forRoot({
                isGlobal: true,
                load: [
                    _botfatherconfig.default,
                    _databaseconfig.default
                ]
            }),
            _unisatmodule.UnisatModule,
            _okxmodule.OkxModule,
            _databasemodule.DatabaseModule,
            _usermodule.UserModule
        ],
        controllers: [
            _appcontroller.AppController
        ],
        providers: [
            _appservice.AppService,
            _taskservice.TaskService,
            _httpservice.HttpService,
            _encryptionservice.EncryptionService,
            _unisatservice.UnisatService,
            _messagesservice.MessagesService,
            _okxservice.OkxService,
            _telegramservice.TelegramService,
            _userservice.UserService
        ]
    })
], AppModule);
