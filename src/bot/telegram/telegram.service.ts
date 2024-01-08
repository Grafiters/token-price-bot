import { Injectable, Logger, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UnisatService } from '@services/unisat/unisat.service';
import { UserConfig } from 'src/scheduled/task/type/task.type';
import { Context, Telegraf } from 'telegraf';
import { Message } from './type/message.type';

@Injectable({ scope: Scope.DEFAULT })
export class TelegramService {
  userConfig: Map<number, UserConfig[]> = new Map();
  private readonly logger = new Logger(TelegramService.name);
  private readonly bot: Telegraf;
  private roomIdForCheck: boolean = false;
  private message: Message;

  constructor(
    private readonly configService: ConfigService,
    private readonly unisatService: UnisatService
  ) {
    const mustBotFatherConfig = this.configService.get('botfather');
    const { token } = mustBotFatherConfig;
    this.bot = new Telegraf(token);
    this.setupListener();
  }

  getUserConfig() {
    const userConfigs = Array.from(this.userConfig.values());
    this.logger.debug(JSON.stringify(userConfigs));
    return userConfigs
  }

  private setupListener() {
    this.logger.log('Received /start command.');

    this.bot.start((ctx) => this.handleStart(ctx));
    this.bot.help((ctx) => this.handleHelp(ctx));
    this.bot.command("showSetting", (ctx) => this.handleGetConfigCommand(ctx));
    this.bot.command("ticker", (ctx) => this.handleTickerUpdate(ctx));
  }

  private handleStart(ctx: Context) {
    this.logger.log('Received /start command.');
    this.logger.log(ctx.message.from.id);
    const roomId = ctx.message.from.id;

    let userConfigs = this.userConfig.get(5674) || [];
    const existingConfig = userConfigs.find(config => config.userId === roomId);

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

  private handleTickerUpdate(ctx: Context){
    this.logger.debug("Start handling ticker update");

    const roomId = ctx.message.from.id;
    const userConfigs = this.userConfig.get(5674) || [];

    const existingConfigIndex = userConfigs.findIndex(config => config.userId === roomId);

    this.logger.debug(userConfigs);
    this.message = ctx.message;
    if (existingConfigIndex !== -1) {
      const [, newTicker ] = this.message.text.split(' ');

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

  private handleGetConfigCommand(ctx: Context) {
    const allConfigs = this.getUserConfig();

    ctx.reply(`User-specific configuration property ${JSON.stringify(allConfigs)}`);
  }

  private handleHelp(ctx: Context) {
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
}
