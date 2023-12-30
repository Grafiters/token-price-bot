import { Injectable, Logger } from '@nestjs/common';
import { Context, Telegraf } from 'telegraf';

@Injectable()
export class TelegramService {
  private readonly logger = new Logger(TelegramService.name);
  private readonly bot: Telegraf;

  constructor() {
    this.bot = new Telegraf('6708230213:AAFDlRmKkIlQY19zZfBXzqLqy_hobwyWkJY');
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
