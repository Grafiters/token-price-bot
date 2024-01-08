"use strict";
const { join } = require('node:path');
const { NestFactory } = require('@nestjs/core');
const { FastifyAdapter } = require('@nestjs/platform-fastify');
const { AppModule } = require('../app.module');
/** @typedef {import('@nestjs/common').INestApplication<any>} INestApplication */ /**
 * @param {(core: INestApplication) => Promise<void>} coreUserFn
 */ async function useCore(coreUserFn) {
    require('dotenv').config({
        path: join(__dirname, '../.env')
    });
    const fastifyAdapter = new FastifyAdapter({
        maxParamLength: 1024 * 64,
        bodyLimit: 1024 * 1024 * 8,
        logger: false
    });
    const core = await NestFactory.create(AppModule, fastifyAdapter, {
        logger: [
            'error'
        ]
    });
    await core.init();
    await coreUserFn(core);
    await core.close();
}
module.exports = {
    useCore
};
