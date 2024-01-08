"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TaskModule", {
    enumerable: true,
    get: function() {
        return TaskModule;
    }
});
const _common = require("@nestjs/common");
const _schedule = require("@nestjs/schedule");
const _appservice = require("src/app.service");
const _taskservice = require("./task/task.service");
const _config = require("@nestjs/config");
const _botfatherconfig = /*#__PURE__*/ _interop_require_default(require("src/configs/botfather.config"));
const _unisatservice = require("src/services/unisat/unisat.service");
const _unisatmodule = require("src/services/unisat/unisat.module");
const _telegramservice = require("src/bot/telegram/telegram.service");
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
let TaskModule = class TaskModule {
};
TaskModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _schedule.ScheduleModule.forRoot(),
            _config.ConfigModule.forRoot({
                isGlobal: true,
                load: [
                    _botfatherconfig.default
                ]
            }),
            _unisatmodule.UnisatModule
        ],
        providers: [
            _appservice.AppService,
            _taskservice.TaskService,
            _unisatservice.UnisatService,
            _config.ConfigService,
            _telegramservice.TelegramService
        ],
        exports: [
            TaskModule
        ]
    })
], TaskModule);
