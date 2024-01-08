"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "HttpService", {
    enumerable: true,
    get: function() {
        return HttpService;
    }
});
const _common = require("@nestjs/common");
const _promises = require("node:fs/promises");
const _nodeprocess = require("node:process");
const _jsyaml = /*#__PURE__*/ _interop_require_wildcard(require("js-yaml"));
const _axios = /*#__PURE__*/ _interop_require_default(require("axios"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {
        __proto__: null
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
const filePath = './platform.yml';
let HttpService = class HttpService {
    async get(path, platform, customHeader) {
        try {
            this.platformName = platform;
            const buildUrlPath = await this.buildPathUrl(path);
            this.customHeader = customHeader;
            const headers = await this.buildHeader();
            const config = {
                headers
            };
            const response = await _axios.default.get(buildUrlPath, config);
            return response;
        } catch (error) {
            this.logger.error(`error when try to request on url ${this.buildPathUrl}`, error);
            throw error;
        }
    }
    async post(path, platform, customHeader, body) {
        try {
            this.platformName = platform;
            const buildUrlPath = await this.buildPathUrl(path);
            this.customHeader = customHeader;
            const headers = await this.buildHeader();
            const config = {
                headers
            };
            const response = await _axios.default.post(buildUrlPath, JSON.stringify(body), config);
            return response;
        } catch (error) {
            this.logger.error(`error when try to request on url ${this.buildPathUrl}`, error);
            throw error;
        }
    }
    async buildHeader() {
        return {
            ...this.defaultHeader,
            ...this.customHeader
        };
    }
    async buildPathUrl(path) {
        const readFileContect = await (0, _promises.readFile)(filePath, 'utf8');
        const readContent = _jsyaml.load(readFileContect);
        this.ymlContent = readContent[this.platformName];
        const pathUrl = `${this.ymlContent.url}${this.ymlContent.service}/${path}`;
        return pathUrl;
    }
    constructor(){
        this.logger = new _common.Logger(HttpService.name);
        this.useProxy = _nodeprocess.env.USE_PROXY;
        this.defaultHeader = {
            'Content-Type': 'application/json'
        };
    }
};
HttpService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [])
], HttpService);
