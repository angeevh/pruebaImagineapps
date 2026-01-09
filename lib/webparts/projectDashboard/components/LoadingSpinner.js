import * as React from 'react';
export var LoadingSpinner = function (_a) {
    var label = _a.label;
    return (React.createElement("div", { style: { display: 'flex', gap: 8, alignItems: 'center', padding: 12 } },
        React.createElement("div", { "aria-busy": "true", style: {
                width: 18, height: 18, borderRadius: '50%',
                border: '2px solid #999', borderTopColor: '#0078d4',
                animation: 'spin 1s linear infinite',
            } }),
        React.createElement("span", null, label !== null && label !== void 0 ? label : 'Cargando...'),
        React.createElement("style", null, "@keyframes spin { from { transform: rotate(0) } to { transform: rotate(360deg) } }")));
};
//# sourceMappingURL=LoadingSpinner.js.map