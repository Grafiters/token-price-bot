"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _dotenv = require("dotenv");
const _core = require("@nestjs/core");
const _appmodule = require("./app.module");
const _telegramservice = require("./bot/telegram/telegram.service");
const _taskservice = require("./scheduled/task/task.service");
async function bootstrap() {
    const app = await _core.NestFactory.create(_appmodule.AppModule);
    const telegramService = app.get(_telegramservice.TelegramService);
    const taskService = app.get(_taskservice.TaskService);
    await telegramService.startBot();
    await taskService.handleCron();
    await app.listen(3000);
}
(0, _dotenv.config)();
bootstrap();
