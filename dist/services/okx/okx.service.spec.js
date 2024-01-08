"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _okxservice = require("./okx.service");
describe('OkxService', ()=>{
    let service;
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            providers: [
                _okxservice.OkxService
            ]
        }).compile();
        service = module.get(_okxservice.OkxService);
    });
    it('should be defined', ()=>{
        expect(service).toBeDefined();
    });
});
