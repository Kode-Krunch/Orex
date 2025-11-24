import { Dialog, Input } from 'components/ui';
import { format } from 'date-fns';
import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { apiCallstoreprocedure } from 'services/CommonService';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';
import ReportsTable from 'views/Controls/ReportsTable/ReportsTable';
import SchedulerContext from 'views/Scheduling/Scheduler/context/SchedulerContext';
import { rowDataTypesEnum } from 'views/Scheduling/Scheduler/enum';
import { COMM_COUNT_COLUMNS, COMM_COUNT_TOOLBAR_OPTIONS } from './constants';
import { theme } from 'twin.macro';
import SummaryTags from './SummaryTags';
const twColor = theme`colors`;

function VerifyCommDialog({ isOpen, setIsOpen }) {
  /* REDUX */
  const channel = useSelector((state) => state.locale.selectedChannel);

  /* CONTEXT */
  const { date, schedulingTableData, setShowLoader } =
    useContext(SchedulerContext);

  /* STATES */
  const [finalCommCount, setFinalCommCount] = useState([]);
  const [managedColumns, setManagedColumns] = useState([]);
  const [externalGlobalFilter, setExternalGlobalFilter] = useState('');

  /* USE EFFECTS */
  useEffect(() => {
    (async () => {
      try {
        setShowLoader(true);
        const bookedCount = await getBookedCount();
        setFinalCommCount(getFinalCommCount(bookedCount));
      } catch (error) {
        console.error(error);
        openNotification(
          'danger',
          'Something went wrong while verifying commercials',
        );
      } finally {
        setShowLoader(false);
      }
    })();
  }, []);

  /* EVENT HANDLERS */
  const handleClose = () => setIsOpen(false);

  /* HELPER FUNCTIONS */
  const getBookedCount = async () => {
    let bookedCount = [];
    const response = await apiCallstoreprocedure('USP_BookedCount', {
      LocationCode: channel.LocationCode,
      ChannelCode: channel.ChannelCode,
      ScheduleDate: format(date, 'yyyy-MM-dd'),
    });
    if (response.status === 200) bookedCount = response.data;
    else if (response.status === 204)
      openNotification('info', 'No booked count found');
    else throw new Error(`USP_BookedCount error: Status ${response.status}`);
    return bookedCount;
  };

  const getFinalCommCount = (bookedCount) => {
    let actualCount = {};
    let finalCommCount = [];
    schedulingTableData.forEach((row) => {
      if (row.F_C_S_P === rowDataTypesEnum.COMMERCIAL) {
        const commKey = `${row.Event_Name}+${row.House_ID}`;
        actualCount[commKey] = actualCount[commKey]
          ? actualCount[commKey] + 1
          : 1;
      }
    });
    bookedCount.forEach((commCount) => {
      const commCountKey = `${commCount.CommercialCaption}+${commCount.HouseID}`;
      finalCommCount.push({
        ...commCount,
        actualCount: actualCount[commCountKey] ? actualCount[commCountKey] : 0,
        bgColor:
          commCount.HouseIDCount !== actualCount[commCountKey]
            ? twColor.red['600']
            : '',
      });
    });
    return finalCommCount;
  };

  /* CONSTANTS */
  const totalBookingsCount = finalCommCount.reduce(
    (sum, item) => sum + item.HouseIDCount,
    0,
  );
  const totalActualCommCount = finalCommCount.reduce(
    (sum, item) => sum + item.actualCount,
    0,
  );

  return (
    <Dialog
      isOpen={isOpen}
      width={1000}
      onClose={handleClose}
      onRequestClose={handleClose}
      contentClassName="mt-8"
    >
      <div className="flex flex-col h-full justify-between">
        <div className="flex items-center justify-between mr-4">
          <div>
            <h5>Verify Commercials</h5>
            <div className="flex gap-3 mt-1">
              <SummaryTags
                label="Total Booked"
                value={totalBookingsCount}
                badgeColor="bg-green-600"
              />
              <SummaryTags
                label="Total Logged"
                value={totalActualCommCount}
                badgeColor="bg-green-600"
              />
            </div>
          </div>
          <Input
            placeholder="Search"
            size="sm"
            value={externalGlobalFilter}
            className="w-60"
            onChange={(event) => setExternalGlobalFilter(event.target.value)}
          />
        </div>
        <div className="h-[70vh] overflow-y-auto">
          <ReportsTable
            tableData={finalCommCount}
            originalColumns={COMM_COUNT_COLUMNS}
            toolbarOptions={COMM_COUNT_TOOLBAR_OPTIONS}
            managedColumns={managedColumns}
            setManagedColumns={setManagedColumns}
            exportFileName="COMMERCIAL_COUNT"
            columnsToFormatInINR={[]}
            tableName="COMMERCIAL_COUNT"
            externalGlobalFilter={externalGlobalFilter}
          />
        </div>
      </div>
    </Dialog>
  );
}

export default VerifyCommDialog;
