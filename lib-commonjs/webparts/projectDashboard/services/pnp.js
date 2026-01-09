"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSP = exports.initSP = void 0;
var sp_1 = require("@pnp/sp");
require("@pnp/sp/webs");
require("@pnp/sp/lists");
require("@pnp/sp/items");
var _sp;
var initSP = function (context) {
    if (!_sp)
        _sp = (0, sp_1.spfi)().using((0, sp_1.SPFx)(context));
    return _sp;
};
exports.initSP = initSP;
var getSP = function () {
    if (!_sp)
        throw new Error('SP no inicializado');
    return _sp;
};
exports.getSP = getSP;
//# sourceMappingURL=pnp.js.map