"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _httpservice = require("./http.service");
describe('HttpService', ()=>{
    let service;
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            providers: [
                _httpservice.HttpService
            ]
        }).compile();
        service = module.get(_httpservice.HttpService);
    });
    it('should be defined', ()=>{
        expect(service).toBeDefined();
    });
});
