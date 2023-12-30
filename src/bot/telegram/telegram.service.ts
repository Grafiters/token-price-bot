import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Context, Telegraf } from 'telegraf';

@Injectable()
export class TelegramService {
  private readonly logger = new Logger(TelegramService.name);
  private readonly bot: Telegraf;

  constructor(private readonly configService: ConfigService) {
    this.logger.warn(JSON.stringify(configService));
    const mustBotFatherConfig = this.configService.get('botfather');
    const { token } = mustBotFatherConfig;
    this.bot = new Telegraf(token);
    this.setupListener();
  }

  private setupListener() {
    this.logger.log('Received /start command.');

    this.bot.start((ctx) => this.handleStart(ctx));
    this.bot.help((ctx) => this.handleHelp(ctx));
  }

  private handleStart(ctx: Context) {
    this.logger.log('Received /start command.');
    ctx.reply('Hello! This is your bot.');
  }

  private handleHelp(ctx: Context) {
    this.logger.log('Received /help command.');
    this.logger.debug(JSON.stringify(ctx.message.from.id));
    const helpMessage = `
      /start - Start the bot
      /help - Display this help message
    `;
    ctx.reply(helpMessage);
  }

  async startBot() {
    this.logger.log('Received /start command instead.');
    this.bot.launch();
  }
}
