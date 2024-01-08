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
    setupListener() {
        this.logger.log('Received /start command.');
        this.bot.start((ctx)=>this.handleStart(ctx));
        this.bot.help((ctx)=>this.handleHelp(ctx));
        this.bot.command("showSetting", (ctx)=>this.handleGetConfigCommand(ctx));
        this.bot.command("ticker", (ctx)=>this.handleTickerUpdate(ctx));
    }
    handleStart(ctx) {
        this.logger.log('Received /start command.');
        this.logger.log(ctx.message.from.id);
        const roomId = ctx.message.from.id;
        let userConfigs = this.userConfig.get(5674) || [];
        const existingConfig = userConfigs.find((config)=>config.userId === roomId);
        if (!existingConfig) {
            const newConfig = {
                userId: roomId,
                ticker: "",
                currentBlock: 0
            };
            userConfigs.push(newConfig);
            this.userConfig.set(5674, userConfigs);
        }
        ctx.reply('Hello! This is your bot.');
    }
    handleTickerUpdate(ctx) {
        this.logger.debug("Start handling ticker update");
        const roomId = ctx.message.from.id;
        const userConfigs = this.userConfig.get(5674) || [];
        const existingConfigIndex = userConfigs.findIndex((config)=>config.userId === roomId);
        this.logger.debug(userConfigs);
        this.message = ctx.message;
        if (existingConfigIndex !== -1) {
            const [, newTicker] = this.message.text.split(' ');
            if (newTicker !== undefined) {
                userConfigs[existingConfigIndex].ticker = newTicker;
                ctx.reply(`Ticker updated to: ${newTicker}`);
            } else {
                ctx.reply('Invalid command format. Please use /setTicker <newTicker>');
            }
        } else {
            ctx.reply('User configuration not found. Please use /start to initialize.');
        }
    }
    handleGetConfigCommand(ctx) {
        const allConfigs = this.getUserConfig();
        ctx.reply(`User-specific configuration property ${JSON.stringify(allConfigs)}`);
    }
    handleHelp(ctx) {
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
        this.bot.launch();
    }
    constructor(configService, unisatService){
        this.configService = configService;
        this.unisatService = unisatService;
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
        typeof _unisatservice.UnisatService === "undefined" ? Object : _unisatservice.UnisatService
    ])
], TelegramService);
