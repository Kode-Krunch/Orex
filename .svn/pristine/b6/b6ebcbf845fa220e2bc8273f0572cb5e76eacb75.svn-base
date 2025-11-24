import { Button, DatePicker, Dialog } from 'components/ui';
import React, { useState } from 'react';
import { getDistinctSums } from './utils';
import CommSummary from './CommSummary';
import { apipostbookingdetails } from 'services/DealServices';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';

function MakeGoodDialog({ isOpen, setIsOpen, selRows, resetData }) {
  /* STATES */
  const [date, setDate] = useState(null);

  /* CONSTANTS */
  const distinctSums = getDistinctSums(selRows);

  /* EVENT HANDLERS */
  const handleConfirm = async () => {
    const finalData = selRows.map((item) => ({
      Id: item.Id,
      CommercialCode: 0,
      BookingStatus: '',
      SpotTypeCode: item.SpotTypeCode,
    }));
    try {
      const resp = await apipostbookingdetails('MAKEGOOD', finalData, 0);
      if (resp.status === 200) {
        setIsOpen(false);
        resetData();
        openNotification('success', 'Spot MakeGood Reschedule Successfully');
        document.getElementById('missedSpots').click();
      }
    } catch (error) {
      console.error(error);
      if (error.response.status === 500)
        openNotification('danger', 'Server Error.');
    }
  };

  return (
    <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <h3 className="text-xl font-bold mb-4">Make Good Spots</h3>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          New Date <span className="text-red-500">*</span>
        </label>
        <DatePicker
          minDate={new Date()}
          maxDate={
            selRows.length > 0
              ? new Date(selRows[0].DealPeriodToDate)
              : undefined
          }
          placeholder="Select"
          value={date}
          onChange={setDate}
          clearable={false}
          size="sm"
        />
      </div>
      <div className="mb-6 max-h-[30vh] overflow-auto flex flex-col gap-2">
        {distinctSums.map((item, index) => (
          <CommSummary comm={item} key={index} />
        ))}
      </div>
      <div className="flex justify-end gap-3">
        <Button
          variant="solid"
          onClick={handleConfirm}
          size="sm"
          disabled={!date}
        >
          Confirm
        </Button>
      </div>
    </Dialog>
  );
}

export default MakeGoodDialog;
