"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TelegramService", {
    enumerable: true,
    get: function() {
        return TelegramService;
    }
});
const _common = require("@nestjs/common");
const _config = require("@nestjs/config");
const _unisatservice = require("../../services/unisat/unisat.service");
const _telegraf = require("telegraf");
const _userservice = require("../../db/models/user/user.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let TelegramService = class TelegramService {
    getUserConfig() {
        const userConfigs = Array.from(this.userConfig.values());
        this.logger.debug(JSON.stringify(userConfigs));
        return userConfigs;
    }
    async setupListener() {
        this.logger.log('Received /start command.');
        this.bot.start(async (ctx)=>await this.handleStart(ctx));
        this.bot.help(async (ctx)=>await this.handleHelp(ctx));
        this.bot.command("showSetting", async (ctx)=>await this.handleGetConfigCommand(ctx));
        this.bot.command("ticker", async (ctx)=>await this.handleTickerUpdate(ctx));
    }
    async handleStart(ctx) {
        this.logger.log('Received /start command.');
        this.logger.log(ctx.message.from.id);
        const roomId = ctx.message.from.id;
        let userConfigs = this.userConfig.get(5674) || [];
        const existingConfig = userConfigs.find((config)=>config.userId === roomId);
        if (!existingConfig) {
            this.userService.createUser(roomId, "", "", 0);
        }
        ctx.reply('Hello! This is your bot.');
    }
    async handleTickerUpdate(ctx) {
        this.logger.debug("Start handling ticker update");
        const roomId = ctx.message.from.id;
        this.message = ctx.message;
        const [, newTicker] = this.message.text.split(' ');
        const updateTicker = await this.userService.updateTickerUser(roomId, newTicker);
        if (updateTicker.hasOwnProperty('data')) {
            ctx.reply(updateTicker['message']);
        }
        ctx.reply(`Ticker ${newTicker} has been updated`);
    }
    async handleGetConfigCommand(ctx) {
        const allConfigs = this.getUserConfig();
        ctx.reply(`User-specific configuration property ${JSON.stringify(allConfigs)}`);
    }
    async handleHelp(ctx) {
        this.logger.log('Received /help command.');
        this.logger.debug(JSON.stringify(ctx.message.from.id));
        const helpMessage = `
      /start - Start the bot
      /showSetting - Start the bot
      /ticker <ticker> - update ticker data notifikasi
      /help - Display this help message
    `;
        ctx.reply(helpMessage);
    }
    async startBot() {
        this.logger.log('Received /start command instead.');
        await this.bot.launch();
    }
    constructor(configService, unisatService, userService){
        this.configService = configService;
        this.unisatService = unisatService;
        this.userService = userService;
        this.userConfig = new Map();
        this.logger = new _common.Logger(TelegramService.name);
        this.roomIdForCheck = false;
        const mustBotFatherConfig = this.configService.get('botfather');
        const { token } = mustBotFatherConfig;
        this.bot = new _telegraf.Telegraf(token);
        this.setupListener();
    }
};
TelegramService = _ts_decorate([
    (0, _common.Injectable)({
        scope: _common.Scope.DEFAULT
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _config.ConfigService === "undefined" ? Object : _config.ConfigService,
        typeof _unisatservice.UnisatService === "undefined" ? Object : _unisatservice.UnisatService,
        typeof _userservice.UserService === "undefined" ? Object : _userservice.UserService
    ])
], TelegramService);
