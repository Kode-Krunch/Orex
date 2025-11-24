import { Dialog } from 'components/ui';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { apiCallstoreprocedure } from 'services/CommonService';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';
import Loader from 'views/Controls/Loader';
import ReportsTable from 'views/Controls/ReportsTable/ReportsTable';

/* CONSTANTS */
const TOOLBAR_OPTIONS = { groupBy: false, manageColumns: true };

function ContentHistoryDialog({ isOpen, setIsOpen, content }) {
  /* REDUX */
  const channel = useSelector((state) => state.locale.selectedChannel);

  /* STATES */
  const [contentHistory, setContentHistory] = useState([]);
  const [columns, setColumns] = useState([]);
  const [managedColumns, setManagedColumns] = useState([]);
  const [showLoader, setShowLoader] = useState(false);

  /* USE EFFECTS */
  useEffect(() => {
    (async () => {
      let contentHistory = [];
      let columns = [];
      try {
        if (!isOpen || !content) return;
        setShowLoader(true);
        const response = await apiCallstoreprocedure(
          'USP_FPC_ShowContentSchHistory',
          {
            ContentCode: content.ContentCode,
            LocationCode: channel.LocationCode,
            ChannelCode: channel.ChannelCode,
          },
        );
        if (response.status === 200 && response.data.length > 0) {
          contentHistory = response.data;
          columns = Object.keys(response.data[0]).map((column) => ({
            header: column,
            accessorKey: column,
          }));
        } else if (response.status === 204 || response.data.length === 0)
          openNotification('No content history found');
        else
          openNotification(
            'danger',
            'Something went wrong while fetching content history',
          );
      } catch (error) {
        console.error(error);
        openNotification(
          'danger',
          'Something went wrong while fetching content history',
        );
      } finally {
        setContentHistory(contentHistory);
        setColumns(columns);
        setManagedColumns(columns);
        setShowLoader(false);
      }
    })();
  }, [isOpen, content]);

  /* EVENT HANDLERS */
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <Dialog isOpen={isOpen} onClose={handleClose} width={1000}>
        <div className="flex items-center mb-4 gap-4">
          <h5>Content History</h5>
          <h5>-</h5>
          <h6 className="bg-gray-900 border border-gray-700 rounded-full py-1 px-3 w-max mt-0.5">
            {content.ContentName}
          </h6>
        </div>
        <ReportsTable
          tableData={contentHistory}
          tableName="Content History"
          originalColumns={columns}
          managedColumns={managedColumns}
          setManagedColumns={setManagedColumns}
          exportFile={false}
          columnsToFormatInINR={[]}
          toolbarOptions={TOOLBAR_OPTIONS}
          hideMaxPageSelector={true}
        />
      </Dialog>
      <Loader showLoader={showLoader} />
    </>
  );
}

export default ContentHistoryDialog;
