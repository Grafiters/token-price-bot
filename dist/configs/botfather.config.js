"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _config = require("@nestjs/config");
const _nodeprocess = require("node:process");
const _default = (0, _config.registerAs)('botfather', ()=>({
        token: _nodeprocess.env.TELEGRAM_TOKEN_KEY ?? ''
    }));