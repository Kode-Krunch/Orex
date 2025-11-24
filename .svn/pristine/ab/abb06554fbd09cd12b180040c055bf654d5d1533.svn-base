import { Card } from 'components/ui';
import React, { useEffect, useState } from 'react';
import { apiCallstoreprocedure_WithOutParamEntity } from 'services/DealServices';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';
import ReportsTable from 'views/Controls/ReportsTable/ReportsTable';

/* CONSTANTS */
let TABLE_COLUMNS = [
  { header: 'Client', accessorKey: 'Client' },
  { header: 'Agency', accessorKey: 'Agency' },
  { header: 'Deal Code', accessorKey: 'DealCode' },
  { header: 'Pay Route', accessorKey: 'PayRoute' },
  { header: 'Deal Type', accessorKey: 'DealType' },
  { header: 'Start Date', accessorKey: 'StartDate' },
  { header: 'End Date', accessorKey: 'EndDate' },
  { header: 'Total Amount', accessorKey: 'TotalAmount' },
  { header: 'Balanced Amount', accessorKey: 'BalancedAmount' },
];
let EXPORT_FILE_NAME = 'Deal_Summary_Report';

function DealSummary() {
  /* STATES */
  const [tableData, setTableData] = useState([]);
  const [managedColumns, setManagedColumns] = useState(TABLE_COLUMNS);

  /* USE EFFECTS */
  useEffect(() => {
    try {
      (async () => {
        const response = await apiCallstoreprocedure_WithOutParamEntity(
          'USP_Sch_DealSummaryReport',
        );
        if (response) {
          if (response.status === 200) {
            setTableData(response.data);
          } else if (response.status === 204) {
            setTableData([]);
          } else {
            openNotification(
              'danger',
              `Something went wrong. Server responded with status code ${response.status}.`,
            );
          }
        } else {
          openNotification('danger', 'Something went wrong');
        }
      })();
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div className="h-full flex gap-4 flex-col">
      <h4>Deal Summary</h4>
      <Card bordered={false} className="grow" bodyClass="h-full p-3">
        <ReportsTable
          tableData={tableData}
          tableName={'dealSummary'}
          originalColumns={TABLE_COLUMNS}
          managedColumns={managedColumns}
          setManagedColumns={setManagedColumns}
          exportFileName={EXPORT_FILE_NAME}
          columnsToFormatInINR={['BalancedAmount', 'TotalAmount']}
        />
      </Card>
    </div>
  );
}

export default DealSummary;
