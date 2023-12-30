import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Telegraf } from 'telegraf';

@Injectable()
export class TaskService {
  private readonly bot: Telegraf;

  private readonly logger = new Logger(TaskService.name);

  constructor(private readonly configService: ConfigService) {
    const mustBotFatherConfig = this.configService.get('botfather');
    console.log(mustBotFatherConfig);

    const { token } = mustBotFatherConfig;
    this.bot = new Telegraf(token);
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  async handleCron() {
    this.logger.debug('Sending scheduled message...');
    const message = 'Hello! This is a scheduled message from your NestJS bot.';
    await this.bot.telegram.sendMessage(363540971, message);
  }
}
