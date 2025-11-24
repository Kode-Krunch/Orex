import { Dialog, Progress, Spinner } from 'components/ui';
import { format } from 'date-fns';
import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { IoMdCloseCircle } from 'react-icons/io';

function BulkSaveDialogProgress({
  isOpen,
  setIsOpen,
  savedFpcDates,
  setSavedFpcDates,
  missedFpcDates,
  setMissedFpcDates,
  isSaveComplete,
  setIsSaveComplete,
  progressPercent,
  setProgressPercent,
  setDateRange,
}) {
  return (
    <Dialog
      width={600}
      isOpen={isOpen}
      onClose={() => {
        setIsOpen(false);
        setIsSaveComplete(false);
        setProgressPercent(0);
        setSavedFpcDates([]);
        setMissedFpcDates([]);
        setDateRange([null, null]);
      }}
    >
      <h5 className="mb-4">Bulk Saving</h5>
      <div className="flex gap-4">
        {!isSaveComplete && <Spinner size={30} color="green-500" />}
        <Progress percent={progressPercent} color="green-500" />
      </div>
      <div className="grid grid-cols-2 gap-3 mt-5 h-[40vh] overflow-y-auto">
        <div className="border-r border-r-gray-600 pr-2">
          <h6 className="border-b border-b-gray-700 pb-2">Saved Dates</h6>
          {savedFpcDates.length > 0 ? (
            <>
              {savedFpcDates.map((date) => (
                <div className="my-4 border border-gray-700 bg-gray-600 p-2 rounded-lg text-white flex items-center justify-between">
                  <p>{format(date, 'dd MMM, yyyy')}</p>
                  <FaCheckCircle className="text-green-500" />
                </div>
              ))}
            </>
          ) : (
            <div className="flex items-center justify-center mt-10">
              No dates to show
            </div>
          )}
        </div>
        <div>
          <h6 className="border-b border-b-gray-700 pb-2">Missed Dates</h6>
          {missedFpcDates.length > 0 ? (
            <>
              {missedFpcDates.map((date) => (
                <div className="my-4 border border-gray-700 bg-gray-600 p-2 rounded-lg text-white flex items-center justify-between">
                  <p>{format(date, 'dd MMM, yyyy')}</p>
                  <IoMdCloseCircle className="text-red-500 text-base" />
                </div>
              ))}
            </>
          ) : (
            <div className="flex items-center justify-center mt-10">
              No dates to show
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-1.5 items-center mt-12">
        {isSaveComplete ? (
          <p>Save complete</p>
        ) : (
          <>
            <p>Bulk saving in progress. This may take a while</p>
            <p>Please do not close this window or refresh the page</p>
          </>
        )}
      </div>
    </Dialog>
  );
}

export default BulkSaveDialogProgress;
