import { UserEntities } from '@db/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { OkxService } from '../../../services/okx/okx.service';
import { ErrorMessage } from '@services/okx/type/okx.type';
import { UserEntitiesRepository } from './user.repository';

@Injectable()
export class UserService {
    private readonly logger = new Logger(UserService.name)
    private error: ErrorMessage;

    constructor(
        @InjectRepository(UserEntities)
        private readonly userRepository: UserEntitiesRepository,
        private readonly okxService: OkxService
    ) {}

    async createUser(userId: number, ticker: string, tokenContractAddress: string, currentBlock: number, chain: string, chainId: number = 0) {
        this.logger.debug('Start initialize user')
        const validate = await this.findUserByTelegramId(userId);
        if(validate === null){
            const user = this.userRepository.create({ userId, ticker, tokenContractAddress, currentBlock, chain, chainId });
            return await this.userRepository.save(user);
        }else{
            return null;
        }
    }

    async userData(): Promise<UserEntities[]>{
        this.logger.debug(`Get all user data`);
        return await this.userRepository.find();
    }

    async userByCurrentHeight(height: number): Promise<UserEntities[]>{
        return await this.userRepository.createQueryBuilder('user_entities')
            .where('user_entities.currentBlock <= :block', { block: height })
            .getRawMany();
    }

    async tickerAndChain(): Promise<{ ticker: string; chain: string; chainId: number; tokenContract: string;}[]>{
        this.logger.debug(`Get all ticker with chain data`);
        return await this.userRepository.createQueryBuilder('user_entities')
            .select('user_entities.ticker', 'ticker')
            .addSelect('user_entities.chain', 'chain')
            .addSelect('user_entities.chainId', 'chainId')
            .addSelect('user_entities.tokenContractAddress', 'tokenContract')
            .groupBy('user_entities.ticker, user_entities.chain, user_entities.chainId, user_entities.tokenContractAddress')
            .getRawMany();
    }

    async currentHeight(): Promise<number>{
        this.logger.debug(`Get all ticker with chain data`);
        return await this.userRepository.createQueryBuilder('user_entities')
            .select('MIN(user_entities.currentBlock)', 'currentBlock')
            .getRawOne();
    }

    async findUserByTelegramId(userId: number): Promise<UserEntities | null> {
        this.logger.debug('Start finding user')
        return await this.userRepository.findOneBy({userId});
    }

    async updateUser(userId: number, updateData: Partial<UserEntities>): Promise<UserEntities | null> {
        const user = await this.findUserByTelegramId(userId);

        if (!user) {
            return null
        }

        Object.assign(user, updateData);
        return await this.userRepository.save(user);
    }

    async updateTickerUser(userId: number, ticker: string, chain: string): Promise<UserEntities | null | NotFoundException | ErrorMessage>{
        const user = await this.findUserByTelegramId(userId);
        const tickerData = await this.okxService.tokenDetailCall(ticker, chain);
        if(typeof tickerData === 'string') {
            return {
                data: null,
                message: tickerData
            }
        }

        const updatedData = {
            ticker: ticker,
            chain: chain,
            tokenContractAddress: tickerData.tokenContractAddress
        }
        Object.assign(user, updatedData);
        return await this.userRepository.save(user);
    }
}