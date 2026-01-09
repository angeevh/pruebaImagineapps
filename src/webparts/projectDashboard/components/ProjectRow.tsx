// components/ProjectRow.tsx
import * as React from 'react';
import { IProject } from '../models/types';

export const ProjectRow: React.FC<{ project: IProject }> = ({ project }) => (
  <tr>
    <td>{project.name}</td>
    <td>{project.manager?.displayName ?? '—'}</td>
    <td>{project.status}</td>
    <td>{project.priority ?? '—'}</td>
    <td>{project.budget?.toLocaleString() ?? '—'}</td>
    <td>{project.totalTasks}</td>
    <td>{project.completedTasks}</td>
    <td>
      <div style={{ width: 140, background: '#eee', height: 8, borderRadius: 6, overflow: 'hidden' }}>
        <div
          style={{
            width: `${project.progressPct}%`,
            height: '100%',
            background: project.progressPct >= 80 ? '#107c10' : project.progressPct >= 25 ? '#ffaa44' : '#c50f1f',
          }}
          title={`${project.progressPct}%`}
        />
      </div>
    </td>
    <td>{project.blockedTasks > 0 ? 'Bloqueadas' : '—'}</td>
  </tr>
);