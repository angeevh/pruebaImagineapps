import * as React from 'react';
import { IUser, ProjectStatus } from '../models/types';

interface Props {
  statuses: ProjectStatus[];
  managers: IUser[];
  selectedStatus?: ProjectStatus | 'All';
  onStatusChange: (s: ProjectStatus | 'All') => void;
  selectedManagerId?: number | 'All';
  onManagerChange: (id: number | 'All') => void;
}

export const FilterPanel: React.FC<Props> = ({
  statuses, managers,
  selectedStatus = 'All', onStatusChange,
  selectedManagerId = 'All', onManagerChange,
}) => (
  <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
    <div>
      <label style={{ display: 'block', fontWeight: 600, marginBottom: 4 }}>Estado</label>
      <select
        value={selectedStatus}
        onChange={e => onStatusChange(e.target.value === 'All' ? 'All' : (e.target.value as ProjectStatus))}
        style={{ padding: '6px 8px', border: '1px solid #ddd', borderRadius: 4 }}
      >
        <option value="All">Todos</option>
        {statuses.map(s => <option key={s} value={s}>{s}</option>)}
      </select>
    </div>

    <div>
      <label style={{ display: 'block', fontWeight: 600, marginBottom: 4 }}>Gerente</label>
      <select
        value={selectedManagerId}
        onChange={e => onManagerChange(e.target.value === 'All' ? 'All' : Number(e.target.value))}
        style={{ padding: '6px 8px', border: '1px solid #ddd', borderRadius: 4 }}
      >
        <option value="All">Todos</option>
        {managers.map(m => <option key={m.id} value={m.id}>{m.displayName}</option>)}
      </select>
    </div>
  </div>
);