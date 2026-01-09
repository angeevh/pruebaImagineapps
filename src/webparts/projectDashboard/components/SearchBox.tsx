import * as React from 'react';

export const SearchBox: React.FC<{ value: string; onChange: (v: string) => void }> = ({ value, onChange }) => (
  <input
    type="text"
    value={value}
    placeholder="Buscar por nombre de proyecto..."
    onChange={e => onChange(e.target.value)}
    style={{ width: '100%', padding: '8px 10px', border: '1px solid #ddd', borderRadius: 4 }}
  />
);