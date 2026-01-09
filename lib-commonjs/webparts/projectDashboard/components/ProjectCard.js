"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectCard = void 0;
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var statusColors = {
    Planning: '#777', Active: '#0078d4', Completed: '#107c10', Cancelled: '#c50f1f',
};
var priorityColors = {
    Low: { bg: '#e7f3ff', color: '#004578' },
    Medium: { bg: '#fff4ce', color: '#8a5500' },
    High: { bg: '#fde7e9', color: '#a4262c' },
    Critical: { bg: '#f8d7da', color: '#8a0f14' },
};
var ProjectCard = function (_a) {
    var _b, _c, _d, _e, _f;
    var project = _a.project;
    var hasBlocked = project.blockedTasks > 0;
    var isActiveLowProgress = project.status === 'Active' && project.progressPct < 50;
    var isHighProgress = project.progressPct >= 80;
    var indicators = [];
    if (hasBlocked)
        indicators.push({ label: 'Tareas bloqueadas', color: '#c50f1f' });
    if (isActiveLowProgress)
        indicators.push({ label: 'Activo < 50%', color: '#d83b01' });
    if (isHighProgress)
        indicators.push({ label: '≥ 80% completado', color: '#107c10' });
    var pr = priorityColors[(_b = project.priority) !== null && _b !== void 0 ? _b : 'Low'];
    return (React.createElement("div", { style: { border: '1px solid #e1e1e1', borderRadius: 8, padding: 12, background: '#fff', display: 'flex', flexDirection: 'column', gap: 8 } },
        React.createElement("div", { style: { display: 'flex', justifyContent: 'space-between' } },
            React.createElement("div", null,
                React.createElement("div", { style: { fontSize: 16, fontWeight: 700 } }, project.name),
                React.createElement("div", { style: { fontSize: 12, color: '#666' } }, project.code)),
            React.createElement("div", { style: { display: 'flex', gap: 8 } },
                React.createElement("span", { style: { padding: '2px 6px', borderRadius: 4, fontSize: 12, color: '#fff', background: statusColors[project.status] } }, project.status),
                project.priority && (React.createElement("span", { style: { padding: '2px 6px', borderRadius: 4, fontSize: 12, background: pr.bg, color: pr.color } }, project.priority)))),
        React.createElement("div", { style: { display: 'flex', gap: 16, flexWrap: 'wrap' } },
            React.createElement("div", null,
                React.createElement("strong", null, "Gerente:"),
                " ", (_d = (_c = project.manager) === null || _c === void 0 ? void 0 : _c.displayName) !== null && _d !== void 0 ? _d : '—'),
            React.createElement("div", null,
                React.createElement("strong", null, "Presupuesto:"),
                " ", (_f = (_e = project.budget) === null || _e === void 0 ? void 0 : _e.toLocaleString()) !== null && _f !== void 0 ? _f : '—'),
            React.createElement("div", null,
                React.createElement("strong", null, "Tareas:"),
                " ",
                project.totalTasks),
            React.createElement("div", null,
                React.createElement("strong", null, "Completadas:"),
                " ",
                project.completedTasks),
            React.createElement("div", null,
                React.createElement("strong", null, "Bloqueadas:"),
                " ",
                project.blockedTasks)),
        React.createElement("div", null,
            React.createElement("div", { style: { display: 'flex', justifyContent: 'space-between', fontSize: 12 } },
                React.createElement("span", null, "Progreso"),
                React.createElement("span", null,
                    project.progressPct,
                    "%")),
            React.createElement("div", { style: { height: 8, borderRadius: 6, background: '#eee', overflow: 'hidden' }, "aria-label": "Progreso ".concat(project.progressPct, "%") },
                React.createElement("div", { style: {
                        width: "".concat(project.progressPct, "%"),
                        height: '100%',
                        background: project.progressPct >= 80 ? '#107c10' : project.progressPct >= 25 ? '#ffaa44' : '#c50f1f',
                        transition: 'width 0.3s ease',
                    } }))),
        indicators.length > 0 && (React.createElement("div", { style: { display: 'flex', gap: 8, flexWrap: 'wrap' } }, indicators.map(function (i, idx) { return (React.createElement("span", { key: idx, style: { padding: '2px 6px', borderRadius: 4, fontSize: 12, color: '#fff', background: i.color } }, i.label)); })))));
};
exports.ProjectCard = ProjectCard;
//# sourceMappingURL=ProjectCard.js.map