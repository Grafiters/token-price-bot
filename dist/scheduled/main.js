"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _core = require("@nestjs/core");
const _taskservice = require("./task/task.service");
const _taskmodule = require("./task.module");
async function bootstrap() {
    const app = await _core.NestFactory.create(_taskmodule.TaskModule);
    const taskService = app.get(_taskservice.TaskService);
    await taskService.handleCron();
    await app.listen(3000);
}
bootstrap();
