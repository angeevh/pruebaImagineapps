import * as React from 'react';
import { useMemo, useState } from 'react';
import { FilterPanel } from './FilterPanel';
import { SearchBox } from './SearchBox';
import { LoadingSpinner } from './LoadingSpinner';
import { ProjectCard } from './ProjectCard';
import { ProjectRow } from './ProjectRow';
import { useProjects } from '../hooks/useProjects';
import { ProjectStatus } from '../models/types';

export const ProjectDashboard: React.FC<{ projectsListTitle: string; tasksListTitle: string }> = ({
  projectsListTitle, tasksListTitle,
}) => {
  const { projects, loading, error, reload, managers, statuses } = useProjects({
    projectsListTitle, tasksListTitle,
  });

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<ProjectStatus | 'All'>('All');
  const [managerId, setManagerId] = useState<number | 'All'>('All');
  const [view, setView] = useState<'cards' | 'table'>('cards');

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return projects.filter(p => {
      const matchesSearch = term.length === 0 || p.name.toLowerCase().includes(term);
      const matchesStatus = status === 'All' || p.status === status;
      const matchesManager = managerId === 'All' || (p.manager && p.manager.id === managerId);
      return matchesSearch && matchesStatus && matchesManager;
    });
  }, [projects, search, status, managerId]);

  return (
    <div style={{ padding: 12 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 12, alignItems: 'start' }}>
        <SearchBox value={search} onChange={setSearch} />
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <FilterPanel
            statuses={statuses}
            managers={managers}
            selectedStatus={status}
            onStatusChange={setStatus}
            selectedManagerId={managerId}
            onManagerChange={setManagerId}
          />
          <select value={view} onChange={e => setView(e.target.value as 'cards' | 'table')} style={{ padding: '6px 8px' }}>
            <option value="cards">Tarjetas</option>
            <option value="table">Tabla</option>
          </select>
        </div>
      </div>

      {loading && <LoadingSpinner label="Cargando proyectos y tareas..." />}

      {error && (
        <div role="alert" style={{ border: '1px solid #f3c7c9', background: '#fde7e9', color: '#a4262c', padding: 10, borderRadius: 6, marginTop: 12 }}>
          <div style={{ fontWeight: 700, marginBottom: 4 }}>Error</div>
          <div>{error}</div>
          <button onClick={reload} style={{ marginTop: 8, padding: '6px 10px', border: '1px solid #a4262c', background: '#fff', color: '#a4262c', borderRadius: 4 }}>
            Reintentar
          </button>
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div style={{ color: '#666', padding: 8, marginTop: 12 }}>No hay proyectos que coincidan con los filtros/búsqueda.</div>
      )}

      {!loading && !error && filtered.length > 0 && view === 'cards' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12, marginTop: 12 }}>
          {filtered.map(p => <ProjectCard key={p.id} project={p} />)}
        </div>
      )}

      {!loading && !error && filtered.length > 0 && view === 'table' && (
        <div style={{ overflowX: 'auto', marginTop: 12 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f3f2f1' }}>
                <th style={{ textAlign: 'left', padding: 8 }}>Nombre</th>
                <th style={{ textAlign: 'left', padding: 8 }}>Gerente</th>
                <th style={{ textAlign: 'left', padding: 8 }}>Estado</th>
                <th style={{ textAlign: 'left', padding: 8 }}>Prioridad</th>
                <th style={{ textAlign: 'right', padding: 8 }}>Presupuesto</th>
                <th style={{ textAlign: 'right', padding: 8 }}>Tareas</th>
                <th style={{ textAlign: 'right', padding: 8 }}>Completadas</th>
                <th style={{ textAlign: 'left', padding: 8 }}>Progreso</th>
                <th style={{ textAlign: 'left', padding: 8 }}>Indicadores</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => <ProjectRow key={p.id} project={p} />)}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
