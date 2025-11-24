import { Button, Checkbox, Dialog } from 'components/ui';
import React, { useContext, useState } from 'react';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';
import WarningDialog from 'views/Controls/WarningDialog';
import { DELETE_EVENT_OPTIONS } from 'views/Scheduling/Scheduler/constants';
import SchedulerContext from 'views/Scheduling/Scheduler/context/SchedulerContext';
import {
  operationTypesEnum,
  rowDataTypesEnum,
} from 'views/Scheduling/Scheduler/enum';

function DeleteEventsDialog({ isOpen, setIsOpen }) {
  /* CONTEXT */
  const { executeOperation, page } = useContext(SchedulerContext);

  /* STATES */
  const [selectedEventTypes, setSelectedEventTypes] = useState([]);
  const [isConfirmDeleteDialogOpen, setIsConfirmDeleteDialogOpen] =
    useState(false);

  /* EVENT HANDLERS */
  const handleClose = () => setIsOpen(false);

  const handleDelete = () => {
    executeOperation({
      operation: operationTypesEnum.DELETE_EVENTS,
      deleteEventTypes: selectedEventTypes,
    });
    setIsConfirmDeleteDialogOpen(false);
    handleClose();
    openNotification('success', 'Selected events removed successfully');
  };

  /* HELPER FUNCTIONS */
  const getEventNameForEventType = (eventType) => {
    return eventType === rowDataTypesEnum.PROMO
      ? 'Promos'
      : eventType === rowDataTypesEnum.SONG
      ? 'Songs'
      : eventType === rowDataTypesEnum.COMMERCIAL
      ? 'Commercials'
      : eventType === rowDataTypesEnum.NTC
      ? 'NTCs'
      : 'Events';
  };

  const getWarningMessage = () => {
    const isCommercialsSelected = selectedEventTypes.includes(
      rowDataTypesEnum.COMMERCIAL,
    );
    if (isCommercialsSelected) {
      const otherEvents = selectedEventTypes.filter(
        (eventType) => eventType !== rowDataTypesEnum.COMMERCIAL,
      );
      if (otherEvents.length === 0)
        return 'Are you sure you want to drop all Commercials?';
      else
        return `Are you sure you want to delete all ${otherEvents
          .map((eventType) => getEventNameForEventType(eventType))
          .join(', ')} and drop all Commercials?`;
    } else
      return `Are you sure you want to delete all ${selectedEventTypes
        .map((eventType) => getEventNameForEventType(eventType))
        .join(', ')}?`;
  };

  return (
    <>
      <Dialog
        isOpen={isOpen}
        onClose={handleClose}
        onRequestClose={handleClose}
      >
        <h5 className="pb-2 mb-6 border-b border-b-gray-600">Delete All</h5>
        <Checkbox.Group
          value={selectedEventTypes}
          onChange={setSelectedEventTypes}
          className="mb-4 flex gap-4"
        >
          {DELETE_EVENT_OPTIONS[page].map((eventType) => (
            <Checkbox value={eventType} key={eventType} className="text-white">
              {getEventNameForEventType(eventType)}
            </Checkbox>
          ))}
        </Checkbox.Group>
        <div className="text-right mt-6">
          <Button
            variant="solid"
            onClick={() => setIsConfirmDeleteDialogOpen(true)}
          >
            Delete
          </Button>
        </div>
      </Dialog>
      <WarningDialog
        isDialogOpen={isConfirmDeleteDialogOpen}
        title="Discard"
        description={getWarningMessage()}
        descClassName="text-[0.95rem] mb-8"
        secondaryDescription="You can always undo this operation"
        submitButtonTitle="Delete"
        handleDialogSubmit={handleDelete}
        handleDialogClose={() => setIsConfirmDeleteDialogOpen(false)}
      />
    </>
  );
}

export default DeleteEventsDialog;
