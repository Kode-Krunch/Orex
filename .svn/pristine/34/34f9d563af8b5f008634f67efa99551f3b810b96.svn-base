import { Button, Dialog } from 'components/ui';
import React, { useContext, useEffect, useState } from 'react';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';
import {
  operationTypesEnum,
  rowDataTypesEnum,
} from 'views/Scheduling/Scheduler/enum';
import SchedulerContext from 'views/Scheduling/Scheduler/context/SchedulerContext';

function RemoveRowsDialog({
  isDialogOpen,
  setIsDialogOpen,
  selectedRows,
  setSelectedRows,
}) {
  /* CONTEXT */
  const { executeOperation, resetAllSelectedRows } =
    useContext(SchedulerContext);

  /* STATES */
  const [selectedRowsByRowDataType, setSelectedRowsByRowDataType] = useState(
    [],
  );

  /* USE EFFECTS */
  useEffect(() => {
    if (isDialogOpen) {
      setSelectedRowsByRowDataType(getSelectedRowsByRowDataType());
    }
  }, [selectedRows, isDialogOpen]);

  /* EVENT HANDLERS */
  const handleClose = () => setIsDialogOpen(false);

  const handleRemoveRows = async () => {
    try {
      executeOperation({
        operation: operationTypesEnum.REMOVE_ROWS,
        rowsToRemove: selectedRows,
      });
      resetAllSelectedRows();
      openNotification(
        'success',
        `${selectedRows.length} events removed successfully`,
      );
    } catch (error) {
      openNotification('danger', 'Something went wrong while removing events');
      setSelectedRows([]);
    } finally {
      handleClose();
    }
  };

  /* HELPER FUNCTIONS */
  function getSelectedRowsByRowDataType() {
    try {
      let selectedRowsByRowDataType = {};
      selectedRows.forEach((row) => {
        if (
          row.F_C_S_P === rowDataTypesEnum.NTC &&
          (row.BookingDetailsID || row.BookingDetailID)
        ) {
          if (Object.keys(selectedRowsByRowDataType).includes('paidNtc')) {
            selectedRowsByRowDataType['paidNtc'].push(row);
          } else {
            selectedRowsByRowDataType['paidNtc'] = [row];
          }
        } else {
          if (Object.keys(selectedRowsByRowDataType).includes(row.F_C_S_P)) {
            selectedRowsByRowDataType[row.F_C_S_P].push(row);
          } else {
            selectedRowsByRowDataType[row.F_C_S_P] = [row];
          }
        }
      });
      return selectedRowsByRowDataType;
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Dialog
      isOpen={isDialogOpen}
      onClose={handleClose}
      onRequestClose={handleClose}
    >
      <h5 className="mb-4">Remove Events</h5>
      <p>Are you sure you want to remove below events?</p>
      <div className="mt-4 flex flex-col gap-4">
        {Object.keys(selectedRowsByRowDataType).map((key) => (
          <div key={key} className="flex items-center gap-2">
            <span className="p-2 bg-gray-600 rounded-full w-7 h-7 flex items-center justify-center text-gray-300">
              {selectedRowsByRowDataType[key].length}
            </span>
            <span>
              {key === rowDataTypesEnum.COMMERCIAL
                ? 'Commercials'
                : key === rowDataTypesEnum.PROMO
                ? 'Promos'
                : key === rowDataTypesEnum.NTC
                ? 'Free NTCs'
                : key === 'paidNtc'
                ? 'Paid NTCs'
                : key === rowDataTypesEnum.SONG
                ? 'Songs'
                : key === rowDataTypesEnum.CONTENT_TERMINATION
                ? 'Content Terminations'
                : key === rowDataTypesEnum.SEGMENT
                ? 'Segments'
                : 'Events'}
            </span>
          </div>
        ))}
      </div>
      <div className="text-right mt-6">
        <Button variant="solid" onClick={handleRemoveRows}>
          Remove
        </Button>
      </div>
    </Dialog>
  );
}

export default RemoveRowsDialog;
