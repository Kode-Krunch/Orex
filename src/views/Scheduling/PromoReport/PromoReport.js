import { Button, Card, Input, Tooltip } from 'components/ui';
import React, { useEffect, useState } from 'react';
import HeaderExtra from 'views/Controls/HeaderExtra';
import ReportsTable from 'views/Controls/ReportsTable/ReportsTable';
import Loader from 'views/Controls/Loader';
import DatePickerRange from 'components/ui/DatePicker/DatePickerRange';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';
import { useSelector } from 'react-redux';
import { MdDownload, MdOutlineSearch } from 'react-icons/md';
import { downloadReport, fetchPromos, fetchReportsTableData } from './utils';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import SelectableTable from 'views/Controls/SelectableTable';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

/* CONSTANTS */
const PROMO_SEL_COLUMNS = [{ header: 'Promo', accessorKey: 'PromoCaption' }];
const REPORT_COLUMNS = [
  { header: 'Telecast Date', accessorKey: 'TelecastDate' },
  { header: 'Telecast Time', accessorKey: 'TransmissionTime' },
  { header: 'Event Caption', accessorKey: 'PromoCaption' },
  { header: 'Video ID', accessorKey: 'HouseID' },
  { header: 'Promo Duration', accessorKey: 'PromoDuration' },
  { header: 'Program Name', accessorKey: 'ContentName' },
  { header: 'Remark', accessorKey: 'Remark' },
];
const TOOLBAR_OPTIONS = { groupBy: false, manageColumns: true };

function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <Input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

function PromoReport() {
  /* REDUX */
  const channel = useSelector((state) => state.locale.selectedChannel);

  /* STATES */
  const [promos, setPromos] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [rowSelection, setRowSelection] = useState([]);
  const [dateRange, setDateRange] = useState([null, null]);
  const [reportsTableData, setReportsTableData] = useState([]);
  const [managedColumns, setManagedColumns] = useState(REPORT_COLUMNS);
  const [showLoader, setShowLoader] = useState(false);

  /* USE EFFECTS */
  useEffect(() => {
    (async () => {
      let options = [];
      try {
        if (dateRange[0] && dateRange[1]) {
          setShowLoader(true);
          options = await fetchPromos(channel, dateRange);
          if (options.length === 0)
            openNotification('No Promos found for selected date range');
        } else resetData();
      } catch (error) {
        console.error(error);
        openNotification(
          'danger',
          'Something went wrong while fetching promos',
        );
      } finally {
        setPromos(options);
        setShowLoader(false);
      }
    })();
  }, [dateRange]);

  /* EVENT HANDLERS */
  const handleSearch = async () => {
    let tableData = [];
    try {
      if (dateRange[0] && dateRange[1]) {
        setShowLoader(true);
        let selPromos = [];
        const selRowIndexes = Object.keys(rowSelection);
        promos.forEach((row, index) => {
          if (selRowIndexes.includes(`${index}`)) selPromos.push(row);
        });
        tableData = await fetchReportsTableData(dateRange, selPromos, channel);
      }
    } catch (error) {
      console.error(error);
      openNotification('Something went wrong while fetching reports');
    } finally {
      setReportsTableData(tableData);
      setShowLoader(false);
    }
  };

  const handleDownloadReport = async () => {
    try {
      setShowLoader(true);
      await downloadReport(reportsTableData, channel, dateRange);
    } catch (error) {
      console.error(error);
      openNotification('Something went wrong while downloading reports');
    } finally {
      setShowLoader(false);
    }
  };

  /* HELPER FUNCTIONS */
  const resetData = () => {
    setPromos([]);
    setReportsTableData([]);
    setRowSelection([]);
  };

  return (
    <>
      <Card
        header={<HeaderExtra />}
        headerExtra={
          <DatePickerRange
            placeholder="Start Date - End Date"
            clearable={false}
            placement="bottom-end"
            size="sm"
            value={dateRange}
            onChange={setDateRange}
          />
        }
        className="flex flex-col min-h-[87vh]"
        bodyClass="grow flex flex-col pt-3"
      >
        <div className="h-full grid grid-cols-6">
          {promos.length > 0 ? (
            <div className="h-full col-span-2 flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <DebouncedInput
                  value={globalFilter ?? ''}
                  size="sm"
                  placeholder="Search Promos"
                  onChange={(value) => setGlobalFilter(String(value))}
                />
                {Object.keys(rowSelection).length === 0 ? (
                  <Tooltip title={'Please select promos to search report'}>
                    <Button
                      variant="solid"
                      size="sm"
                      icon={<MdOutlineSearch />}
                      disabled={Object.keys(rowSelection).length === 0}
                    >
                      Get Report
                    </Button>
                  </Tooltip>
                ) : (
                  <Button
                    variant="solid"
                    size="sm"
                    icon={<MdOutlineSearch />}
                    disabled={Object.keys(rowSelection).length === 0}
                    onClick={handleSearch}
                  >
                    Get Report
                  </Button>
                )}
              </div>
              <div className="grow h-0 overflow-auto">
                <SelectableTable
                  tableData={promos}
                  columns={PROMO_SEL_COLUMNS}
                  rowSelection={rowSelection}
                  setRowSelection={setRowSelection}
                  globalFilter={globalFilter}
                  setGlobalFilter={setGlobalFilter}
                />
              </div>
            </div>
          ) : (
            <div className="h-full col-span-2 flex justify-center items-center">
              Select date range to search promos
            </div>
          )}
          <div className="h-full col-span-4 pl-3 ml-3 border-l border-l-gray-700">
            {reportsTableData.length > 0 ? (
              <ReportsTable
                tableData={reportsTableData}
                tableName="Promo Report"
                originalColumns={REPORT_COLUMNS}
                managedColumns={managedColumns}
                setManagedColumns={setManagedColumns}
                exportFile={false}
                columnsToFormatInINR={[]}
                toolbarOptions={TOOLBAR_OPTIONS}
                toolbarExtraContent={
                  <Button
                    icon={<MdDownload />}
                    variant="solid"
                    size="sm"
                    onClick={handleDownloadReport}
                  >
                    Download Report
                  </Button>
                }
              />
            ) : (
              <div className="h-full flex justify-center items-center">
                No reports to show
              </div>
            )}
          </div>
        </div>
        {/* <div className="pb-4 border-b border-b-gray-700 mb-4">
          <div className="flex justify-between items-end gap-8">
            <div className="grow flex items-end gap-3">
              <div className="grow flex flex-col gap-1">
                <p className="text-white">
                  Promos <span className="text-red-500">*</span>
                </p>
                <SelectXs
                  isMulti={true}
                  options={promos}
                  value={selPromos}
                  onChange={setSelPromos}
                />
              </div>
              <Button
                variant="solid"
                size="sm"
                icon={<MdOutlineSearch />}
                disabled={
                  selPromos.length === 0 || !dateRange[0] || !dateRange[1]
                }
                onClick={handleSearch}
              >
                Search
              </Button>
            </div>
            {tableData.length > 0 && (
              <Button
                icon={<MdDownload />}
                variant="solid"
                size="sm"
                onClick={handleDownloadReport}
              >
                Download Report
              </Button>
            )}
          </div>
        </div> */}
      </Card>
      <Loader showLoader={showLoader} />
    </>
  );
}

export default PromoReport;
