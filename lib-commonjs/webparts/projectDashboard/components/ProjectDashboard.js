"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectDashboard = void 0;
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var react_1 = require("react");
var FilterPanel_1 = require("./FilterPanel");
var SearchBox_1 = require("./SearchBox");
var LoadingSpinner_1 = require("./LoadingSpinner");
var ProjectCard_1 = require("./ProjectCard");
var ProjectRow_1 = require("./ProjectRow");
var useProjects_1 = require("../hooks/useProjects");
var ProjectDashboard = function (_a) {
    var projectsListTitle = _a.projectsListTitle, tasksListTitle = _a.tasksListTitle;
    var _b = (0, useProjects_1.useProjects)({
        projectsListTitle: projectsListTitle,
        tasksListTitle: tasksListTitle,
    }), projects = _b.projects, loading = _b.loading, error = _b.error, reload = _b.reload, managers = _b.managers, statuses = _b.statuses;
    var _c = (0, react_1.useState)(''), search = _c[0], setSearch = _c[1];
    var _d = (0, react_1.useState)('All'), status = _d[0], setStatus = _d[1];
    var _e = (0, react_1.useState)('All'), managerId = _e[0], setManagerId = _e[1];
    var _f = (0, react_1.useState)('cards'), view = _f[0], setView = _f[1];
    var filtered = (0, react_1.useMemo)(function () {
        var term = search.trim().toLowerCase();
        return projects.filter(function (p) {
            var matchesSearch = term.length === 0 || p.name.toLowerCase().includes(term);
            var matchesStatus = status === 'All' || p.status === status;
            var matchesManager = managerId === 'All' || (p.manager && p.manager.id === managerId);
            return matchesSearch && matchesStatus && matchesManager;
        });
    }, [projects, search, status, managerId]);
    return (React.createElement("div", { style: { padding: 12 } },
        React.createElement("div", { style: { display: 'grid', gridTemplateColumns: '1fr auto', gap: 12, alignItems: 'start' } },
            React.createElement(SearchBox_1.SearchBox, { value: search, onChange: setSearch }),
            React.createElement("div", { style: { display: 'flex', gap: 8, alignItems: 'center' } },
                React.createElement(FilterPanel_1.FilterPanel, { statuses: statuses, managers: managers, selectedStatus: status, onStatusChange: setStatus, selectedManagerId: managerId, onManagerChange: setManagerId }),
                React.createElement("select", { value: view, onChange: function (e) { return setView(e.target.value); }, style: { padding: '6px 8px' } },
                    React.createElement("option", { value: "cards" }, "Tarjetas"),
                    React.createElement("option", { value: "table" }, "Tabla")))),
        loading && React.createElement(LoadingSpinner_1.LoadingSpinner, { label: "Cargando proyectos y tareas..." }),
        error && (React.createElement("div", { role: "alert", style: { border: '1px solid #f3c7c9', background: '#fde7e9', color: '#a4262c', padding: 10, borderRadius: 6, marginTop: 12 } },
            React.createElement("div", { style: { fontWeight: 700, marginBottom: 4 } }, "Error"),
            React.createElement("div", null, error),
            React.createElement("button", { onClick: reload, style: { marginTop: 8, padding: '6px 10px', border: '1px solid #a4262c', background: '#fff', color: '#a4262c', borderRadius: 4 } }, "Reintentar"))),
        !loading && !error && filtered.length === 0 && (React.createElement("div", { style: { color: '#666', padding: 8, marginTop: 12 } }, "No hay proyectos que coincidan con los filtros/b\u00FAsqueda.")),
        !loading && !error && filtered.length > 0 && view === 'cards' && (React.createElement("div", { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12, marginTop: 12 } }, filtered.map(function (p) { return React.createElement(ProjectCard_1.ProjectCard, { key: p.id, project: p }); }))),
        !loading && !error && filtered.length > 0 && view === 'table' && (React.createElement("div", { style: { overflowX: 'auto', marginTop: 12 } },
            React.createElement("table", { style: { width: '100%', borderCollapse: 'collapse' } },
                React.createElement("thead", null,
                    React.createElement("tr", { style: { background: '#f3f2f1' } },
                        React.createElement("th", { style: { textAlign: 'left', padding: 8 } }, "Nombre"),
                        React.createElement("th", { style: { textAlign: 'left', padding: 8 } }, "Gerente"),
                        React.createElement("th", { style: { textAlign: 'left', padding: 8 } }, "Estado"),
                        React.createElement("th", { style: { textAlign: 'left', padding: 8 } }, "Prioridad"),
                        React.createElement("th", { style: { textAlign: 'right', padding: 8 } }, "Presupuesto"),
                        React.createElement("th", { style: { textAlign: 'right', padding: 8 } }, "Tareas"),
                        React.createElement("th", { style: { textAlign: 'right', padding: 8 } }, "Completadas"),
                        React.createElement("th", { style: { textAlign: 'left', padding: 8 } }, "Progreso"),
                        React.createElement("th", { style: { textAlign: 'left', padding: 8 } }, "Indicadores"))),
                React.createElement("tbody", null, filtered.map(function (p) { return React.createElement(ProjectRow_1.ProjectRow, { key: p.id, project: p }); })))))));
};
exports.ProjectDashboard = ProjectDashboard;
//# sourceMappingURL=ProjectDashboard.js.map