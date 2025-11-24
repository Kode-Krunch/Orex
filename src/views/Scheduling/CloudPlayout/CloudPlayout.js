import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {
  getAsrunStartEndTime,
  getMissedSpots,
  getMissedSpotsInSelTime,
  getPlaylistSummaryData,
} from './utils';
import StatisticCardwithfigure from 'components/common/StatisticCardwithfigure';
import {
  convertDateFormatyyyyMMdd,
  openNotification,
  parseDuration,
} from 'views/Controls/GLOBALFUNACTION';
import {
  Button,
  Card,
  DatePicker,
  Input,
  InputGroup,
  Tooltip,
} from 'components/ui';
import Loader from 'views/Controls/Loader';
import { hideStackedSideNav_secondary } from 'views/Scheduling/general';
import { apiCallstoreprocedure } from 'services/CommonService';
import ReportsTable from 'views/Controls/ReportsTable/ReportsTable';
import { reportsTableEnum } from 'views/Controls/ReportsTable/enums/ReportsTableEnums';
import { StickyFooter } from 'components/shared';
import ExtraTeleastedSpotsTable from './ExtraTeleastedSpotsTable';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import RescheduleSpotsDialog from './RescheduleSpotsDialog';
import MakeGoodDialog from './MakeGoodDialog';
import { FLAG_INFO, TIMES_CAROUSEL_SETTINGS } from './constant';
import TimeSelector from 'views/Controls/TimeSelector/TimeSelector';

const TOOLBAR_OPTIONS = { groupBy: false, manageColumns: false };

const prettifyHeader = (key) =>
  key
    .replace(/([A-Z])/g, ' $1')
    .replace(/_/g, ' ')
    .replace(/^./, (s) => s.toUpperCase());

const generateColumnsFromData = (data) =>
  data?.length
    ? Object.keys(data[0]).map((key) => ({
      header: prettifyHeader(key),
      accessorKey: key,
      cell: (info) => {
        const value = info.getValue?.();
        if (value == null) return '';
        if (key.toLowerCase().includes('date')) {
          const d = new Date(value);
          return !isNaN(d) ? d.toISOString().split('T')[0] : value;
        }
        return value;
      },
    }))
    : [];

