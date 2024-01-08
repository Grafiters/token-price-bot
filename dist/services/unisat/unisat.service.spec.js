"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _unisatservice = require("./unisat.service");
describe('UnisatService', ()=>{
    let service;
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            providers: [
                _unisatservice.UnisatService
            ]
        }).compile();
        service = module.get(_unisatservice.UnisatService);
    });
    it('should be defined', ()=>{
        expect(service).toBeDefined();
    });
});
