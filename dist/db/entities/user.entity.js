"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UserEntities", {
    enumerable: true,
    get: function() {
        return UserEntities;
    }
});
const _typeorm = require("typeorm");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let UserEntities = class UserEntities {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)(),
    _ts_metadata("design:type", Number)
], UserEntities.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "bigint",
        unique: true
    }),
    _ts_metadata("design:type", Number)
], UserEntities.prototype, "userId", void 0);
_ts_decorate([
    (0, _typeorm.Column)(),
    _ts_metadata("design:type", String)
], UserEntities.prototype, "ticker", void 0);
_ts_decorate([
    (0, _typeorm.Column)(),
    _ts_metadata("design:type", String)
], UserEntities.prototype, "tokenContractAddress", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: "bigint"
    }),
    _ts_metadata("design:type", Number)
], UserEntities.prototype, "currentBlock", void 0);
UserEntities = _ts_decorate([
    (0, _typeorm.Entity)()
], UserEntities);
