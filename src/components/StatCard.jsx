import React from 'react';

export const StatCard = ({ title, value, icon, theme = 'navy' }) => {
  const iconThemeClass = 
    theme === 'orange' ? 'stat-icon-orange' : 
    theme === 'amber' ? 'stat-icon-amber' : 
    'stat-icon-navy';

  return (
    <div className="card stat-card">
      <div className={`stat-icon ${iconThemeClass}`}>
        {icon}
      </div>
      <div>
        <div className="stat-value">{value}</div>
        <div className="stat-label">{title}</div>
      </div>
    </div>
  );
};
