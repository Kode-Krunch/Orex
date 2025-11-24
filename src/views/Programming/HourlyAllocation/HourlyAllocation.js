import { StickyFooter } from 'components/shared';
import { Button, Card, Input } from 'components/ui';
import DatePickerRange from 'components/ui/DatePicker/DatePickerRange';
import { convertDateToYMD } from 'components/validators';
import React, { useEffect, useState } from 'react';
import { AiOutlineSave } from 'react-icons/ai';
import { IoIosAddCircle } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { apiCallstoreprocedure } from 'services/CommonService';
import { apiCreateTraiInventory } from 'services/ProgrammingService';
import EditableTable from 'views/Controls/EditableTable/EditableTable';
import {
  hideCursorLoader,
  openNotification,
  showCursorLoader,
} from 'views/Controls/GLOBALFUNACTION';
import { hideStackedSideNav } from 'views/Scheduling/general';

/* CONSTANTS */
const inventoryValueRegex = /^(?:[0-9][0-9]{0,2}|1[0-9]{3}|2000)$/;

function HourlyAllocation() {
  /* REDUX */
  const channel = useSelector((state) => state.locale.selectedChannel);
  const token = useSelector((state) => state.auth.session.token);

  /* STATES */
  const [dateRange, setDateRange] = useState([null, null]);
  const [inventory, setInventory] = useState('');
  const [tableData, setTableData] = useState([]);
  const [columns, setColumns] = useState([]);

  /* USE EFFECTS */
  useEffect(() => {
    hideStackedSideNav();
    document.querySelector('.page-container').classList.add('!py-2');
  }, []);

  /* EVENT HANDLERS */
  const handleDateChange = async (dateRange) => {
    try {
      setDateRange(dateRange);
      if (dateRange[0] && dateRange[1]) {
        showCursorLoader();
        const response = await apiCallstoreprocedure('USP_ShowInventory', {
          Location: channel.LocationCode,
          Channel: channel.ChannelCode,
          FromDate: convertDateToYMD(dateRange[0]),
          ToDate: convertDateToYMD(dateRange[1]),
        });
        if (response.status === 200) {
          const responseData = response.data;
          if (responseData.length > 0) {
            setTableData(responseData);
            setColumns(
              Object.keys(responseData[0]).map((key) => ({
                accessorKey: key,
                header: key,
                editable: key === 'StartTime' ? false : true,
                className: key === 'StartTime' ? 'font-semibold text-xs' : '',
                inputRegex: inventoryValueRegex,
                inputType: 'number',
                fallbackForEmptyInput: 0,
              })),
            );
          } else setTableData([]);
        } else if (response.status === 204) {
          setTableData([]);
          openNotification(
            'info',
            'No inventory details found for the selected period',
          );
        } else throw new Error(response);
      } else {
        setTableData([]);
      }
    } catch (error) {
      console.log(error);
      setTableData([]);
      openNotification(
        'danger',
        'Something went wrong while fetching inventory details',
      );
    } finally {
      hideCursorLoader();
    }
  };

  const handleInventoryChange = (event) => {
    let value = event.target.value;
    if (value !== '') value = Number(value);
    if (value === '' || inventoryValueRegex.test(value)) {
      setInventory(value);
    }
  };

  const handleAddInventory = () => {
    let newTableData = [];
    tableData.forEach((row) => {
      const newRow = {};
      Object.keys(row).forEach((key) =>
        key === 'StartTime'
          ? (newRow[key] = row[key])
          : (newRow[key] = inventory),
      );
      newTableData.push(newRow);
    });
    setTableData(newTableData);
  };

  const handleSave = async () => {
    try {
      showCursorLoader();
      const data = getDataToSave();
      const response = await apiCreateTraiInventory(data, token);
      if (response.status === 200) {
        openNotification('success', 'Inventory details saved successfully');
        resetPage();
      } else if (response.status === 204)
        openNotification(
          'info',
          'Inventory already exists for the selected period',
        );
      else throw new Error(response);
    } catch (error) {
      console.log(error);
      openNotification(
        'danger',
        'Something went wrong while saving inventory details',
      );
    } finally {
      hideCursorLoader();
    }
  };

  /* HELPER FUNCTIONS */
  const getDataToSave = () => {
    const data = [];
    tableData.forEach((time) => {
      Object.keys(time).forEach((key) => {
        if (key !== 'StartTime') {
          data.push({
            LocationCode: channel.LocationCode,
            ChannelCode: channel.ChannelCode,
            TelecastDate: key,
            TRAIInventory: time[key],
            StartTime: time.StartTime,
            EndTime: '',
          });
        }
      });
    });
    return data;
  };

  const resetPage = () => {
    setDateRange([null, null]);
    setInventory('');
    setTableData([]);
  };

  return (
    <>
      <div className="h-full flex flex-col gap-2">
        <div>
          <h5 className="mb-2">Hourly Allocation</h5>
          <Card bodyClass="px-3 pt-3 pb-4" bordered={false}>
            <div className="grid grid-cols-5 gap-4">
              <div>
                <p className="text-gray-300 mb-1">
                  Allocation Period <span className="text-red-700">*</span>
                </p>
                <DatePickerRange
                  placeholder="Date range"
                  size="sm"
                  inputFormat="DD-MMM-YYYY"
                  maxDate={
                    dateRange[0]
                      ? new Date(
                          dateRange[0].getTime() + 31 * 24 * 60 * 60 * 1000,
                        )
                      : null
                  }
                  value={dateRange}
                  onChange={handleDateChange}
                />
              </div>
              <div>
                <p className="text-gray-300 mb-1">
                  Inventory <span className="text-red-700">*</span>
                </p>
                <Input
                  size="sm"
                  placeholder="Inventory"
                  value={inventory}
                  onChange={handleInventoryChange}
                />
              </div>
              <div className="h-full flex items-end">
                <Button
                  size="sm"
                  variant="solid"
                  icon={<IoIosAddCircle />}
                  disabled={inventory === '' || tableData.length === 0}
                  onClick={handleAddInventory}
                >
                  Add
                </Button>
              </div>
            </div>
          </Card>
        </div>
        <div className="grow flex flex-col">
          <h5 className="mb-2">Inventory</h5>
          {tableData.length === 0 ? (
            <Card
              className="grow"
              bodyClass="p-3 h-full flex justify-center items-center"
              bordered={false}
            >
              Please select allocation period to add inventory
            </Card>
          ) : (
            <Card className="grow" bodyClass="p-3 h-full" bordered={false}>
              <EditableTable
                tableData={tableData}
                setTableData={setTableData}
                columns={columns}
              />
            </Card>
          )}
        </div>
      </div>
      <StickyFooter
        className="-mx-6 px-8 flex items-center justify-end gap-2 py-4"
        stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
      >
        <Button
          size="sm"
          variant="solid"
          icon={<AiOutlineSave />}
          onClick={handleSave}
        >
          Save
        </Button>
      </StickyFooter>
    </>
  );
}

export default HourlyAllocation;
