import { Button, Tooltip } from 'components/ui';
import React, { useContext, useEffect, useState } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';
import SchedulerContext from 'views/Scheduling/Scheduler/context/SchedulerContext';
import { operationTypesEnum } from 'views/Scheduling/Scheduler/enum';
import SelectAllButton from './SelectAllButton';
import RemoveRowsDialog from '../DraggableTable/Cell/components/RemoveRowsDialog';

function BottomToolbar({ rotationInfoTableData }) {
  /* CONTEXT */
  const {
    schedulingTableSelectedRows,
    setSchedulingTableSelectedRows,
    executeOperation,
  } = useContext(SchedulerContext);

  /* STATES */
  const [isAllRowsSelected, setIsAllRowsSelected] = useState(false);
  const [isRemoveRowsDialogOpen, setIsRemoveRowsDialogOpen] = useState(false);

  /* EVENT HANDLERS */
  const handleRemoveRows = () => {
    try {
      if (schedulingTableSelectedRows.length === 1) {
        executeOperation({
          operation: operationTypesEnum.REMOVE_ROWS,
          rowsToRemove: schedulingTableSelectedRows,
        });
        openNotification('success', 'Events removed successfully');
      } else setIsRemoveRowsDialogOpen(true);
    } catch (error) {
      openNotification('danger', 'Something went wrong while deleting events');
      console.error(error);
    }
  };

  const handleSelectAll = () => {
    try {
      if (schedulingTableSelectedRows.length === rotationInfoTableData.length) {
        setSchedulingTableSelectedRows([]);
        setIsAllRowsSelected(false);
      } else {
        setSchedulingTableSelectedRows(rotationInfoTableData);
        setIsAllRowsSelected(true);
      }
    } catch (error) {
      openNotification(
        'danger',
        'Something went wrong while selecting all events',
      );
      console.error(error);
    }
  };

  /* USE EFFECTS */
  useEffect(() => {
    try {
      if (schedulingTableSelectedRows.length === rotationInfoTableData.length) {
        setIsAllRowsSelected(true);
      } else {
        setIsAllRowsSelected(false);
      }
    } catch (error) {
      console.error(error);
    }
  }, [rotationInfoTableData, schedulingTableSelectedRows]);

  return (
    <div className="bg-gray-700 bg-opacity-50 flex gap-0.5 p-0.5 rounded-lg border border-gray-600">
      <Tooltip title="Delete">
        <Button
          className="hover:!bg-red-700 transition-all !h-8 !w-8"
          variant="plain"
          size="sm"
          icon={<RiDeleteBin6Line className="text-[1.1rem] -mt-[0.2rem]" />}
          disabled={schedulingTableSelectedRows.length === 0}
          onClick={handleRemoveRows}
        />
      </Tooltip>
      <SelectAllButton
        isAllRowsSelected={isAllRowsSelected}
        handleSelectAll={handleSelectAll}
      />
      <RemoveRowsDialog
        isDialogOpen={isRemoveRowsDialogOpen}
        setIsDialogOpen={setIsRemoveRowsDialogOpen}
        selectedRows={schedulingTableSelectedRows}
        setSelectedRows={setSchedulingTableSelectedRows}
      />
    </div>
  );
}

export default BottomToolbar;
