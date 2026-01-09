// components/ProjectRow.tsx
import * as React from 'react';
export var ProjectRow = function (_a) {
    var _b, _c, _d, _e, _f;
    var project = _a.project;
    return (React.createElement("tr", null,
        React.createElement("td", null, project.name),
        React.createElement("td", null, (_c = (_b = project.manager) === null || _b === void 0 ? void 0 : _b.displayName) !== null && _c !== void 0 ? _c : '—'),
        React.createElement("td", null, project.status),
        React.createElement("td", null, (_d = project.priority) !== null && _d !== void 0 ? _d : '—'),
        React.createElement("td", null, (_f = (_e = project.budget) === null || _e === void 0 ? void 0 : _e.toLocaleString()) !== null && _f !== void 0 ? _f : '—'),
        React.createElement("td", null, project.totalTasks),
        React.createElement("td", null, project.completedTasks),
        React.createElement("td", null,
            React.createElement("div", { style: { width: 140, background: '#eee', height: 8, borderRadius: 6, overflow: 'hidden' } },
                React.createElement("div", { style: {
                        width: "".concat(project.progressPct, "%"),
                        height: '100%',
                        background: project.progressPct >= 80 ? '#107c10' : project.progressPct >= 25 ? '#ffaa44' : '#c50f1f',
                    }, title: "".concat(project.progressPct, "%") }))),
        React.createElement("td", null, project.blockedTasks > 0 ? 'Bloqueadas' : '—')));
};
//# sourceMappingURL=ProjectRow.js.map