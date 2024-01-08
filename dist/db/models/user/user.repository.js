// user-entities.repository.ts
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UserEntitiesRepository", {
    enumerable: true,
    get: function() {
        return UserEntitiesRepository;
    }
});
const _userentity = require("../../entities/user.entity");
const _typeorm = require("typeorm");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let UserEntitiesRepository = class UserEntitiesRepository extends _typeorm.Repository {
};
UserEntitiesRepository = _ts_decorate([
    (0, _typeorm.EntityRepository)(_userentity.UserEntities)
], UserEntitiesRepository);
