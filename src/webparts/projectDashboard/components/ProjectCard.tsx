import * as React from 'react';
import { IProject } from '../models/types';

const statusColors: Record<string, string> = {
  Planning: '#777', Active: '#0078d4', Completed: '#107c10', Cancelled: '#c50f1f',
};

const priorityColors: Record<string, { bg: string; color: string }> = {
  Low: { bg: '#e7f3ff', color: '#004578' },
  Medium: { bg: '#fff4ce', color: '#8a5500' },
  High: { bg: '#fde7e9', color: '#a4262c' },
  Critical: { bg: '#f8d7da', color: '#8a0f14' },
};

export const ProjectCard: React.FC<{ project: IProject }> = ({ project }) => {
  const hasBlocked = project.blockedTasks > 0;
  const isActiveLowProgress = project.status === 'Active' && project.progressPct < 50;
  const isHighProgress = project.progressPct >= 80;

  const indicators: { label: string; color: string }[] = [];
  if (hasBlocked) indicators.push({ label: 'Tareas bloqueadas', color: '#c50f1f' });
  if (isActiveLowProgress) indicators.push({ label: 'Activo < 50%', color: '#d83b01' });
  if (isHighProgress) indicators.push({ label: '≥ 80% completado', color: '#107c10' });

  const pr = priorityColors[project.priority ?? 'Low'];

  return (
    <div style={{ border: '1px solid #e1e1e1', borderRadius: 8, padding: 12, background: '#fff', display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700 }}>{project.name}</div>
          <div style={{ fontSize: 12, color: '#666' }}>{project.code}</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <span style={{ padding: '2px 6px', borderRadius: 4, fontSize: 12, color: '#fff', background: statusColors[project.status] }}>{project.status}</span>
          {project.priority && (
            <span style={{ padding: '2px 6px', borderRadius: 4, fontSize: 12, background: pr.bg, color: pr.color }}>{project.priority}</span>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <div><strong>Gerente:</strong> {project.manager?.displayName ?? '—'}</div>
        <div><strong>Presupuesto:</strong> {project.budget?.toLocaleString() ?? '—'}</div>
        <div><strong>Tareas:</strong> {project.totalTasks}</div>
        <div><strong>Completadas:</strong> {project.completedTasks}</div>
        <div><strong>Bloqueadas:</strong> {project.blockedTasks}</div>
      </div>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
          <span>Progreso</span><span>{project.progressPct}%</span>
        </div>
        <div style={{ height: 8, borderRadius: 6, background: '#eee', overflow: 'hidden' }} aria-label={`Progreso ${project.progressPct}%`}>
          <div
            style={{
              width: `${project.progressPct}%`,
              height: '100%',
              background: project.progressPct >= 80 ? '#107c10' : project.progressPct >= 25 ? '#ffaa44' : '#c50f1f',
              transition: 'width 0.3s ease',
            }}
          />
        </div>
      </div>

      {indicators.length > 0 && (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {indicators.map((i, idx) => (
            <span key={idx} style={{ padding: '2px 6px', borderRadius: 4, fontSize: 12, color: '#fff', background: i.color }}>{i.label}</span>
          ))}
        </div>
      )}
    </div>
  );
};