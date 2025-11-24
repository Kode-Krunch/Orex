import React from 'react';
import { SPORTS_DASHBOARD_SHORTCUTS } from 'views/Controls/Dashboard/constants/dashboardShortcuts';
import DashboardHeader from 'views/Controls/Dashboard/DashboardHeader';
import DashboardShortcutCards from 'views/Controls/Dashboard/DashboardShortcutCards';

function SportsDashboard() {
  return (
    <>
      <DashboardHeader Name={'Sports Dashboard'} Page={'Home'} Links={'Home'} />
      <div
        className={`grid grid-cols-${SPORTS_DASHBOARD_SHORTCUTS.length} gap-4`}
      >
        <DashboardShortcutCards shortcuts={SPORTS_DASHBOARD_SHORTCUTS} />
      </div>
    </>
  );
}

export default SportsDashboard;
