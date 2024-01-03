import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UnisatService } from '@services/unisat/unisat.service';
import { Context, Telegraf } from 'telegraf';

@Injectable()
export class TelegramService {
  private readonly logger = new Logger(TelegramService.name);
  private readonly bot: Telegraf;

  constructor(
    private readonly configService: ConfigService,
    private readonly unisatService: UnisatService
  ) {
    const mustBotFatherConfig = this.configService.get('botfather');
    const { token } = mustBotFatherConfig;
    this.bot = new Telegraf(token);
    this.setupListener();
  }

  private setupListener() {
    this.logger.log('Received /start command.');

    this.bot.start((ctx) => this.handleStart(ctx));
    this.bot.help((ctx) => this.handleHelp(ctx));
    this.bot.command('height' ,(ctx) => this.handleHeight(ctx));
  }

  private handleStart(ctx: Context) {
    this.logger.log('Received /start command.');
    this.logger.log(ctx.message.from.id)
    ctx.reply('Hello! This is your bot.');
  }

  private async handleHeight(ctx: Context){
    this.logger.log('Received /height command.');
    const height = await this.unisatService.getHeight();
    ctx.reply(`Unisat now is on height ${height.height}`);
  }

  private handleHelp(ctx: Context) {
    this.logger.log('Received /help command.');
    this.logger.debug(JSON.stringify(ctx.message.from.id));
    const helpMessage = `
      /start - Start the bot
      /height - Display current height
      /help - Display this help message
    `;
    ctx.reply(helpMessage);
  }

  async startBot() {
    this.logger.log('Received /start command instead.');
    this.bot.launch();
  }
}
