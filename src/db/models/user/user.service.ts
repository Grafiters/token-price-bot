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

    async createUser(userId: number, ticker: string, tokenContractAddress: string, currentBlock: number) {
        this.logger.debug('Start initialize user')
        const validate = await this.findUserByTelegramId(userId);
        if(validate === null){
            const user = this.userRepository.create({ userId, ticker, tokenContractAddress, currentBlock });
            return await this.userRepository.save(user);
        }else{
            return null;
        }
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

    async updateTickerUser(userId: number, ticker: string): Promise<UserEntities | null | NotFoundException | ErrorMessage>{
        const user = await this.findUserByTelegramId(userId);
        const tickerData = await this.okxService.tokenDetailCall(ticker);
        if(tickerData === null) {
            return {
                data: null,
                message: `${ticker} has not deployed`
            }
        }

        const updatedData = {
            ticker: ticker,
            tokenContractAddress: tickerData.inscriptionId
        }
        Object.assign(user, updatedData);
        return await this.userRepository.save(user);
    }
}