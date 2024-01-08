"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _messagesservice = require("./messages.service");
describe('MessagesService', ()=>{
    let service;
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            providers: [
                _messagesservice.MessagesService
            ]
        }).compile();
        service = module.get(_messagesservice.MessagesService);
    });
    it('should be defined', ()=>{
        expect(service).toBeDefined();
    });
});
