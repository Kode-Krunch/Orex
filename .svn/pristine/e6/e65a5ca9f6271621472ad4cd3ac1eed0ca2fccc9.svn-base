import { useState } from 'react';
import './index.css';
import ReportsTable from 'views/Controls/ReportsTable/ReportsTable';

/* CONSTANTS */
const TABLE_COLUMNS = [
  {
    header: 'Video Clip',
    accessorKey: 'FileName',
  },
  {
    header: 'Title',
    accessorKey: 'Title',
  },
  {
    header: 'Time',
    accessorKey: 'Time',
  },
  {
    header: 'Actual Duration',
    accessorKey: 'ActualDuration',
  },
];

function ImportedDataSummary({ data }) {
  /* STATES */
  const [managedColumns, setManagedColumns] = useState(TABLE_COLUMNS);

  return (
    <>
      <h4 className="mb-4">Imported Spots</h4>
      {data.length > 0 ? (
        <ReportsTable
          tableData={data}
          tableName={'importedSpots'}
          originalColumns={TABLE_COLUMNS}
          managedColumns={managedColumns}
          setManagedColumns={setManagedColumns}
          exportFileName="Imported Spots"
          columnsToFormatInINR={['BalancedAmount', 'TotalAmount']}
        />
      ) : (
        <div className="h-[40vh] flex justify-center items-center">
          No spots found
        </div>
      )}
    </>
  );
}

export default ImportedDataSummary;
