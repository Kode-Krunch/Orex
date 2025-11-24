import { Card, DatePicker, Input } from 'components/ui';
import DatePickerRange from 'components/ui/DatePicker/DatePickerRange';
import React, { useEffect, useRef, useState } from 'react';
import { numberToINRFormat } from 'views/Controls/GLOBALFUNACTION';
import WarningDialog from '../../../Controls/WarningDialog';

function GenerateCDNoteHeader({ bill, cdnDate, setCDNDate, newRateTotal }) {
  /* STATES */
  const [newDate, setNewDate] = useState(null);
  const [
    isChangeGenerateCDNDateDialogOpen,
    setIsChangeGenerateCDNDateDialogOpen,
  ] = useState(false);

  const cdnDateRef = useRef(null);

  useEffect(() => {
    try {
      if (cdnDateRef.current) {
        if (!cdnDate) {
          cdnDateRef.current.focus();
        } else {
          cdnDateRef.current.blur();
        }
      }
    } catch (error) {
      console.error(error);
    }
  }, [cdnDate]);

  return (
    <>
      <Card bodyClass="grid grid-cols-4 gap-4 p-3">
        <div>
          <p for="client" className="text-white">
            Invoice No
          </p>
          <Input
            className="mt-1"
            disabled
            value={bill.INVOICENO}
            size="sm"
          ></Input>
        </div>
        <div>
          <p for="client" className="text-white">
            Invoice Date
          </p>
          <Input
            className="mt-1"
            disabled
            value={bill.InvoiceDate}
            size="sm"
          ></Input>
        </div>
        <div>
          <p for="client" className="text-white">
            Gross Amount
          </p>
          <Input
            className="mt-1"
            disabled
            value={bill.GrossAmount}
            size="sm"
          ></Input>
        </div>
        <div>
          <p for="client" className="text-white">
            Dates Range
          </p>
          <DatePickerRange
            size="sm"
            disabled
            className="mt-1"
            clearable={false}
            value={[new Date(bill.FromDate), new Date(bill.UptoDate)]}
          />
        </div>
        <div>
          <p for="client" className="text-white">
            Client
          </p>
          <Input
            className="mt-1"
            disabled
            value={bill.ClientName}
            size="sm"
          ></Input>
        </div>
        <div>
          <p for="client" className="text-white">
            Date <span className="text-red-500">*</span>
          </p>
          <DatePicker
            ref={cdnDateRef}
            value={cdnDate}
            placeholder="Select"
            className="mt-1"
            size="sm"
            defaultOpen
            onChange={(date) => {
              if (cdnDate) {
                setNewDate(date);
                setIsChangeGenerateCDNDateDialogOpen(true);
              } else {
                setCDNDate(date);
              }
            }}
            maxDate={new Date(new Date().setDate(new Date().getDate() + 30))}
            minDate={new Date(new Date().setDate(new Date().getDate() - 15))}
          />
        </div>
        <div></div>
        <div className="flex flex-col justify-center">
          <p for="client" className="text-white">
            New Rate Total
          </p>
          <h5>₹&nbsp;{numberToINRFormat(newRateTotal)}</h5>
        </div>
      </Card>
      <WarningDialog
        isDialogOpen={isChangeGenerateCDNDateDialogOpen}
        title="Change Date"
        description={`All the New Rate Amounts will be reset. Are you sure to continue?`}
        submitButtonTitle="Reset"
        handleDialogSubmit={() => {
          setCDNDate(newDate);
          setIsChangeGenerateCDNDateDialogOpen(false);
        }}
        handleDialogClose={() => {
          setNewDate(null);
          setIsChangeGenerateCDNDateDialogOpen(false);
        }}
      />
    </>
  );
}

export default GenerateCDNoteHeader;
