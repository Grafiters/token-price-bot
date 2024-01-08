"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TaskService", {
    enumerable: true,
    get: function() {
        return TaskService;
    }
});
const _common = require("@nestjs/common");
const _config = require("@nestjs/config");
const _schedule = require("@nestjs/schedule");
const _okxservice = require("../../services/okx/okx.service");
const _telegraf = require("telegraf");
const _telegramservice = require("@bot/telegram/telegram.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let TaskService = class TaskService {
    async handleCron() {
        // this.logger.debug('Sending scheduled message...');
        // const okx = await this.okxService.TokenActivity();
        // await this.bot.telegram.sendMessage(6599245116, okx, { parse_mode: 'HTML' });
        const userCongig = this.telegramService.getUserConfig();
        this.logger.debug(JSON.stringify(userCongig));
    }
    constructor(telegramService, configService, okxService){
        this.telegramService = telegramService;
        this.configService = configService;
        this.okxService = okxService;
        this.logger = new _common.Logger(TaskService.name);
        const mustBotFatherConfig = this.configService.get('botfather');
        const { token } = mustBotFatherConfig;
        this.bot = new _telegraf.Telegraf(token);
    }
};
_ts_decorate([
    (0, _schedule.Cron)(_schedule.CronExpression.EVERY_10_SECONDS),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", Promise)
], TaskService.prototype, "handleCron", null);
TaskService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _telegramservice.TelegramService === "undefined" ? Object : _telegramservice.TelegramService,
        typeof _config.ConfigService === "undefined" ? Object : _config.ConfigService,
        typeof _okxservice.OkxService === "undefined" ? Object : _okxservice.OkxService
    ])
], TaskService);
