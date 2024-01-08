"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _brc20service = require("./brc20.service");
describe('Brc20Service', ()=>{
    let service;
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            providers: [
                _brc20service.Brc20Service
            ]
        }).compile();
        service = module.get(_brc20service.Brc20Service);
    });
    it('should be defined', ()=>{
        expect(service).toBeDefined();
    });
});
