"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _telegramservice = require("./telegram.service");
describe('TelegramService', ()=>{
    let service;
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            providers: [
                _telegramservice.TelegramService
            ]
        }).compile();
        service = module.get(_telegramservice.TelegramService);
    });
    it('should be defined', ()=>{
        expect(service).toBeDefined();
    });
});
