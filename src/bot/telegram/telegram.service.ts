import { Injectable, Logger, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UnisatService } from '@services/unisat/unisat.service';
import { UserConfig } from 'src/scheduled/task/type/task.type';
import { Context, Telegraf } from 'telegraf';
import { Message } from './type/message.type';
import { UserService } from '@db/models/user/user.service';
import { OkxService } from '@services/okx/okx.service';
import { BrcDeploy, BrcMint, BrcTransfer } from '@services/unisat/inscribes/type/brc20.type';
import { defaultDeployValue, defaultMintValue, defaultTransferValue } from './type/brc20.type';
import { Brc20Service } from '@services/unisat/inscribes/brc20/brc20.service';
import { OrderService } from '@services/unisat/inscribes/order/order.service';

@Injectable({ scope: Scope.DEFAULT })
export class TelegramService {
  userConfig: Map<number, UserConfig[]> = new Map();
  private readonly logger = new Logger(TelegramService.name);
  private readonly bot: Telegraf;
  private roomIdForCheck: boolean = false;
  private message: Message;
  private userData: Record<number, any> = {};

  private brcMint: BrcMint = defaultMintValue;
  private brcDeploy: BrcDeploy = defaultDeployValue;
  private brctransfer: BrcTransfer = defaultTransferValue;

  constructor(
    private readonly configService: ConfigService,
    private readonly unisatService: UnisatService,
    private readonly okxService: OkxService,
    private readonly brc20Service: Brc20Service,
    private readonly orderService: OrderService,
    private readonly userService: UserService
  ) {
    const mustBotFatherConfig = this.configService.get('botfather');
    const { token } = mustBotFatherConfig;
    this.bot = new Telegraf(token);
    this.setupListener();
  }

  private async setupListener() {
    this.logger.log('Received /start command.');

    this.bot.start(async (ctx) => await this.handleStart(ctx));
    this.bot.help(async (ctx) => await this.handleHelp(ctx));
    this.bot.command("chainticker", async (ctx) => await this.handleChainTicker(ctx));
    this.bot.command("ticker", async (ctx) => await this.handleTickerUpdate(ctx));
    this.bot.command('mint', this.handleMint.bind(this));
    this.bot.command('deploy', this.handleDeploy.bind(this));
    this.bot.command('searchorder', this.searchOrder.bind(this));

    this.bot.telegram.setMyCommands([
      { command: 'start', description: 'Start the bot' },
      { command: 'help', description: 'Display help information' },
      { command: 'chainticker', description: 'Display help information (Usage: /chainticker <ticker>)' },
      { command: 'ticker', description: 'Handle ticker update command (Usage: /ticker <ticker> <chain>)' },
      { command: 'mint', description: 'Handle mint command' },
      { command: 'deploy', description: 'Handle deploy command' },
      { command: 'searchorder', description: 'Handle search order command (Usage: /searchorder <orderId>)' },
    ]);

  }


  private async handleStart(ctx: Context) {
    this.logger.log('Received /start command.');
    this.logger.log(ctx.message.from.id);
    const roomId = ctx.message.from.id;

    let userConfigs = this.userConfig.get(5674) || [];
    const existingConfig = userConfigs.find(config => config.userId === roomId);

    if (!existingConfig) {
      this.userService.createUser(roomId, "", "", 0, "");
    }

    ctx.reply('Hello! This is klangkabot.');
    ctx.reply('command /help to see all command');
    ctx.reply('please update your ticker listener token with chain on menu.');
  }

  private async handleChainTicker(ctx: Context) {
    this.logger.log('Received /chainTicker command.');
    const roomId = ctx.message.from.id;

    this.message = ctx.message;
    if(!this.message){
      return ctx.reply(`Please insert the ticker name`)
    }
    const [, newTicker ] = this.message.text.split(' ');
    if(!newTicker){
      return ctx.reply(`Please insert the ticker name`)
    }
    const data = await this.okxService.chainTokenList(newTicker);
    if(typeof data === 'string'){
      ctx.reply(data);
    }
  }

  private async handleTickerUpdate(ctx: Context){
    this.logger.debug("Start handling ticker update");

    const roomId = ctx.message.from.id;

    this.message = ctx.message;
    const [, newTicker, newChain ] = this.message.text.split(' ');

    const updateTicker = await this.userService.updateTickerUser(roomId, newTicker, newChain);

    this.logger.debug(updateTicker.hasOwnProperty('data'))
    this.logger.debug(JSON.stringify(updateTicker))

    if(updateTicker.hasOwnProperty('data') && updateTicker.hasOwnProperty('data') === null){
      return ctx.reply(updateTicker['message']);
    }else{
      ctx.reply(`Ticker ${newTicker} has been updated`);
    }
  }

