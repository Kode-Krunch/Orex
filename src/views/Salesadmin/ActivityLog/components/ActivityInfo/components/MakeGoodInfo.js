import { Avatar, Badge, Button, Tooltip } from 'components/ui';
import { format } from 'date-fns';
import React, { useContext, useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { LuCalendarX } from 'react-icons/lu';
import { apiCallstoreprocedure } from 'services/CommonService';
import { apiGet_BookinActivityByDate } from 'services/SalesAdminService';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';
import ReportsTable from 'views/Controls/ReportsTable/ReportsTable';
import { additionalInfoTableToolbarOptions } from 'views/Salesadmin/ActivityLog/constants';
import ActivityLogContext from 'views/Salesadmin/ActivityLog/context/ActivityLogContext';

function MakeGoodInfo() {
  /* CONTEXT */
  const { activityInfoData, setActivityInfoData, formState, setShowLoader } =
    useContext(ActivityLogContext);

  /* STATES */
  const [additionalInfoTableData, setAdditionalInfoTableData] = useState([]);
  const [additionalInfoTableColumns, setAdditionalInfoTableColumns] = useState(
    [],
  );
  const [managedColumns, setManagedColumns] = useState([]);

  /* USE EFFECTS */
  useEffect(() => {
    (async () => {
      try {
        if (activityInfoData && formState && formState.booking) {
          setShowLoader(true);
          const response = await apiGet_BookinActivityByDate(
            activityInfoData,
            formState.booking.value,
          );
          if (response.status === 200) {
            setAdditionalInfoTableData(response.data);
            const columns = Object.keys(response.data[0]).map((key) => ({
              accessorKey: key,
              header: key,
            }));
            setAdditionalInfoTableColumns(columns);
          } else if (response.status !== 204) {
            openNotification(
              'danger',
              'Something went wrong while fetching additional information',
            );
          }
          setShowLoader(false);
        }
      } catch (error) {
        setShowLoader(false);
        openNotification(
          'danger',
          'Something went wrong while fetching additional information',
        );
        console.error(error);
      }
    })();
  }, [activityInfoData, formState]);

  /* EVENT HANDLERS */
  const handleClose = () => {
    try {
      setActivityInfoData(null);
      setAdditionalInfoTableData([]);
      setAdditionalInfoTableColumns([]);
      setManagedColumns([]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-3 grow">
      <div className="flex items-center justify-between gap-4">
        <div className="flex gap-3 items-center">
          <Avatar size={33} shape="circle" className="!bg-red-600">
            <LuCalendarX className="text-white" size="md" />
          </Avatar>
          <div>
            <p className="my-1 flex items-center flex-wrap">
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                {activityInfoData.executerName}{' '}
              </span>
              <span className="mx-2">has makegood </span>
              <div className="flex gap-2 items-center py-1 px-2 border border-gray-700 rounded-full">
                <Badge className="bg-red-500" />
                <span className="font-semibold text-gray-100">
                  {activityInfoData.spots} Spots
                </span>
              </div>
              <span className="ml-3 mr-3">
                {format(new Date(activityInfoData.dateTime), 'hh:mm a')}
              </span>
            </p>
          </div>
        </div>
        <Tooltip title="Close Info">
          <Button size="xs" icon={<IoMdClose />} onClick={handleClose} />
        </Tooltip>
      </div>
      <div className="h-[90vh] overflow-y-auto no-scrollbar">
        {additionalInfoTableData.length > 0 ? (
          <div className="-mt-2">
            <ReportsTable
              tableData={additionalInfoTableData}
              tableName={'makegoodActivityAddtionalInfoTable'}
              originalColumns={additionalInfoTableColumns}
              managedColumns={managedColumns}
              setManagedColumns={setManagedColumns}
              exportFile={false}
              columnsToFormatInINR={[]}
              toolbarOptions={additionalInfoTableToolbarOptions}
              externalGlobalFilter={''}
            />
          </div>
        ) : (
          <div className="h-full rounded-md border border-gray-700 flex justify-center items-center">
            No additional infomation to show
          </div>
        )}
      </div>
    </div>
  );
}

export default MakeGoodInfo;
