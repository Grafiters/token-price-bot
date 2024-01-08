"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UserService", {
    enumerable: true,
    get: function() {
        return UserService;
    }
});
const _userentity = require("../../entities/user.entity");
const _typeorm = require("@nestjs/typeorm");
const _common = require("@nestjs/common");
const _okxservice = require("../../../services/okx/okx.service");
const _userrepository = require("./user.repository");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let UserService = class UserService {
    async createUser(userId, ticker, tokenContractAddress, currentBlock) {
        this.logger.debug('Start initialize user');
        const validate = await this.findUserByTelegramId(userId);
        if (validate === null) {
            const user = this.userRepository.create({
                userId,
                ticker,
                tokenContractAddress,
                currentBlock
            });
            return await this.userRepository.save(user);
        } else {
            return null;
        }
    }
    async findUserByTelegramId(userId) {
        this.logger.debug('Start finding user');
        return await this.userRepository.findOneBy({
            userId
        });
    }
    async updateUser(userId, updateData) {
        const user = await this.findUserByTelegramId(userId);
        if (!user) {
            return null;
        }
        Object.assign(user, updateData);
        return await this.userRepository.save(user);
    }
    async updateTickerUser(userId, ticker) {
        const user = await this.findUserByTelegramId(userId);
        const tickerData = await this.okxService.tokenDetailCall(ticker);
        if (tickerData === null) {
            return {
                data: null,
                message: `${ticker} has not deployed`
            };
        }
        const updatedData = {
            ticker: ticker,
            tokenContractAddress: tickerData.inscriptionId
        };
        Object.assign(user, updatedData);
        return await this.userRepository.save(user);
    }
    constructor(userRepository, okxService){
        this.userRepository = userRepository;
        this.okxService = okxService;
        this.logger = new _common.Logger(UserService.name);
    }
};
UserService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _typeorm.InjectRepository)(_userentity.UserEntities)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _userrepository.UserEntitiesRepository === "undefined" ? Object : _userrepository.UserEntitiesRepository,
        typeof _okxservice.OkxService === "undefined" ? Object : _okxservice.OkxService
    ])
], UserService);
