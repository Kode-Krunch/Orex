import { StickyFooter } from 'components/shared';
import { Button } from 'components/ui';
import React, { useState } from 'react';
import {
  getFieldTotal,
  numberToINRFormat,
} from 'views/Controls/GLOBALFUNACTION';
import WarningDialog from 'views/Controls/WarningDialog';
import ConfirmDropDialog from './ConfirmDropDialog';

function Footer({
  spotsTableData,
  selectedSpots,
  setSelectedSpots,
  setPaginationState,
  setRowSelection,
  setSelectedFilteredRow,
  setShowLoader,
}) {
  /* STATES */
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
  const [isConfirmDropDialogOpen, setIsConfirmDropDialogOpen] = useState(false);

  /* HELPER FUNCTIONS */
  const handleReset = () => {
    try {
      setRowSelection({});
      setSelectedSpots([]);
      setPaginationState({
        pageIndex: 0,
        pageSize: 10,
      });
      setIsResetDialogOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <StickyFooter
        className="-mx-8 px-8 flex items-center justify-between py-4 pt-2 pb-2"
        stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
      >
        <div className="flex items-center gap-3">
          {selectedSpots.length > 0 && (
            <Button
              onClick={() => setIsConfirmDropDialogOpen(true)}
              variant="solid"
              type="submit"
              size="sm"
            >
              Proceed to Drop
            </Button>
          )}
          <Button onClick={() => setIsResetDialogOpen(true)} size="sm">
            Reset
          </Button>
        </div>
        <div
          id="myblock"
          className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-6 p-4 pt-0 pb-1 bg-gray-100 dark:bg-gray-800"
        >
          <div className="flex flex-col lbl">
            <span className="font-medium text-gray-600 dark:text-gray-300 text-sm">
              Total Spots
            </span>
            <span className="font-medium text-lg text-teal-500">
              {spotsTableData.length}
            </span>
          </div>
          <div className="flex flex-col lbl">
            <span className="font-medium text-gray-600 dark:text-gray-300 text-sm">
              Selected Spots
            </span>
            <span className="font-medium text-lg text-teal-500">
              {selectedSpots.length}
            </span>
          </div>
          <div className="flex flex-col lbl">
            <span className="font-medium text-gray-600 dark:text-gray-300 text-sm">
              Duration
            </span>
            <span className="font-medium text-lg text-teal-500">
              {numberToINRFormat(getFieldTotal(selectedSpots, 'Duration'))}
            </span>
          </div>
          <div className="flex flex-col lbl">
            <span className="font-medium text-gray-600 dark:text-gray-300 text-sm">
              Spot Amount
            </span>
            <span className="font-medium text-lg text-teal-500">
              {numberToINRFormat(getFieldTotal(selectedSpots, 'Amount'))}
            </span>
          </div>
        </div>
      </StickyFooter>
      <ConfirmDropDialog
        isConfirmDropDialogOpen={isConfirmDropDialogOpen}
        setIsConfirmDropDialogOpen={setIsConfirmDropDialogOpen}
        selectedSpots={selectedSpots}
        setSelectedFilteredRow={setSelectedFilteredRow}
        setShowLoader={setShowLoader}
      />
      <WarningDialog
        isDialogOpen={isResetDialogOpen}
        title="Reset"
        description={`All the selections will be reset. Are you sure you want to reset?`}
        submitButtonTitle="Reset"
        handleDialogSubmit={handleReset}
        handleDialogClose={() => setIsResetDialogOpen(false)}
      />
    </>
  );
}

export default Footer;
