import { Button, Card, Dialog, RangeCalendar } from 'components/ui';
import DatePickerRange from 'components/ui/DatePicker/DatePickerRange';
import React, { useEffect, useState } from 'react';
import {
  isChannelSelected,
  openNotification,
} from 'views/Controls/GLOBALFUNACTION';
import ReportsTable from 'views/Controls/ReportsTable/ReportsTable';
import { useSelector } from 'react-redux';
import { GrClose } from 'react-icons/gr';
import { hideStackedSideNav_secondary } from 'views/Scheduling/general';
import { convertDateToYMD } from 'components/validators';
import { apiCallstoreprocedure } from 'services/CommonService';
import './epg.css';
import Loader from 'views/Controls/Loader';
import SelectChannelDialog from 'views/Controls/SelectChannelDialog';

/* CONSTANTS */
let EXPORT_FILE_NAME = 'EPG';

function Epg() {
  /* STATES */
  const [tableData, setTableData] = useState([]);
  const [managedColumns, setManagedColumns] = useState([]);
  const [originalColumns, setOriginalColumns] = useState([]);
  const [defaultGroupByColumns, setDefaultGroupByColumns] = useState([]);
  const [initialLoad, setInitialLoad] = useState(true);
  const [datesRange, setDatesRange] = useState([null, null]);
  const [showLoader, setShowLoader] = useState(false);
  const channel = useSelector((state) => state.locale.selectedChannel);

  /* USE EFFECTS */
  useEffect(() => {
    try {
      (async () => {
        if (datesRange && datesRange[0] && datesRange[1]) {
          hideStackedSideNav_secondary();
          setInitialLoad(false);
          setShowLoader(true);
          GetEPGData();
          setShowLoader(false);
        }
      })();
    } catch (error) {
      console.error(error);
      resetState();
    }
  }, [datesRange, channel]);

  useEffect(() => {
    try {
      if (tableData.length > 0) {
        const columns = Object.keys(tableData[0]).map((key) => ({
          header: key,
          accessorKey: key,
        }));
        setManagedColumns(columns);
        setOriginalColumns(columns);
        setDefaultGroupByColumns([
          {
            value: columns[0]?.accessorKey,
            label: columns[0]?.accessorKey,
          },
        ]);
      }
    } catch (error) {
      console.error(error);
    }
  }, [tableData]);

  /* EVENT HANDLERS */
  const handleInitialDialogClose = () => {
    try {
      setInitialLoad(false);
    } catch (error) {
      console.error(error);
    }
  };

  /* HELPER FUNCTIONS */
  const GetEPGData = () => {
    try {
      (async () => {
        const response = await apiCallstoreprocedure('Sp_EPG_Generation', {
          par_LocationCode: channel.LocationCode,
          par_ChannelCode: channel.ChannelCode,
          par_FromDate: convertDateToYMD(datesRange[0]),
          par_ToDate: convertDateToYMD(datesRange[1]),
        });

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
  };

  const resetState = () => {
    try {
      setInitialLoad(true);
      setDatesRange([null, null]);
      setTableData([]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="h-full flex gap-4 flex-col">
        <div className="flex justify-between items-center mb-2">
          <h3>EPG</h3>
          <div id="date-picker-range-container" className="w-1/5">
            <DatePickerRange
              placeholder="Select dates range"
              size="sm"
              onChange={(e) => {
                if (e[0] === null && e[1] === null) {
                  resetState();
                } else {
                  setDatesRange(e);
                }
              }}
              value={datesRange}
              clearable={true}
              disabled={
                !isChannelSelected(channel) || (datesRange[0] && datesRange[1])
              }
              onDropdownOpen={() => resetState()}
            />
          </div>
        </div>
        <Card bordered={false} className="grow" bodyClass="h-full p-3">
          <ReportsTable
            tableData={tableData}
            tableName={'epgReport'}
            originalColumns={originalColumns}
            managedColumns={managedColumns}
            setManagedColumns={setManagedColumns}
            exportFileName={EXPORT_FILE_NAME}
            defaultGroupByColumns={defaultGroupByColumns}
            columnsToFormatInINR={['BalancedAmount', 'TotalAmount']}
          />
        </Card>
      </div>
      <Dialog
        isOpen={isChannelSelected(channel) && initialLoad}
        bodyOpenClassName="overflow-hidden"
        closable={false}
        onClose={handleInitialDialogClose}
      >
        <div className="flex justify-between relative items-center border-b border-gray-200 dark:border-gray-600 pb-4 mb-4">
          <h5>Select Date Range</h5>
          <Button
            shape="circle"
            variant="plain"
            icon={<GrClose className="text-gray-600" />}
            onClick={handleInitialDialogClose}
            className="absolute -top-4 -right-4"
          />
        </div>
        <div className="mx-auto">
          <RangeCalendar
            value={datesRange}
            maxDate={new Date(new Date().setDate(new Date().getDate() + 30))}
            onChange={(e) => setDatesRange(e)}
          />
        </div>
      </Dialog>
      <Loader show={showLoader} />
      <SelectChannelDialog />
    </>
  );
}

export default Epg;
