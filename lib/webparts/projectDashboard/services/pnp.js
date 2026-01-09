import { spfi, SPFx } from '@pnp/sp';
import '@pnp/sp/webs';
import '@pnp/sp/lists';
import '@pnp/sp/items';
var _sp;
export var initSP = function (context) {
    if (!_sp)
        _sp = spfi().using(SPFx(context));
    return _sp;
};
export var getSP = function () {
    if (!_sp)
        throw new Error('SP no inicializado');
    return _sp;
};
//# sourceMappingURL=pnp.js.map