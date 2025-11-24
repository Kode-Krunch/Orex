import React, { useEffect, useState } from 'react';
import SaveCDNoteDialog from './SaveCDNoteDialog';
import { StickyFooter } from 'components/shared';
import { Button, Tooltip } from 'components/ui';
import { IoSaveOutline } from 'react-icons/io5';
import { formatDateToDDMMMYYYY } from 'views/Controls/GLOBALFUNACTION';
import { convertDateToYMD } from 'components/validators';

function SaveCDNoteStickyFooter({
  setIsResetAllNewRateDialogOpen,
  setIsDiscardDialogOpen,
  isSaveDialogOpen,
  setIsSaveDialogOpen,
  firstNewRate,
  newRateTotal,
  cdnDate,
  noteType,
  cdNoteBill,
  spotsWithNewRate,
  remarks,
  setRemarks,
  resetPage,
  channel,
  token,
}) {
  /* STATES */
  const [isDisableSaveBtn, setIsDisableSaveBtn] = useState(true);

  /* USE EFFECTS */
  useEffect(() => {
    if (Array.isArray(spotsWithNewRate)) {
      const isDisable =
        spotsWithNewRate.filter(
          (spot) => spot.NewRateAmount === '-' || spot.NewRateAmount === 0,
        ).length === spotsWithNewRate.length;
      setIsDisableSaveBtn(isDisable);
    }
  }, [spotsWithNewRate]);

  return (
    <StickyFooter
      className="-mx-8 px-8 flex items-center justify-end py-4"
      stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
    >
      <div className="flex gap-3">
        <Tooltip title="Reset New Rate Amounts">
          <Button
            size="sm"
            variant="plain"
            onClick={() => setIsResetAllNewRateDialogOpen(true)}
            disabled={firstNewRate}
          >
            Reset
          </Button>
        </Tooltip>
        <Button
          size="sm"
          onClick={() => {
            setIsDiscardDialogOpen(true);
          }}
        >
          Discard
        </Button>
        <Button
          variant="solid"
          size="sm"
          icon={<IoSaveOutline />}
          onClick={() => setIsSaveDialogOpen(true)}
          disabled={isDisableSaveBtn}
        >
          Save
        </Button>
      </div>
      <SaveCDNoteDialog
        isSaveDialogOpen={isSaveDialogOpen}
        setIsSaveDialogOpen={setIsSaveDialogOpen}
        noteType={noteType}
        invoiceNo={cdNoteBill.INVOICENO}
        clientName={cdNoteBill.ClientName}
        cdNoteDate={formatDateToDDMMMYYYY(convertDateToYMD(cdnDate))}
        spotsWithNewRate={spotsWithNewRate}
        newRateTotal={newRateTotal}
        remarks={remarks}
        setRemarks={setRemarks}
        cdNoteBill={cdNoteBill}
        resetPage={resetPage}
        channel={channel}
        token={token}
      />
    </StickyFooter>
  );
}

export default SaveCDNoteStickyFooter;
