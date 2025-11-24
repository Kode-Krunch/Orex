import { Card, DatePicker } from 'components/ui';
import React, { useEffect, useState } from 'react';
import { apiGetuserformaccess } from 'services/MasterService';
import {
  FORMATDATE_FOR_EVERY,
  openNotification,
} from 'views/Controls/GLOBALFUNACTION';
import HeaderExtra from 'views/Controls/HeaderExtra';
import ReportsTable from 'views/Controls/ReportsTable/ReportsTable';
import { convertDateToYMD } from 'components/validators';
import { hideStackedSideNav_secondary } from 'views/Scheduling/general';
const UserActivityMaster = () => {
  const [tableData, setTableData] = useState(['']);
  const [tableDataFilter, setTableDataFilter] = useState(['']);
  const [UserActivityColumns, setUserActivityColumns] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [managedColumns, setManagedColumns] = useState([]);
  const [date, setDate] = useState(null);
  console.log(convertDateToYMD(date));
  hideStackedSideNav_secondary();
  useEffect(() => {
    Getuserformaccess(convertDateToYMD(date));
  }, [date]);

  const Getuserformaccess = async (date) => {
    try {
      const resp = await apiGetuserformaccess(date);
      if (resp.status == 200) {
        setTableData(resp.data);
        setTableDataFilter(resp.data);
        const columns1 = [];
        Object.keys(resp.data[0]).forEach((key, index) => {
          if (
            !Array.isArray(resp.data[0][key]) &&
            typeof resp.data[0][key] !== 'object'
          ) {
            if (key == 'CreatedOn') {
              columns1.push({
                accessorKey: key,
                header: key,
                cell: (props) => {
                  const row = props.row.original;
                  return (
                    <div className="flex items-center">
                      <span className="ml-2 rtl:mr-2 ">
                        {FORMATDATE_FOR_EVERY(row.CreatedOn)}
                      </span>
                    </div>
                  );
                },
              });
              columns1.push({
                accessorKey: 'Time',
                header: 'Time',
                cell: (props) => {
                  const row = props.row.original;
                  const options = {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true,
                  };
                  return (
                    <div className="flex items-center">
                      <span className="ml-2 rtl:mr-2 ">
                        {new Date(row?.CreatedOn).toLocaleString(
                          'en-US',
                          options,
                        )}
                      </span>
                    </div>
                  );
                },
              });
            } else {
              columns1.push({
                accessorKey: key,
                header: key,
              });
            }
          }
        });
        setUserActivityColumns(columns1);
      } else if (resp.status == 204) {
        setTableData([]);
        setTableDataFilter([]);
        setUserActivityColumns([]);
      }
    } catch (error) {
      setTableData([]);
      setTableDataFilter([]);
      openNotification('warning', 'Data Not Found');
    }
  };

  return (
    <Card
      header={<HeaderExtra />}
      headerExtra={
        <div className="flex justify-between items-start w-full">
          <div className="flex-grow max-w-xs">
            <DatePicker
              value={date}
              onChange={(e) => setDate(e)}
              defaultView="monthOnly"
              inputFormat="MM-YYYY"
            />
          </div>
        </div>
      }
    >
      <div></div>
      <ReportsTable
        tableData={tableDataFilter}
        tableName={`User Activity Master`}
        originalColumns={UserActivityColumns}
        externalGlobalFilter={globalFilter}
        managedColumns={managedColumns}
        setManagedColumns={setManagedColumns}
        exportFileName={`User Activity Master`}
        columnsToFormatInINR={[]}
      />
    </Card>
  );
};

export default UserActivityMaster;
