import { Button, Dialog } from 'components/ui';
import React, { useEffect, useState } from 'react';
import { apiCallstoreprocedure } from 'services/CommonService';
import {
  numberToINRFormat,
  openNotification,
} from 'views/Controls/GLOBALFUNACTION';
import Loader from 'views/Controls/Loader';
import ReportsTable from 'views/Controls/ReportsTable/ReportsTable';
import { SPOTS_TABLE_COLUMNS } from './constants';
import SummaryCard from './SummaryCard';

function SpotsDialog({
  isOpen,
  setIsOpen,
  bookingNumber,
  dealLineItemNo,
  setSelDealLineItemNo,
  currencySymbol,
}) {
  /* STATES */
  const [spots, setSpots] = useState([]);
  const [managedColumns, setManagedColumns] = useState([]);
  const [showLoader, setShowLoader] = useState(false);

  /* USE EFFECTS */
  useEffect(() => {
    (async () => {
      let spots = [];
      try {
        if (isOpen && bookingNumber) {
          setShowLoader(true);
          const response = await apiCallstoreprocedure('GetBookingDetail', {
            BookingNumber: bookingNumber,
            deallineitemno: dealLineItemNo,
          });
          if (response.status === 200) spots = response.data;
          else if (response.status === 204)
            openNotification('info', 'No spots found');
          else
            openNotification(
              'danger',
              'Something went wrong while fetching spots',
            );
        }
      } catch (error) {
        console.error(error);
        openNotification('danger', 'Something went wrong while fetching spots');
      } finally {
        setSpots(spots);
        setShowLoader(false);
      }
    })();
  }, [isOpen, bookingNumber]);

  /* HELPER FUNCTIONS */
  const handleClose = () => {
    setIsOpen(false);
    setSelDealLineItemNo(false);
  };

  const getTotalAmount = () => {
    let total = 0;
    spots.forEach((spot) => {
      total = total + Number(spot.SpotAmount);
    });
    return total;
  };

  return (
    <>
      <Dialog
        isOpen={isOpen}
        onClose={handleClose}
        onRequestClose={handleClose}
        width={'80vw'}
        contentClassName="mt-8 pt-4"
      >
        <div className="flex flex-col h-full justify-between">
          <h5 className="mb-4">Spots</h5>
          <div className="max-h-[65vh] overflow-y-auto">
            <ReportsTable
              tableData={spots}
              originalColumns={SPOTS_TABLE_COLUMNS}
              managedColumns={managedColumns}
              setManagedColumns={setManagedColumns}
              tableName="DealLineItemSpots"
            />
          </div>
          <div className="flex items-center justify-between mt-6">
            <div className="flex gap-3">
              <SummaryCard
                label="Total Amount"
                value={`${currencySymbol} ${numberToINRFormat(
                  getTotalAmount(),
                )}`}
              />
              <SummaryCard label="Spots Count" value={spots.length} />
            </div>
            <Button variant="solid" onClick={handleClose}>
              Close
            </Button>
          </div>
        </div>
      </Dialog>
      <Loader showLoader={showLoader} />
    </>
  );
}

export default SpotsDialog;
