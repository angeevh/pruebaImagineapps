// hooks/useProjects.ts
import { useCallback, useEffect, useMemo, useState } from 'react';
import { getSP } from '../services/pnp';
import { IProject, ITask, IUser, ProjectStatus, Priority } from '../models/types';

export interface UseProjectsOptions {
  projectsListTitle: string;
  tasksListTitle: string;
}

export interface UseProjectsState {
  projects: IProject[];
  loading: boolean;
  error?: string;
}

export const useProjects = (opts: UseProjectsOptions) => {
  const [state, setState] = useState<UseProjectsState>({ projects: [], loading: true });

  const load = useCallback(async () => {
    setState(s => ({ ...s, loading: true, error: undefined }));
    try {
      const sp = getSP();

      // Proyectos: ajusta nombres internos según tus listas
      const projectItems = await sp.web.lists
        .getByTitle(opts.projectsListTitle)
        .items.select(
          'Id',
          'Title',                // Codigo del proyecto
          'NombreProyecto',       
          'PresupuestoTotal',     
          'FechaInicio',          
          'FechaFin',            
          'Estado',               
          'Prioridad',            
          'GerenteProyecto/Id',
          'GerenteProyecto/Title',
          'GerenteProyecto/EMail'
        )
        .expand('GerenteProyecto')
        .top(5000)();

      const baseProjects: IProject[] = projectItems.map((it: any) => ({
        id: it.Id,
        name: it.NombreProyecto,
        code: it.Title ?? `PROJ-${it.Id}`,
        budget: it.PresupuestoTotal ?? undefined,
        startDate: it.FechaInicio ?? undefined,
        endDate: it.FechaFin ?? undefined,
        status: (it.Estado as ProjectStatus) ?? 'Planning',
        priority: it.Prioridad as Priority,
        manager: it.GerenteProyecto
          ? {
              id: it.GerenteProyecto.Id,
              displayName: it.GerenteProyecto.Title,
              email: it.GerenteProyecto.EMail,
            }
          : undefined,
        totalTasks: 0,
        completedTasks: 0,
        blockedTasks: 0,
        progressPct: 0,
      }));

      if (baseProjects.length === 0) {
        setState({ projects: [], loading: false, error: undefined });
        return;
      }

      const projectIds = new Set(baseProjects.map(p => p.id));

      // Tareas
      const taskItems = await sp.web.lists
        .getByTitle(opts.tasksListTitle)
        .items.select(
          'Id',
          'Title',
          'ProyectoRelacionadoId',
          'AsignadoA/Id',
          'AsignadoA/Title',
          'AsignadoA/EMail',
          'HorasEstimadas',
          'PorcentajeCompletado',
          'Estado'
        )
        .expand('AsignadoA')
        .filter(`ProyectoRelacionadoId ne null`)
        .top(5000)();

      const tasks: ITask[] = taskItems
        .map((t: any) => ({
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
          estimatedHours: t.HorasEstimadas ?? undefined,
          percentComplete:
            typeof t.PorcentajeCompletado === 'number'
              ? Math.min(100, Math.max(0, t.PorcentajeCompletado))
              : 0,
          status: (t.Estado as any) ?? 'Not Started',
        }))
        .filter(t => projectIds.has(t.relatedProjectId));

      // Agregaciones
      const tasksByProject = new Map<number, ITask[]>();
      tasks.forEach(t => {
        const arr = tasksByProject.get(t.relatedProjectId) ?? [];
        arr.push(t);
        tasksByProject.set(t.relatedProjectId, arr);
      });

      const projectsWithAgg = baseProjects.map(p => {
        const pTasks = tasksByProject.get(p.id) ?? [];
        const totalTasks = pTasks.length;
        const completedTasks = pTasks.filter(t => t.status === 'Completed').length;
        const blockedTasks = pTasks.filter(t => t.status === 'Blocked').length;
        const avgPct =
          totalTasks > 0
            ? Math.round(pTasks.reduce((sum, t) => sum + (t.percentComplete || 0), 0) / totalTasks)
            : 0;

        return { ...p, totalTasks, completedTasks, blockedTasks, progressPct: avgPct };
      });

      setState({ projects: projectsWithAgg, loading: false, error: undefined });
    } catch (err: any) {
      setState({ projects: [], loading: false, error: err?.message ?? 'Error cargando datos' });
    }
  }, [opts.projectsListTitle, opts.tasksListTitle]);

  useEffect(() => { load(); }, [load]);

  const managers = useMemo(() => {
    const uniq = new Map<number, IUser>();
    state.projects.forEach(p => { if (p.manager) uniq.set(p.manager.id, p.manager); });
    return Array.from(uniq.values());
  }, [state.projects]);

  const statuses: ProjectStatus[] = useMemo(
    () => ['Planning', 'Active', 'Completed', 'Cancelled'],
    []
  );

  return { ...state, reload: load, managers, statuses };
};