  private async handleMint(ctx: Context){
    this.logger.log('Start handling command mint brc20 token');
    const roomId = ctx.message.from.id;
    this.userData[roomId] = {
      step: 1,
      feat: "mint",
      stepsData: this.brcMint,
      processEvents: true,
    };

    ctx.reply('Please Enter the ticker name:');
    this.bot.on('text', this.inputeMintingData.bind(this));
  }

  private async handleDeploy(ctx: Context){
    this.logger.log('Start handling command mint brc20 token');
    const roomId = ctx.message.from.id;
    this.userData[roomId] = {
      step: 1,
      feat: "deploy",
      stepsData: this.brcDeploy,
      processEvents: true,
    };

    ctx.reply('Please Enter the ticker name:');
    this.bot.on('text', this.inputeMintingData.bind(this));
  }

  private async handleTransfer(ctx: Context){
    this.logger.log('Start handling command mint brc20 token');
    const roomId = ctx.message.from.id;
    this.userData[roomId] = {
      step: 1,
      feat: "transfer",
      stepsData: this.brctransfer,
      processEvents: true,
    };

    ctx.reply('Please Enter the ticker name:');
    this.bot.on('text', this.inputeMintingData.bind(this));
  }

  private async searchOrder(ctx: Context){
    this.logger.log('Start handling command search order brc20 token')
    this.message = ctx.message;
    const [, newOrder ] = this.message.text.split(' ');

    const search = await this.orderService.SearchOrder(newOrder)
    ctx.reply(`here is your order detail
    ${JSON.stringify(search)}    
    `)
  }

  private async handleHelp(ctx: Context) {
    this.logger.log('Received /help command.');
    this.logger.debug(JSON.stringify(ctx.message.from.id));
    const helpMessage = `
/start - Start account on bot
/ticker <ticker> <chain> - update ticker data notifikasi
/chainticker <ticker> - list chain ticker
/mint - processing minting your token
/deploy - processing deploy your token
/mint - processing minting your token
/search <orderId> - processing search your orderId from deploy, mint and transfer
/help - Display this help message
    `;
    ctx.reply(helpMessage);
  }

  private async inputeMintingData(ctx: Context){
    const roomId = ctx.message.from.id;
    const user = this.userData[roomId]

    if(!this.userData[roomId]){
      return ctx.reply(`Unkown command`)
    }
    if (!this.userData[roomId].processEvents) {
      this.logger.debug(`Error process event end`)
      return;
    }
    this.logger.log(`Start step ${user.step}`);
    this.message = ctx.message;
    const input = this.message.text
    switch (user.step) {
      case 1:
        const ticker = input
        if(ticker.length > 4){
          return ctx.reply(`ticker name max length is 4, your ticker is ${ticker.length}`)
        }

        // const validate = await this.okxService.GetDetailToken(ticker)
        
        // if(validate !== null){
        //   return ctx.reply(`ticker has deployed, try with another ticker name`)
        // }

        user.stepsData.brc20Ticker = ticker;

        this.logger.log(JSON.stringify(user))
        user.step++;
        ctx.reply('Please insert Receiver to finish step : ');

        break;
      case 2:
        const receiver = input
        user.stepsData.receiveAddress = receiver;

        const receiverAddress = await this.unisatService.getAddressBalance(receiver);
        if(typeof receiverAddress == 'string'){
          return ctx.reply(receiverAddress);
        }

        this.logger.log(JSON.stringify(user))
        user.step++;
        if(user.feat == 'deploy'){
          ctx.reply('Please insert max amount : ');
        }else{
          ctx.reply('Please insert amount : ');
        }
        
        break;
      case 3:
        const amount = input
        if(parseInt(amount) <= 0){
          return ctx.reply('Amount must be greater than 0');
        }
        if(user.feat == 'deploy'){
          user.stepsData.maxLimit = amount;
        }else{
          user.stepsData.brc20Amount = amount;
        }

        this.logger.log(JSON.stringify(user))
        user.step++;
        ctx.reply('Please insert done to finish step : ');
        
        break;
      case 4:
        this.logger.log(JSON.stringify(user))
        user.stepsData.feeRate = 1;

        let process;
        if(user.feat == 'mint'){
          process = await this.brc20Service.brcMint(user.stepsData);
        }else if(user.feat == 'deploy'){
          process = await this.brc20Service.brcDeploy(user.stepsData);
        }else if(user.feat == 'transfer'){
          process = await this.brc20Service.brcTransfer(user.stepsData);
        }

        this.logger.debug(process);
        if(process == null){
          return ctx.reply(`Please try to again`);
        }

        user.step = 0;
        delete this.userData[roomId];
        if(typeof process == 'string'){
          ctx.reply(process);
        }
        break;
      default:
        break;
    }
  }
  

  async startBot() {
    this.logger.log('Received /start command instead.');
    await this.bot.launch();
  }

}
