import { __assign, __awaiter, __generator } from "tslib";
// hooks/useProjects.ts
import { useCallback, useEffect, useMemo, useState } from 'react';
import { getSP } from '../services/pnp';
export var useProjects = function (opts) {
    var _a = useState({ projects: [], loading: true }), state = _a[0], setState = _a[1];
    var load = useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        var sp, projectItems, baseProjects, projectIds_1, taskItems, tasks, tasksByProject_1, projectsWithAgg, err_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    setState(function (s) { return (__assign(__assign({}, s), { loading: true, error: undefined })); });
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    sp = getSP();
                    return [4 /*yield*/, sp.web.lists
                            .getByTitle(opts.projectsListTitle)
                            .items.select('Id', 'Title', // Codigo del proyecto
                        'NombreProyecto', 'PresupuestoTotal', 'FechaInicio', 'FechaFin', 'Estado', 'Prioridad', 'GerenteProyecto/Id', 'GerenteProyecto/Title', 'GerenteProyecto/EMail')
                            .expand('GerenteProyecto')
                            .top(5000)()];
                case 2:
                    projectItems = _b.sent();
                    baseProjects = projectItems.map(function (it) {
                        var _a, _b, _c, _d, _e;
                        return ({
                            id: it.Id,
                            name: it.NombreProyecto,
                            code: (_a = it.Title) !== null && _a !== void 0 ? _a : "PROJ-".concat(it.Id),
                            budget: (_b = it.PresupuestoTotal) !== null && _b !== void 0 ? _b : undefined,
                            startDate: (_c = it.FechaInicio) !== null && _c !== void 0 ? _c : undefined,
                            endDate: (_d = it.FechaFin) !== null && _d !== void 0 ? _d : undefined,
                            status: (_e = it.Estado) !== null && _e !== void 0 ? _e : 'Planning',
                            priority: it.Prioridad,
                            manager: it.GerenteDelProyecto
                                ? {
                                    id: it.GerenteDelProyecto.Id,
                                    displayName: it.GerenteDelProyecto.Title,
                                    email: it.GerenteDelProyecto.EMail,
                                }
                                : undefined,
                            totalTasks: 0,
                            completedTasks: 0,
                            blockedTasks: 0,
                            progressPct: 0,
                        });
                    });
                    if (baseProjects.length === 0) {
                        setState({ projects: [], loading: false, error: undefined });
                        return [2 /*return*/];
                    }
                    projectIds_1 = new Set(baseProjects.map(function (p) { return p.id; }));
                    return [4 /*yield*/, sp.web.lists
                            .getByTitle(opts.tasksListTitle)
                            .items.select('Id', 'Title', 'ProyectoRelacionadoId', 'AsignadoA/Id', 'AsignadoA/Title', 'AsignadoA/EMail', 'HorasEstimadas', 'PorcentajeCompletado', 'Estado')
                            .expand('AsignadoA')
                            .filter("ProyectoRelacionadoId ne null")
                            .top(5000)()];
                case 3:
                    taskItems = _b.sent();
                    tasks = taskItems
                        .map(function (t) {
                        var _a, _b;
                        return ({
                            id: t.Id,
                            title: t.Title,
                            relatedProjectId: t.ProyectoRelacionadoId,
                            assignedTo: t.AsignadoA
                                ? {
                                    id: t.AsignadoA.Id,
                                    displayName: t.AsignadoA.Title,
                                    email: t.AsignadoA.EMail,
                                }
                                : undefined,
                            estimatedHours: (_a = t.HorasEstimadas) !== null && _a !== void 0 ? _a : undefined,
                            percentComplete: typeof t.PorcentajeCompletado === 'number'
                                ? Math.min(100, Math.max(0, t.PorcentajeCompletado))
                                : 0,
                            status: (_b = t.Estado) !== null && _b !== void 0 ? _b : 'Not Started',
                        });
                    })
                        .filter(function (t) { return projectIds_1.has(t.relatedProjectId); });
                    tasksByProject_1 = new Map();
                    tasks.forEach(function (t) {
                        var _a;
                        var arr = (_a = tasksByProject_1.get(t.relatedProjectId)) !== null && _a !== void 0 ? _a : [];
                        arr.push(t);
                        tasksByProject_1.set(t.relatedProjectId, arr);
                    });
                    projectsWithAgg = baseProjects.map(function (p) {
                        var _a;
                        var pTasks = (_a = tasksByProject_1.get(p.id)) !== null && _a !== void 0 ? _a : [];
                        var totalTasks = pTasks.length;
                        var completedTasks = pTasks.filter(function (t) { return t.status === 'Completed'; }).length;
                        var blockedTasks = pTasks.filter(function (t) { return t.status === 'Blocked'; }).length;
                        var avgPct = totalTasks > 0
                            ? Math.round(pTasks.reduce(function (sum, t) { return sum + (t.percentComplete || 0); }, 0) / totalTasks)
                            : 0;
                        return __assign(__assign({}, p), { totalTasks: totalTasks, completedTasks: completedTasks, blockedTasks: blockedTasks, progressPct: avgPct });
                    });
                    setState({ projects: projectsWithAgg, loading: false, error: undefined });
                    return [3 /*break*/, 5];
                case 4:
                    err_1 = _b.sent();
                    setState({ projects: [], loading: false, error: (_a = err_1 === null || err_1 === void 0 ? void 0 : err_1.message) !== null && _a !== void 0 ? _a : 'Error cargando datos' });
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); }, [opts.projectsListTitle, opts.tasksListTitle]);
    useEffect(function () { load(); }, [load]);
    var managers = useMemo(function () {
        var uniq = new Map();
        state.projects.forEach(function (p) { if (p.manager)
            uniq.set(p.manager.id, p.manager); });
        return Array.from(uniq.values());
    }, [state.projects]);
    var statuses = useMemo(function () { return ['Planning', 'Active', 'Completed', 'Cancelled']; }, []);
    return __assign(__assign({}, state), { reload: load, managers: managers, statuses: statuses });
};
//# sourceMappingURL=useProjects.js.map