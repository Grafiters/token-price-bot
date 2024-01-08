"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _taskservice = require("./task.service");
describe('TaskService', ()=>{
    let service;
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            providers: [
                _taskservice.TaskService
            ]
        }).compile();
        service = module.get(_taskservice.TaskService);
    });
    it('should be defined', ()=>{
        expect(service).toBeDefined();
    });
});
