import { Dialog } from 'components/ui';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { apiCallstoreprocedure } from 'services/CommonService';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';
import Loader from 'views/Controls/Loader';
import { reportsTableEnum } from 'views/Controls/ReportsTable/enums/ReportsTableEnums';
import ReportsTable from 'views/Controls/ReportsTable/ReportsTable';

/* CONSTANTS */
const TOOLBAR_OPTIONS = { groupBy: false, manageColumns: false };

function SpotsDialog({ isOpen, setIsOpen, date, startTime }) {
  /* REDUX */
  const channel = useSelector((state) => state.locale.selectedChannel);

  /* STATES */
  const [spots, setSpots] = useState([]);
  const [columns, setColumns] = useState([]);
  const [managedColumns, setManagedColumns] = useState([]);
  const [showLoader, setShowLoader] = useState(false);

  /* USE EFFECTS */
  useEffect(() => {
    (async () => {
      if (!isOpen || !channel || !startTime || !date) return;
      let spots = [];
      let columns = [];
      try {
        setShowLoader(true);
        const response = await apiCallstoreprocedure('USP_BookSpotAgencyWise', {
          par_LocationCode: channel.LocationCode,
          par_ChannelCode: channel.ChannelCode,
          par_TelecastDate: date,
          Flag: 1,
          par_AgencyCode: 51,
          FPCStartTime: startTime,
        });
        if (response.status === 200 && response.data.length > 0) {
          spots = response.data;
          columns = Object.keys(response.data[0]).map((column) => ({
            accessorKey: column,
            header: column,
          }));
        } else if (response.status === 204)
          openNotification('info', 'No spots found');
        else throw new Error(response);
      } catch (error) {
        console.log(error);
        openNotification('danger', 'Something went wrong while fetching spots');
      } finally {
        setSpots(spots);
        setColumns(columns);
        setShowLoader(false);
      }
    })();
  }, [isOpen, channel, startTime, date]);

  /* EVENT HANDLERS */
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <Dialog
        isOpen={isOpen}
        width="w-70vw"
        onClose={handleClose}
        onRequestClose={handleClose}
      >
        <div className="flex flex-col h-full justify-between">
          <h5 className="mb-4">Spots</h5>
          <div className="h-[70vh] overflow-y-auto">
            <ReportsTable
              tableData={spots}
              tableName={'HomeDashboardSpotsTable'}
              originalColumns={columns}
              tableType={reportsTableEnum.tableTypes.DEFAULT}
              managedColumns={managedColumns}
              exportFile={false}
              setManagedColumns={setManagedColumns}
              columnsToFormatInINR={[]}
              toolbarOptions={TOOLBAR_OPTIONS}
            />
          </div>
        </div>
      </Dialog>
      <Loader showLoader={showLoader} />
    </>
  );
}

export default SpotsDialog;
