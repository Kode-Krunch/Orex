import { Button, Checkbox, Dialog } from 'components/ui';
import DatePickerRange from 'components/ui/DatePicker/DatePickerRange';
import React, { useState } from 'react';
import { AiOutlineSave } from 'react-icons/ai';
import { formatDateToDDMMMYYYY } from 'views/Controls/GLOBALFUNACTION';
import WarningDialog from 'views/Controls/WarningDialog';

/* CONSTANTS */
const dateFormat = 'DD MMM YYYY';

function SaveAsFpcDaysDialog({
  isDialogOpen,
  setIsDialogOpen,
  startDate,
  endDate,
  handleDateChange,
  selectedWeekdays,
  setSelectedWeekdays,
  handleSaveASFPC,
}) {
  /* STATES */
  const [isConfirmSaveDialogOpen, setIsConfirmSaveDialogOpen] = useState(false);

  return (
    <Dialog
      width={600}
      isOpen={isDialogOpen}
      onClose={() => setIsDialogOpen(false)}
    >
      <h3 className="mb-5">FPC save as day wise</h3>
      <div className="grid grid-cols-6 md:grid-cols-6 gap-1">
        <div className="col-span-6">
          <label>Date Range</label>
        </div>
        <div className="col-span-6">
          <DatePickerRange
            minDate={new Date()}
            value={[startDate, endDate]}
            onChange={handleDateChange}
            inputFormat={dateFormat}
            size="sm"
          />
        </div>
        <div className="col-span-3"></div>
        <div className="col-span-6   mt-6">
          <Checkbox.Group
            value={selectedWeekdays}
            onChange={(newValues) => setSelectedWeekdays(newValues)}
          >
            <Checkbox value="6">SU</Checkbox>
            <Checkbox value="0">MO </Checkbox>
            <Checkbox value="1">TU</Checkbox>
            <Checkbox value="2">WS</Checkbox>
            <Checkbox value="3">TH</Checkbox>
            <Checkbox value="4">FR</Checkbox>
            <Checkbox value="5">SA</Checkbox>
          </Checkbox.Group>
        </div>
      </div>
      <div className="mt-5">
        <Button
          variant="solid"
          type="button"
          className="btnEdit"
          size="sm"
          icon={<AiOutlineSave />}
          onClick={() => setIsConfirmSaveDialogOpen(true)}
        >
          Save
        </Button>
      </div>
      <WarningDialog
        isDialogOpen={isConfirmSaveDialogOpen}
        title="Confirm?"
        description={`Are you sure want to Save As FPC for ${formatDateToDDMMMYYYY(
          startDate,
        )} to ${formatDateToDDMMMYYYY(endDate)}?`}
        submitButtonTitle="Yes"
        handleDialogSubmit={handleSaveASFPC}
        handleDialogClose={() => setIsConfirmSaveDialogOpen(false)}
      />
    </Dialog>
  );
}

export default SaveAsFpcDaysDialog;
