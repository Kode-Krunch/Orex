import { Button, Tabs } from 'components/ui';
import TabContent from 'components/ui/Tabs/TabContent';
import TabList from 'components/ui/Tabs/TabList';
import TabNav from 'components/ui/Tabs/TabNav';
import React, { useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { FaRegCircleCheck } from 'react-icons/fa6';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdOutlineDashboard } from 'react-icons/md';
import ReportsTable from 'views/Controls/ReportsTable/ReportsTable';

/* CONSTANTS */
const COLUMNS = [
  {
    accessorKey: 'Status',
    header: 'Status',
  },
  {
    accessorKey: 'TelecastDate',
    header: 'Telecast Date',
  },
  {
    accessorKey: 'StartTime',
    header: 'Start Time',
  },
  {
    accessorKey: 'EndTime',
    header: 'End Time',
  },
  {
    accessorKey: 'ContentName',
    header: 'Content Name',
  },
  {
    accessorKey: 'Episode',
    header: 'Episode',
  },
  {
    accessorKey: 'Season',
    header: 'Season',
  },
  {
    accessorKey: 'EpisodeNumber',
    header: 'EpisodeNumber',
  },
  {
    accessorKey: 'orginaldate',
    header: 'Original Date',
  },
  {
    accessorKey: 'Duration',
    header: 'Duration',
  },
];
const TOOLBAR_OPTIONS = { groupBy: false, manageColumns: false };

function Tables({ fileArray, successArray, failedArray, setShowTables }) {
  /* STATES */
  const [managedColumns, setManagedColumns] = useState([]);

  return (
    <>
      <div className="flex justify-between items-center -mb-1">
        <h5>Content Details</h5>
        <Button
          icon={<MdOutlineDashboard />}
          onClick={() => setShowTables(false)}
          size="sm"
          variant="solid"
        >
          {'View Summary'}
        </Button>
      </div>
      <Tabs defaultValue="all">
        <TabList>
          <TabNav value="all" icon={<GiHamburgerMenu />}>
            All ({fileArray.length})
          </TabNav>
          <TabNav value="success" icon={<FaRegCircleCheck />}>
            Success ({successArray.length})
          </TabNav>
          <TabNav value="failed" icon={<AiOutlineCloseCircle />}>
            Failed ({failedArray.length})
          </TabNav>
        </TabList>
        <div className="p-4">
          <TabContent value="all">
            <ReportsTable
              tableData={fileArray}
              originalColumns={COLUMNS}
              managedColumns={managedColumns}
              setManagedColumns={setManagedColumns}
              toolbarOptions={TOOLBAR_OPTIONS}
              externalGlobalFilter=""
              exportFileName="Weekly FPC All Contents"
              columnsToFormatInINR={[]}
              tableName="WeeklyFPCAllContents"
              hideMaxPageSelector={true}
            />
          </TabContent>
          <TabContent value="success">
            <ReportsTable
              tableData={successArray}
              originalColumns={COLUMNS}
              managedColumns={managedColumns}
              setManagedColumns={setManagedColumns}
              toolbarOptions={TOOLBAR_OPTIONS}
              externalGlobalFilter=""
              exportFileName="Weekly FPC Success Contents"
              columnsToFormatInINR={[]}
              tableName="WeeklyFPCSuccessContents"
              hideMaxPageSelector={true}
            />
          </TabContent>
          <TabContent value="failed">
            <ReportsTable
              tableData={failedArray}
              originalColumns={COLUMNS}
              managedColumns={managedColumns}
              setManagedColumns={setManagedColumns}
              toolbarOptions={TOOLBAR_OPTIONS}
              externalGlobalFilter=""
              exportFileName="Weekly FPC Failed Contents"
              columnsToFormatInINR={[]}
              tableName="WeeklyFPCFailedContents"
              hideMaxPageSelector={true}
            />
          </TabContent>
        </div>
      </Tabs>
    </>
  );
}

export default Tables;
