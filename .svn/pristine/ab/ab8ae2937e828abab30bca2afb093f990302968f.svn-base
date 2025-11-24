import { Card } from 'components/ui';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { apiCallstoreprocedure } from 'services/CommonService';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';
import ReportsTable from 'views/Controls/ReportsTable/ReportsTable';
import { BOOKING_DETAILS_TOOLBAR_OPTIONS } from './constants';

function BookingDetails({ dealDetails }) {
  /* REDUX */
  const channel = useSelector((state) => state.locale.selectedChannel);

  /* STATUS */
  const [tableData, setTableData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [managedColumns, setManagedColumns] = useState([]);

  /* USE EFFECTS */
  useEffect(() => {
    (async () => {
      let tableData = [];
      try {
        if (!dealDetails) return;
        const response = await apiCallstoreprocedure(
          'USP_GetBookingsFromDeal',
          {
            LocationCode: channel.LocationCode,
            channelcode: channel.ChannelCode,
            DealNumber: dealDetails.DealNumber,
          },
        );
        if (response.status === 200) {
          tableData = response.data;
          setColumns(
            Object.keys(tableData[0]).map((column) => ({
              accessorKey: column,
              header: column,
            })),
          );
        } else if (response.status === 204)
          openNotification('info', 'No booking details found');
        else
          openNotification(
            'danger',
            'Something went wrong while fetching booking details',
          );
      } catch (error) {
        console.error(error);
        openNotification(
          'danger',
          'Something went wrong while fetching booking details',
        );
      } finally {
        setTableData(tableData);
      }
    })();
  }, [channel, dealDetails]);

  return (
    <Card
      className="h-full col-span-2"
      bordered={false}
      bodyClass="pt-2 pb-3 px-0 h-full flex flex-col"
    >
      <h5 className="mb-3 py-2 px-3 border-b border-dashed border-b-gray-600">
        Booking Details
      </h5>
      <div className="px-3 flex flex-col gap-5 grow h-0">
        {tableData.length > 0 ? (
          <div className="h-full">
            <ReportsTable
              tableData={tableData}
              originalColumns={columns}
              managedColumns={managedColumns}
              setManagedColumns={setManagedColumns}
              exportFileName="UpdateDealBookingDetails"
              toolbarOptions={BOOKING_DETAILS_TOOLBAR_OPTIONS}
            />
          </div>
        ) : (
          <div className="h-full flex justify-center items-center">
            <p>No bookings to show</p>
          </div>
        )}
      </div>
    </Card>
  );
}

export default BookingDetails;
