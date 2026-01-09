import * as React from 'react';
export var FilterPanel = function (_a) {
    var statuses = _a.statuses, managers = _a.managers, _b = _a.selectedStatus, selectedStatus = _b === void 0 ? 'All' : _b, onStatusChange = _a.onStatusChange, _c = _a.selectedManagerId, selectedManagerId = _c === void 0 ? 'All' : _c, onManagerChange = _a.onManagerChange;
    return (React.createElement("div", { style: { display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' } },
        React.createElement("div", null,
            React.createElement("label", { style: { display: 'block', fontWeight: 600, marginBottom: 4 } }, "Estado"),
            React.createElement("select", { value: selectedStatus, onChange: function (e) { return onStatusChange(e.target.value === 'All' ? 'All' : e.target.value); }, style: { padding: '6px 8px', border: '1px solid #ddd', borderRadius: 4 } },
                React.createElement("option", { value: "All" }, "Todos"),
                statuses.map(function (s) { return React.createElement("option", { key: s, value: s }, s); }))),
        React.createElement("div", null,
            React.createElement("label", { style: { display: 'block', fontWeight: 600, marginBottom: 4 } }, "Gerente"),
            React.createElement("select", { value: selectedManagerId, onChange: function (e) { return onManagerChange(e.target.value === 'All' ? 'All' : Number(e.target.value)); }, style: { padding: '6px 8px', border: '1px solid #ddd', borderRadius: 4 } },
                React.createElement("option", { value: "All" }, "Todos"),
                managers.map(function (m) { return React.createElement("option", { key: m.id, value: m.id }, m.displayName); })))));
};
//# sourceMappingURL=FilterPanel.js.map