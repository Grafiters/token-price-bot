import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';
import { OkxService } from '@services/okx/okx.service';
import { UnisatService } from '@services/unisat/unisat.service';
import { Telegraf } from 'telegraf';
import { UserConfig } from './type/task.type';
import { TelegramService } from '@bot/telegram/telegram.service';

@Injectable()
export class TaskService {
  private readonly bot: Telegraf;
  private readonly logger = new Logger(TaskService.name);

  constructor(
    private readonly telegramService: TelegramService,
    private readonly configService: ConfigService,
    private readonly okxService: OkxService
    ) {
    const mustBotFatherConfig = this.configService.get('botfather');

    const { token } = mustBotFatherConfig;
    this.bot = new Telegraf(token);
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  async handleCron() {
    // this.logger.debug('Sending scheduled message...');
    // const okx = await this.okxService.TokenActivity();

    // await this.bot.telegram.sendMessage(6599245116, okx, { parse_mode: 'HTML' });
    const userCongig = this.telegramService.getUserConfig();
    this.logger.debug(JSON.stringify(userCongig));
  }
}