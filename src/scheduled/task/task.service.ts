import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';
import { OkxService } from '@services/okx/okx.service';
import { UnisatService } from '@services/unisat/unisat.service';
import { Telegraf } from 'telegraf';
import { TelegramService } from '@bot/telegram/telegram.service';
import { UserService } from '@db/models/user/user.service';
import { UserEntities } from '@db/entities/user.entity';

@Injectable()
export class TaskService {
  private readonly bot: Telegraf;
  private readonly logger = new Logger(TaskService.name);
  private height: number | 0 = 0;
  private userData: UserEntities[];

  constructor(
    private readonly telegramService: TelegramService,
    private readonly configService: ConfigService,
    private readonly okxService: OkxService,
    private readonly unisatService: UnisatService,
    private readonly userService: UserService
    ) {
    const mustBotFatherConfig = this.configService.get('botfather');

    const { token } = mustBotFatherConfig;
    this.bot = new Telegraf(token);
  }

  @Cron(CronExpression.EVERY_30_SECONDS)
  async handleCron() {
    this.logger.debug('Sending scheduled message...');

    this.userData = await this.userService.userData();

    this.height = await this.unisatService.getHeight() - 4;
    this.logger.debug(`current height: ${this.height}`)

    const userBlockQuery = await this.userService.currentHeight();
    if(userBlockQuery && userBlockQuery['currentBlock'] < this.height){
      await this.fetchTransactinAndPublish();
    }
  }

  private async fetchTransactinAndPublish(){
    this.logger.debug(`Fetch transaction data ticker with height ${this.height}`);
    const tickerData = await this.userService.tickerAndChain();
    this.logger.debug(`Checking on block ${this.height}`)
    if(tickerData !== null && this.userData.length >= 1){
      tickerData.map( async (item) => {
        const okx = await this.okxService.TokenActivity(item.ticker, this.height, item.tokenContract, item.chainId);
        this.logger.debug(okx)
        if(okx && okx != ""){
          await this.PublishTransaction(okx);
        }else{
          await this.updateUserCurrentBlock()
        }
      });
    }else{
      this.logger.debug('Update user block')
      await this.updateUserCurrentBlock()
    }
  }

  private async PublishTransaction(transaction: string){
    this.logger.debug("Publish transaction to all user");
    this.userData.map( async (item) => {
      if(item.currentBlock < this.height && transaction != ""){
        this.logger.debug('PUBLISH')
        await this.bot.telegram.sendMessage(item.userId, transaction, { parse_mode: 'HTML' });
        await this.updateUserCurrentBlock(item.userId)
      }
    })
  }

  private async updateUserCurrentBlock(userId: number | null = null){
    if(userId === null){
      this.userData.map( async (item) => {
        await this.userService.updateUser(item.userId, {currentBlock: this.height})
      })
    }else{
      await this.userService.updateUser(userId, {currentBlock: this.height}) 
    }
  }
}