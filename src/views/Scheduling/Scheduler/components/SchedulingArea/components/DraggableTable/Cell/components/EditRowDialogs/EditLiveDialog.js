import { Button, Dialog, Input } from 'components/ui';
import React, { useContext, useState } from 'react';
import {
  autoCompleteTime,
  getFormattedTime,
  openNotification,
} from 'views/Controls/GLOBALFUNACTION';
import SchedulerContext from 'views/Scheduling/Scheduler/context/SchedulerContext';
import { operationTypesEnum } from 'views/Scheduling/Scheduler/enum';

function EditLiveDialog({ isDialogOpen, setIsDialogOpen, row }) {
  /* CONTEXT */
  const { schedulingTableData, executeOperation } =
    useContext(SchedulerContext);

  /* STATES */
  const [duration, setDuration] = useState(row.Duration);

  /* EVENT HANDLERS */
  const handleClose = () => {
    setIsDialogOpen(false);
  };

  const handleSave = async () => {
    try {
      let newTableData = [...schedulingTableData];
      newTableData[row.rowIndex] = {
        ...row,
        Duration: duration,
      };
      await executeOperation({
        operation: operationTypesEnum.UPDATE_TABLE,
        newSchTableData: newTableData,
      });
      openNotification('success', 'Changes saved successfully');
      handleClose();
    } catch (error) {
      console.error(error);
      openNotification('danger', 'Something went wrong while saving changes');
    }
  };

  return (
    <Dialog
      isOpen={isDialogOpen}
      onClose={handleClose}
      onRequestClose={handleClose}
    >
      <h5 className="mb-4">Edit Live Event</h5>
      <div className="max-h-96 overflow-y-auto flex flex-col gap-8">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-white mb-1">Live Event</p>
            <Input size="sm" value={row.Event_Name} disabled={true} />
          </div>
          <div>
            <p className="text-white mb-1">
              Duration <span className="text-red-500">*</span>
            </p>
            <Input
              size="sm"
              value={duration}
              onChange={(event) =>
                setDuration(getFormattedTime(event, duration))
              }
              onBlur={() => setDuration(autoCompleteTime(duration))}
            />
          </div>
        </div>
      </div>
      <div className="text-right mt-6">
        <Button
          variant="solid"
          onClick={handleSave}
          disabled={duration.length < 11}
        >
          Save
        </Button>
      </div>
    </Dialog>
  );
}

export default EditLiveDialog;
