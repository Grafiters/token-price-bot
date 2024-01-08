"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _userservice = require("./user.service");
describe('UserService', ()=>{
    let service;
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            providers: [
                _userservice.UserService
            ]
        }).compile();
        service = module.get(_userservice.UserService);
    });
    it('should be defined', ()=>{
        expect(service).toBeDefined();
    });
});