export default function CloudPlayout() {
  // const apiCallInProgress = useRef(false);
  const channel = useSelector((state) => state.locale.selectedChannel);
  const location = useLocation();
  const AgencyCode = useSelector((state) => state.auth.user.AgencyCode);
  const [date, setDate] = useState(null);
  const [playlistSummary, setPlaylistSummary] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [managedColumns, setManagedColumns] = useState([]);
  const [tableTitle, setTableTitle] = useState('');
  const [curTable, setCurTable] = useState('');
  const [rowSelection, setRowSelection] = useState({});
  const [selectedRows, setSelectedRows] = useState([]);
  const [summaryData, setSummaryData] = useState({});
  const [isRescheduleDialogOpen, setIsRescheduleDialogOpen] = useState(false);
  const [isMakeGoodDialogOpen, setIsMakeGoodDialogOpen] = useState(false);
  hideStackedSideNav_secondary();
  const [externalGlobalFilter, setExternalGlobalFilter] = useState('');
  const [selectedTime, setSelectedTime] = useState('all');
  const [times, setTimes] = useState([]);

  /* PRE-PROCESSING */

  const isMissedSpotsTable = curTable === 'Missed Spots Details';
  const curFlagInfo = { ...FLAG_INFO };
  if (AgencyCode != 0) {
    delete curFlagInfo['Total Songs'];
    delete curFlagInfo['Total Promos'];
    delete curFlagInfo['Total NTC'];
  }
  console.log(AgencyCode)
  const originalColumns = useMemo(
    () => generateColumnsFromData(tableData),
    [tableData],
  );

  useEffect(() => {
    setDate(location?.state?.date ? location.state.date : new Date());
  }, [location]);

  useEffect(() => {
    (async () => {
      try {
        if (!date) return;
        setShowLoader(true);
        setPlaylistSummary(
          await getPlaylistSummaryData(
            channel,
            convertDateFormatyyyyMMdd(date),
            AgencyCode,
          ),
        );
        setTimes(
          await getAsrunStartEndTime(channel, convertDateFormatyyyyMMdd(date)),
        );
      } catch {
        openNotification('danger', 'Error retrieving Playlist Summary');
      } finally {
        setShowLoader(false);
        resetData();
        setTableData([]);
      }
    })();
  }, [channel, date]);

  useEffect(() => {
    resetData();
  }, [selectedTime]);

  // 🔹 Fetch Playlist Details by Flag
  const getPlaylistDetailsByFlag = async (flag, title) => {
    // if (apiCallInProgress.current) return;
    // apiCallInProgress.current = true;
    setShowLoader(true);
    let tableData = [];
    try {
      setTableTitle(title);
      setCurTable(title);

      const response = await apiCallstoreprocedure(
        'USP_PlaylistSummary_Showdata',
        {
          par_LocationCode: channel.LocationCode,
          par_ChannelCode: channel.ChannelCode,
          par_TelecastDate: convertDateFormatyyyyMMdd(date),
          Flag: flag,
          AgencyCode: AgencyCode,
        },
      );
      if (response.status === 200) {
        if (flag === 2) {
          tableData = getMissedSpots(response.data, selectedRows[0]);
        } else tableData = response.data;
      } else if (response.status === 204)
        openNotification('info', 'No data to show');
      else
        openNotification('danger', 'Something went wrong while fetching spots');
    } catch {
      openNotification('danger', 'Error fetching playlist details');
    } finally {
      setTableData(tableData);
      setManagedColumns(generateColumnsFromData(tableData));
      setShowLoader(false);
    }
  };

  // 🔹 Track brand & calculate sums
  useEffect(() => {
    const sums = selectedRows.reduce(
      (acc, item) => {
        acc.spotAmountSum += item?.SpotAmount || 0;
        acc.spotRateSum += item?.SpotRate || 0;
        acc.Duration += parseDuration(item?.Duration);
        return acc;
      },
      { spotAmountSum: 0, spotRateSum: 0, Duration: 0 },
    );

    setSummaryData(sums);
    setTableData(getMissedSpots(tableData, selectedRows[0]));
  }, [selectedRows]);

  function resetData() {
    setSelectedRows([]);
    setRowSelection({});
    setIsRescheduleDialogOpen(false);
    setIsMakeGoodDialogOpen(false);
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <h3>Cloud Playout</h3>
        <div className="flex items-center gap-1.5">
          {tableData.length > 0 && (
            <Input
              size="sm"
              value={externalGlobalFilter}
              onChange={(event) => setExternalGlobalFilter(event.target.value)}
              placeholder="Search all columns"
            />
          )}
          <DatePicker
            placeholder="Select"
            value={date}
            inputFormat="DD/MM/YYYY"
            size="sm"
            clearable={false}
            onChange={setDate}
          />
          <InputGroup>
            <Tooltip title="Prev Date">
              <Button
                icon={<IoIosArrowBack />}
                size="sm"
                shape="none"
                className="!rounded-l-lg"
                onClick={async () => {
                  setDate((prev) => {
                    const prevDate =
                      prev instanceof Date ? prev : new Date(prev);
                    const newDate = new Date(prevDate);
                    newDate.setDate(newDate.getDate() - 1);
                    return newDate;
                  });
                }}
              />
            </Tooltip>
            <Tooltip title="Next Date">
              <Button
                icon={<IoIosArrowForward />}
                size="sm"
                shape="none"
                className="!rounded-r-lg"
                onClick={async () => {
                  setDate((prev) => {
                    const prevDate =
                      prev instanceof Date ? prev : new Date(prev);
                    const newDate = new Date(prevDate);
                    newDate.setDate(newDate.getDate() + 1);
                    return newDate;
                  });
                }}
              />
            </Tooltip>
          </InputGroup>
        </div>
      </div>
      {isMissedSpotsTable && tableData.length > 0 && (
        <Card bodyClass="px-8 py-2" bordered={false}>
          <TimeSelector
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
            times={times}
            carouselSettings={TIMES_CAROUSEL_SETTINGS}
          />
        </Card>
      )}
      <Card bodyClass="p-2 grid grid-cols-8 gap-2" bordered={false}>
        {playlistSummary.map((summary, idx) => {
          const flagData = curFlagInfo[summary.title];
          if (!flagData) return null;
          return (
            <div
              key={idx}
              role="button"
              tabIndex={0}
              id={summary.id}
              onClick={() =>
                getPlaylistDetailsByFlag(flagData.flag, flagData.title)
              }
            >
              <StatisticCardwithfigure
                CardHeight={170}
                AnimateColorClass={summary.iconBorderColor}
                Icon={summary.icon}
                CardName={summary.title}
                CardNote={summary.description}
                CardFigure={summary.count}
                COLOR={summary.color}
                cursor
                selected={tableTitle === flagData.title}
              />
            </div>
          );
        })}
      </Card>
      {curTable === 'Extra Details' ? (
        <ExtraTeleastedSpotsTable EXTRA_TELECASTED_SPOTS={tableData} />
      ) : tableData.length > 0 ? (
        (() => {
          const missedSpots = getMissedSpotsInSelTime(selectedTime, tableData);
          return (
            <Card
              bodyClass={`p-3 pt-0 flex items-center justify-center ${missedSpots.length === 0 ? 'h-56' : ''
                }`}
            >
              <ReportsTable
                tableData={missedSpots}
                tableName={tableTitle}
                originalColumns={originalColumns}
                tableType={
                  isMissedSpotsTable
                    ? reportsTableEnum.tableTypes.SELECTABLE
                    : reportsTableEnum.tableTypes.DEFAULT
                }
                managedColumns={managedColumns}
                exportFile={false}
                setManagedColumns={setManagedColumns}
                columnsToFormatInINR={[]}
                exportFileName="Playlist_Summary"
                toolbarOptions={TOOLBAR_OPTIONS}
                setSelectedRows={setSelectedRows}
                rowSelection={rowSelection}
                setRowSelection={setRowSelection}
                externalGlobalFilter={externalGlobalFilter}
                selectAll={false}
              />
            </Card>
          );
        })()
      ) : (
        curTable && (
          <div className="p-4 h-56 flex items-center justify-center">
            No data to show for {tableTitle}
          </div>
        )
      )}
      {isMissedSpotsTable && selectedRows.length > 0 && (
        <StickyFooter
          className="-mx-8 px-8 flex items-center justify-between py-4 pt-2 pb-2 mt-4"
          stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
        >
          <div className="md:flex items-center">
            <Button
              variant="solid"
              type="submit"
              size="sm"
              onClick={() => setIsRescheduleDialogOpen(true)}
            >
              Proceed to Reschedule
            </Button>
            &nbsp;
            {/* <Button
              variant="solid"
              type="submit"
              size="sm"
              onClick={() => setIsMakeGoodDialogOpen(true)}
            >
              Make Good
            </Button>
            &nbsp; */}
            <Button type="button" onClick={() => resetData()} size="sm">
              Reset
            </Button>
          </div>
          <div
            id="myblock"
            className="grid grid-cols-4 gap-6 p-4 pt-0 pb-1 bg-gray-100 dark:bg-gray-800"
          >
            <div className="flex flex-col">
              <span className="font-medium text-white text-sm">
                Total Spots
              </span>
              <span className="font-medium text-lg text-teal-500">
                {tableData.length}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-medium text-white text-sm">
                Selected Spots
              </span>
              <span className="font-medium text-lg text-teal-500">
                {selectedRows.length}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-medium text-white text-sm">Duration</span>
              <span className="font-medium text-lg text-teal-500">
                {summaryData.Duration} sec
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-medium text-white text-sm">
                Spot Amount
              </span>
              <span className="font-medium text-lg text-teal-500">
                ₹ {summaryData.spotAmountSum}
              </span>
            </div>
          </div>
        </StickyFooter>
      )}
      {isRescheduleDialogOpen && (
        <RescheduleSpotsDialog
          isOpen={isRescheduleDialogOpen}
          setIsOpen={setIsRescheduleDialogOpen}
          selRows={selectedRows}
          resetData={resetData}
        />
      )}
      {isMakeGoodDialogOpen && (
        <MakeGoodDialog
          isOpen={isMakeGoodDialogOpen}
          setIsOpen={setIsMakeGoodDialogOpen}
          selRows={selectedRows}
          resetData={resetData}
        />
      )}
      <Loader showLoader={showLoader} />
    </div>
  );
}
