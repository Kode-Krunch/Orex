import { Dialog } from 'components/ui';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { apiCallstoreprocedure } from 'services/CommonService';
import { openNotification } from '../GLOBALFUNACTION';
import Loader from '../Loader';
import ReportsTable from '../ReportsTable/ReportsTable';

function SpotsDialog({ isOpen, setIsOpen, date, brandCode }) {
  /* REDUX */
  const agencyCode = useSelector((state) => state.auth.user.AgencyCode);
  const channel = useSelector((state) => state.locale.selectedChannel);

  /* STATES */
  const [tableData, setTableData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [managedColumns, setManagedColumns] = useState([]);
  const [showLoader, setShowLoader] = useState(false);

  /* EVENT HANDLERS */
  const handleClose = () => setIsOpen(false);

  useEffect(() => {
    if (!isOpen || !agencyCode || !brandCode || !channel || !date) return;
    (async () => {
      let tableData = [],
        columns = [];
      try {
        setShowLoader(true);
        const response = await apiCallstoreprocedure(
          'USP_AG_BrandwiseWeeklySpotDetail',
          {
            par_LocationCode: channel.LocationCode,
            par_ChannelCode: channel.ChannelCode,
            par_FromDate: format(date, 'yyyy-MM-dd'),
            BrandCode: brandCode,
            AgencyCode: agencyCode,
          },
        );
        if (response.status === 200) {
          tableData = response.data;
          columns = response.data[0]
            ? Object.keys(response.data[0]).map((column) => ({
                accessorKey: column,
                header: column,
              }))
            : [];
        } else if (response.status === 204)
          openNotification('info', 'No spots found');
        else throw new Error(response);
      } catch (error) {
        console.error(error);
        openNotification('danger', 'Something went wrong while fetching spots');
      } finally {
        setTableData(tableData);
        setColumns(columns);
        setShowLoader(false);
      }
    })();
  }, [isOpen, agencyCode, brandCode, channel, date]);

  return (
    <>
      <Dialog
        isOpen={isOpen}
        width="70vw"
        onClose={handleClose}
        onRequestClose={handleClose}
        contentClassName="mt-8"
      >
        <div className="flex flex-col h-full justify-between">
          <h5 className="mb-4">Spots</h5>
          <div className="h-[80vh] overflow-y-auto">
            <ReportsTable
              tableData={tableData}
              originalColumns={columns}
              managedColumns={managedColumns}
              setManagedColumns={setManagedColumns}
              exportFileName="SpotsTable"
              columnsToFormatInINR={[]}
              tableName="AgencyDashboardSpotsDialogTable"
            />
          </div>
        </div>
      </Dialog>
      <Loader showLoader={showLoader} />
    </>
  );
}

export default SpotsDialog;
