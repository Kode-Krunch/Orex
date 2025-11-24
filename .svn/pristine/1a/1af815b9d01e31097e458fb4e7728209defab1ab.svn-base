import React, { useContext } from 'react';
import { Button, Tooltip } from 'components/ui';
import { FaRegSquarePlus } from 'react-icons/fa6';
import SchedulerContext from 'views/Scheduling/Scheduler/context/SchedulerContext';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';
import { operationTypesEnum } from 'views/Scheduling/Scheduler/enum';

function InsertByStartTimeToolbar() {
  /* CONTEXT */
  const { secondaryTableSelectedRows, executeOperation } =
    useContext(SchedulerContext);

  /* EVENT HANDLERS */
  const handleInsert = () => {
    try {
      executeOperation({
        operation: operationTypesEnum.INSERT_NTC_BY_START_TIME,
      });
    } catch (error) {
      openNotification('danger', 'Something went wrong while inserting NTC');
      console.error(error);
    }
  };
  return (
    <>
      <div className="bg-gray-700 bg-opacity-50 flex gap-0.5 p-0.5 rounded-lg border border-gray-600">
        <Tooltip title="Insert">
          <Button
            className="hover:!bg-teal-800 transition-all !h-8 !w-8"
            variant="plain"
            size="sm"
            icon={<FaRegSquarePlus className="text-base" />}
            disabled={secondaryTableSelectedRows.length === 0}
            onClick={handleInsert}
          />
        </Tooltip>
      </div>
    </>
  );
}

export default InsertByStartTimeToolbar;
