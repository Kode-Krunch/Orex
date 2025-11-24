import { Button } from 'components/ui';
import React from 'react';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';
import { HOURS } from 'views/Scheduling/Scheduler/constants';

function Hours({ tableRef, tableData }) {
  /* EVENT HANDLERS*/
  const handleHourClick = (hour) => {
    try {
      const scrollIndex = [...tableData]
        .splice(1)
        .findIndex((row) => row.StartTime.split(':')[0] >= hour);
      if (scrollIndex !== -1) {
        if (scrollIndex === 1) {
          tableRef.current.scrollToItem(0, 'center');
        } else {
          tableRef.current.scrollToItem(scrollIndex, 'center');
        }
      } else {
        openNotification('info', 'No data available for this hour');
        return;
      }
    } catch (error) {
      openNotification('danger', 'Something went wrong');
      console.error(error);
    }
  };

  return (
    <div className="h-full w-full flex flex-col gap-0.5 overflow-y-scroll no-scrollbar">
      {HOURS.map((hour) => (
        <Button
          size="sm"
          className="!bg-teal-700 hover:!bg-teal-800 transition-all"
          onClick={() => handleHourClick(hour.split(':')[0])}
          key={hour}
        >
          {hour}
        </Button>
      ))}
    </div>
  );
}

export default Hours;
