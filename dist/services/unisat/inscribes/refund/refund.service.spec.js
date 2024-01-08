"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _refundservice = require("./refund.service");
describe('RefundService', ()=>{
    let service;
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            providers: [
                _refundservice.RefundService
            ]
        }).compile();
        service = module.get(_refundservice.RefundService);
    });
    it('should be defined', ()=>{
        expect(service).toBeDefined();
    });
});
