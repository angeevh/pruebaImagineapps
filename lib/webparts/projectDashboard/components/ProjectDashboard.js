import * as React from 'react';
import { useMemo, useState } from 'react';
import { FilterPanel } from './FilterPanel';
import { SearchBox } from './SearchBox';
import { LoadingSpinner } from './LoadingSpinner';
import { ProjectCard } from './ProjectCard';
import { ProjectRow } from './ProjectRow';
import { useProjects } from '../hooks/useProjects';
export var ProjectDashboard = function (_a) {
    var projectsListTitle = _a.projectsListTitle, tasksListTitle = _a.tasksListTitle;
    var _b = useProjects({
        projectsListTitle: projectsListTitle,
        tasksListTitle: tasksListTitle,
    }), projects = _b.projects, loading = _b.loading, error = _b.error, reload = _b.reload, managers = _b.managers, statuses = _b.statuses;
    var _c = useState(''), search = _c[0], setSearch = _c[1];
    var _d = useState('All'), status = _d[0], setStatus = _d[1];
    var _e = useState('All'), managerId = _e[0], setManagerId = _e[1];
    var _f = useState('cards'), view = _f[0], setView = _f[1];
    var filtered = useMemo(function () {
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
            React.createElement(SearchBox, { value: search, onChange: setSearch }),
            React.createElement("div", { style: { display: 'flex', gap: 8, alignItems: 'center' } },
                React.createElement(FilterPanel, { statuses: statuses, managers: managers, selectedStatus: status, onStatusChange: setStatus, selectedManagerId: managerId, onManagerChange: setManagerId }),
                React.createElement("select", { value: view, onChange: function (e) { return setView(e.target.value); }, style: { padding: '6px 8px' } },
                    React.createElement("option", { value: "cards" }, "Tarjetas"),
                    React.createElement("option", { value: "table" }, "Tabla")))),
        loading && React.createElement(LoadingSpinner, { label: "Cargando proyectos y tareas..." }),
        error && (React.createElement("div", { role: "alert", style: { border: '1px solid #f3c7c9', background: '#fde7e9', color: '#a4262c', padding: 10, borderRadius: 6, marginTop: 12 } },
            React.createElement("div", { style: { fontWeight: 700, marginBottom: 4 } }, "Error"),
            React.createElement("div", null, error),
            React.createElement("button", { onClick: reload, style: { marginTop: 8, padding: '6px 10px', border: '1px solid #a4262c', background: '#fff', color: '#a4262c', borderRadius: 4 } }, "Reintentar"))),
        !loading && !error && filtered.length === 0 && (React.createElement("div", { style: { color: '#666', padding: 8, marginTop: 12 } }, "No hay proyectos que coincidan con los filtros/b\u00FAsqueda.")),
        !loading && !error && filtered.length > 0 && view === 'cards' && (React.createElement("div", { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12, marginTop: 12 } }, filtered.map(function (p) { return React.createElement(ProjectCard, { key: p.id, project: p }); }))),
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
                React.createElement("tbody", null, filtered.map(function (p) { return React.createElement(ProjectRow, { key: p.id, project: p }); })))))));
};
//# sourceMappingURL=ProjectDashboard.js.map