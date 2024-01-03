import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';
import { UnisatService } from '@services/unisat/unisat.service';
import { Telegraf } from 'telegraf';

@Injectable()
export class TaskService {
  private readonly bot: Telegraf;
  private readonly logger = new Logger(TaskService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly unisatService: UnisatService
    ) {
    const mustBotFatherConfig = this.configService.get('botfather');

    const { token } = mustBotFatherConfig;
    this.bot = new Telegraf(token);
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  async handleCron() {
    this.logger.debug('Sending scheduled message...');
    const unisat = await this.unisatService.getList();

    await this.bot.telegram.sendMessage(6599245116, JSON.stringify(unisat));
  }
}