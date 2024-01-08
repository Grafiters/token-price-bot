import { Injectable, Logger, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UnisatService } from '@services/unisat/unisat.service';
import { UserConfig } from 'src/scheduled/task/type/task.type';
import { Context, Telegraf } from 'telegraf';
import { Message } from './type/message.type';
import { UserService } from '@db/models/user/user.service';

@Injectable({ scope: Scope.DEFAULT })
export class TelegramService {
  userConfig: Map<number, UserConfig[]> = new Map();
  private readonly logger = new Logger(TelegramService.name);
  private readonly bot: Telegraf;
  private roomIdForCheck: boolean = false;
  private message: Message;

  constructor(
    private readonly configService: ConfigService,
    private readonly unisatService: UnisatService,
    private readonly userService: UserService
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

  private async setupListener() {
    this.logger.log('Received /start command.');

    this.bot.start(async (ctx) => await this.handleStart(ctx));
    this.bot.help(async (ctx) => await this.handleHelp(ctx));
    this.bot.command("showSetting", async (ctx) => await this.handleGetConfigCommand(ctx));
    this.bot.command("ticker", async (ctx) => await this.handleTickerUpdate(ctx));
  }

  private async handleStart(ctx: Context) {
    this.logger.log('Received /start command.');
    this.logger.log(ctx.message.from.id);
    const roomId = ctx.message.from.id;

    let userConfigs = this.userConfig.get(5674) || [];
    const existingConfig = userConfigs.find(config => config.userId === roomId);

    if (!existingConfig) {
      this.userService.createUser(roomId, "", "", 0);
    }

    ctx.reply('Hello! This is your bot.');
  }

  private async handleTickerUpdate(ctx: Context){
    this.logger.debug("Start handling ticker update");

    const roomId = ctx.message.from.id;

    this.message = ctx.message;
    const [, newTicker ] = this.message.text.split(' ');
    const updateTicker = await this.userService.updateTickerUser(roomId, newTicker);
    if(updateTicker.hasOwnProperty('data')){
      ctx.reply(updateTicker['message']);
    }
    ctx.reply(`Ticker ${newTicker} has been updated`);
  }

  private async handleGetConfigCommand(ctx: Context) {
    const allConfigs = this.getUserConfig();

    ctx.reply(`User-specific configuration property ${JSON.stringify(allConfigs)}`);
  }

  private async handleHelp(ctx: Context) {
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
}
