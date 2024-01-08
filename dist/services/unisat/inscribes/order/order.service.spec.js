"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _orderservice = require("./order.service");
describe('OrderService', ()=>{
    let service;
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            providers: [
                _orderservice.OrderService
            ]
        }).compile();
        service = module.get(_orderservice.OrderService);
    });
    it('should be defined', ()=>{
        expect(service).toBeDefined();
    });
});
