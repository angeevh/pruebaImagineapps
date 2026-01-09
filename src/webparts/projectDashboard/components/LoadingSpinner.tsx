import * as React from 'react';

export const LoadingSpinner: React.FC<{ label?: string }> = ({ label }) => (
  <div style={{ display: 'flex', gap: 8, alignItems: 'center', padding: 12 }}>
    <div
      aria-busy="true"
      style={{
        width: 18, height: 18, borderRadius: '50%',
        border: '2px solid #999', borderTopColor: '#0078d4',
        animation: 'spin 1s linear infinite',
      }}
    />
    <span>{label ?? 'Cargando...'}</span>
    <style>{`@keyframes spin { from { transform: rotate(0) } to { transform: rotate(360deg) } }`}</style>
  </div>
);