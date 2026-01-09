import * as React from 'react';
export var SearchBox = function (_a) {
    var value = _a.value, onChange = _a.onChange;
    return (React.createElement("input", { type: "text", value: value, placeholder: "Buscar por nombre de proyecto...", onChange: function (e) { return onChange(e.target.value); }, style: { width: '100%', padding: '8px 10px', border: '1px solid #ddd', borderRadius: 4 } }));
};
//# sourceMappingURL=SearchBox.js.map