import {
  Button,
  Card,
  Input,
  InputGroup,
  Radio,
  Select,
  Spinner,
  Tooltip,
} from 'components/ui';
import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  getAllColumnsOfTable,
  getColumnSettingsFromAPI,
  handleFeatureClose,
} from '../../utils/utils';
import {
  droppableIdsEnum,
  featuresEnum,
  rowDataTypesEnum,
  secondaryTableTypesEnum,
  tableTypesEnum,
} from 'views/Scheduling/Scheduler/enum';
import { IoMdClose, IoMdSearch } from 'react-icons/io';
import SchedulerContext from 'views/Scheduling/Scheduler/context/SchedulerContext';
import {
  closeDropDowns,
  getNTCs,
  getNTCTypeSelectorOptions,
  selectorStyles,
} from './utils';
import { TABLE_NAMES } from 'views/Scheduling/Scheduler/constants';
import { TbGridDots } from 'react-icons/tb';
import ManageColumns from '../Dropdowns/ManageColumns/ManageColumns';
import { useSelector } from 'react-redux';
import {
  autoCompleteTime,
  getFormattedTime,
  openNotification,
} from 'views/Controls/GLOBALFUNACTION';
import classNames from 'classnames';
import { convertDateToYMD } from 'components/validators';
import DraggableTable from '../DraggableTable/DraggableTable';
import SecondaryTableToolbar from '../SecondaryTableToolbar/SecondaryTableToolbar';
import InsertByStartTimeToolbar from './components/InsertByStartTimeToolbar';
import AppliedFilters from '../AdvancedFilter/components/AppliedFilters';
import AdvancedFilters from '../AdvancedFilter/AdvancedFilters';
import { IoFilterSharp } from 'react-icons/io5';
import Addon from 'components/ui/InputGroup/Addon';
import { useDebounce } from 'use-debounce';
import { CLIENT } from 'views/Controls/clientListEnum';

function InsertNTC() {
  /* REDUX */
  const channel = useSelector((state) => state.locale.selectedChannel);
  const token = useSelector((state) => state.auth.session.token);

  /* CONTEXT */
  const {
    date,
    schedulingTableData,
    setOgSecTableData,
    secondaryTableData,
    setSecondaryTableData,
    setSecondaryTableType,
    secondaryTableSelectedRows,
    setSecondaryTableSelectedRows,
    secondaryTableManagedColumns,
    setSecondaryTableManagedColumns,
    secondaryTableOffset,
    secTableToolbarState,
    setSecTableToolbarState,
    setActiveFeatures,
    secondaryTableRef,
    resetSecondaryTableStates,
    maintainScrolledOffsetOfTables,
    ntcTypeOptions,
    setNtcTypeOptions,
    isAutoCalcNtcOffsetTime,
    droppedNtcs,
  } = useContext(SchedulerContext);

  /* STATES */
  const [ntcType, setNTCType] = useState('free');
  const [ntcSubType, setNTCSubType] = useState({
    value: 0,
    label: 'All',
  });
  const [insertType, setInsertType] = useState({
    value: 'offsetTime',
    label: 'Offset Time',
  });
  const [searchInputValue, setSearchInputValue] = useState('');
  const [searchDateRange, setSearchDateRange] = useState([null, null]);
  const [searchDuration, setSearchDuration] = useState([null, null]);
  const [insertTime, setInsertTime] = useState('');
  const [gap, setGap] = useState('');
  const [showLoader, setShowLoader] = useState(false);

  /* HOOKS */
  const dropdownRef = useRef(null);
  const [debouncedInsertTime] = useDebounce(insertTime, 500);
  const [debouncedGap] = useDebounce(gap, 500);

  /* USE EFFECTS */
  useEffect(() => {
    (async () => {
      try {
        setSecondaryTableType(secondaryTableTypesEnum.NTC);
        if (ntcTypeOptions.length === 0) {
          setShowLoader(true);
          setNtcTypeOptions(await getNTCTypeSelectorOptions());
          setShowLoader(false);
        }
      } catch (error) {
        openNotification(
          'danger',
          'Something went wrong while fetching NTC types',
        );
        console.error(error);
      }
    })();
    return resetSecondaryTableStates;
  }, []);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       // setShowLoader(true);
  //       // let updatedSecondaryTableData = [];
  //       // let updatedSecondaryTableSelectedRows = [];
  //       // await new Promise((resolve) => setTimeout(resolve, 0));
  //       // if (insertType.value === 'offsetTime') {
  //       //   const offsetTime =
  //       //     insertTime.length > 0
  //       //       ? autoCompleteTime(insertTime)
  //       //       : '00:00:00:00';
  //       //   updatedSecondaryTableData = await Promise.all(
  //       //     secondaryTableData.map(async (row) => {
  //       //       return new Promise((resolve) =>
  //       //         resolve({
  //       //           ...row,
  //       //           OffsetStartTime: offsetTime,
  //       //           Start_Time: '00:00:00:00',
  //       //         }),
  //       //       );
  //       //     }),
  //       //   );
  //       //   updatedSecondaryTableSelectedRows = await Promise.all(
  //       //     secondaryTableSelectedRows.map(async (row) => {
  //       //       return new Promise((resolve) =>
  //       //         resolve({
  //       //           ...row,
  //       //           OffsetStartTime: offsetTime,
  //       //           Start_Time: '00:00:00:00',
  //       //         }),
  //       //       );
  //       //     }),
  //       //   );
  //       // } else {
  //       //   const formattedInsertTime =
  //       //     insertTime.length > 0
  //       //       ? autoCompleteTime(insertTime)
  //       //       : '00:00:00:00';
  //       //   updatedSecondaryTableData = await Promise.all(
  //       //     secondaryTableData.map(async (row) => {
  //       //       return new Promise((resolve) =>
  //       //         resolve({
  //       //           ...row,
  //       //           OffsetStartTime: '',
  //       //           Start_Time: formattedInsertTime,
  //       //         }),
  //       //       );
  //       //     }),
  //       //   );
  //       //   updatedSecondaryTableSelectedRows = await Promise.all(
  //       //     secondaryTableSelectedRows.map(async (row) => {
  //       //       return new Promise((resolve) =>
  //       //         resolve({
  //       //           ...row,
  //       //           OffsetStartTime: '',
  //       //           Start_Time: formattedInsertTime,
  //       //         }),
  //       //       );
  //       //     }),
  //       //   );
  //       // }
  //       // setSecondaryTableData(updatedSecondaryTableData);
  //       // setSecondaryTableSelectedRows(updatedSecondaryTableSelectedRows);
  //       // maintainScrolledOffsetOfTables();
  //       // setShowLoader(false);
  //     } catch (error) {
  //       setShowLoader(false);
  //       console.error(error);
  //     }
  //   })();
  // }, [insertTime]);

  useEffect(() => {
    (async () => {
      try {
        if (
          secondaryTableData.length === 0 ||
          (secondaryTableManagedColumns.originalColumns.length !== 0 &&
            secondaryTableManagedColumns.visibleColumns.length !== 0 &&
            secondaryTableManagedColumns.removedColumns.length !== 0)
        )
          return;
        const { visibleColumns, removedColumns } =
          await getColumnSettingsFromAPI(
            TABLE_NAMES.SECONDARY_TABLE_NAMES.INSERT_NTC,
            secondaryTableData,
            token,
          );
        setSecondaryTableManagedColumns({
          originalColumns: getAllColumnsOfTable(secondaryTableData),
          visibleColumns,
          removedColumns,
        });
        maintainScrolledOffsetOfTables();
      } catch (error) {
        openNotification(
          'danger',
          'Something went wrong while setting columns for NTCs',
        );
        console.error(error);
      }
    })();
  }, [secondaryTableData]);

  useEffect(() => {
    document.addEventListener('mousedown', (event) =>
      closeDropDowns(event, dropdownRef, setSecTableToolbarState),
    );
    return () => {
      document.removeEventListener('mousedown', (event) =>
        closeDropDowns(event, dropdownRef, setSecTableToolbarState),
      );
    };
  }, [dropdownRef]);

  useEffect(() => {
    (async () => {
      let updatedSecondaryTableData = [];
      let updatedSecondaryTableSelectedRows = [];
      if (insertType.value === 'offsetTime') {
        const offsetTime =
          insertTime.length > 0 ? autoCompleteTime(insertTime) : '00:00:00:00';
        updatedSecondaryTableData = secondaryTableData.map((row) => ({
          ...row,
          OffsetStartTime: offsetTime,
          Start_Time: '00:00:00:00',
        }));
        updatedSecondaryTableSelectedRows = secondaryTableSelectedRows.map(
          (row) => ({
            ...row,
            OffsetStartTime: offsetTime,
            Start_Time: '00:00:00:00',
          }),
        );
      } else {
        const formattedInsertTime =
          insertTime.length > 0 ? autoCompleteTime(insertTime) : '00:00:00:00';
        updatedSecondaryTableData = secondaryTableData.map((row) => ({
          ...row,
          OffsetStartTime: '',
          Start_Time: formattedInsertTime,
        }));
        updatedSecondaryTableSelectedRows = secondaryTableSelectedRows.map(
          (row) => ({
            ...row,
            OffsetStartTime: '',
            Start_Time: formattedInsertTime,
          }),
        );
      }
      setOgSecTableData(updatedSecondaryTableData);
      setSecondaryTableData(updatedSecondaryTableData);
      setSecondaryTableSelectedRows(updatedSecondaryTableSelectedRows);
      maintainScrolledOffsetOfTables();
    })();
  }, [debouncedInsertTime]);

  useEffect(() => {
    let updatedSecondaryTableData = [];
    let updatedSecondaryTableSelectedRows = [];
    if (!gap) {
      updatedSecondaryTableData = secondaryTableData.map((row) => {
        const { Gap, ...newRow } = row;
        return { ...newRow };
      });
      updatedSecondaryTableSelectedRows = secondaryTableSelectedRows.map(
        (row) => {
          const { Gap, ...newRow } = row;
          return { ...newRow };
        },
      );
    } else {
      const newGap = autoCompleteTime(gap);
      updatedSecondaryTableData = secondaryTableData.map((row) => ({
        ...row,
        Gap: newGap,
      }));
      updatedSecondaryTableSelectedRows = secondaryTableSelectedRows.map(
        (row) => ({
          ...row,
          Gap: newGap,
        }),
      );
    }
    setOgSecTableData(updatedSecondaryTableData);
    setSecondaryTableData(updatedSecondaryTableData);
    setSecondaryTableSelectedRows(updatedSecondaryTableSelectedRows);
    maintainScrolledOffsetOfTables();
  }, [debouncedGap]);

  /* EVENT HANDLERS */
  const handleNtcTypeChange = (value) => {
    resetSecondaryTableStates();
    setNTCType(value);
    if (value === 'paid') {
      searchNTC(channel, convertDateToYMD(date), value, 0, 0);
    }
  };

  const handleSearchByKeyDown = (event) => {
    if (
      event.key.toLowerCase() === 'enter' ||
      event.key.toLowerCase() === 'tab'
    ) {
      searchNTC(
        channel,
        convertDateToYMD(date),
        ntcType,
        ntcSubType.value,
        searchInputValue,
      );
    }
  };

  const handleInsertTypeChange = (value) => {
    try {
      setInsertType(value);
      if (value.value === 'startTime') {
        setInsertTime('00:00:00:00');
      } else {
        setInsertTime('');
      }
    } catch (error) {
      console.error(error);
    }
  };

  /* HELPER FUNCTIONS */
  const searchNTC = async (
    channel,
    date,
    ntcType,
    ntcSubType,
    searchInputValue,
  ) => {
    try {
      setShowLoader(true);
      const tableData = await getNTCs(
        channel,
        date,
        ntcType,
        ntcSubType,
        searchInputValue,
        schedulingTableData,
        droppedNtcs,
      );
      setOgSecTableData(tableData);
      setSecondaryTableData(tableData);
    } catch (error) {
      openNotification('danger', 'Something went wrong while searching NTCs');
      console.error(error);
    } finally {
      setShowLoader(false);
    }
  };

  return (
    <div className="h-full w-full flex flex-col overflow-auto no-scrollbar bg-gray-800 p-3 pt-2 rounded-lg">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-3">
          <h5>NTC</h5>
          {secondaryTableData.length > 0 && (
            <h6 className="rounded-md px-1.5 py-0.5 bg-gray-600 flex items-center justify-center">
              {secondaryTableData.length - 1}
            </h6>
          )}
        </div>
        <div className="flex gap-1.5">
          {secondaryTableData.length > 0 && (
            <Tooltip title="Manage Columns" wrapperClass="relative">
              <Button
                size="xs"
                icon={<TbGridDots />}
                className={classNames(
                  secondaryTableManagedColumns.removedColumns.length > 0
                    ? '!bg-teal-700 hover:!bg-teal-700'
                    : 'hover:!bg-teal-800',
                  'transition-all',
                )}
                onClick={() =>
                  setSecTableToolbarState({
                    ...secTableToolbarState,
                    isManageColumnsDropdownVisible: true,
                  })
                }
              />
              {secTableToolbarState.isManageColumnsDropdownVisible && (
                <ManageColumns
                  tableType={tableTypesEnum.SECONDARY}
                  dropdownRef={dropdownRef}
                  position="right-1/2"
                />
              )}
            </Tooltip>
          )}
          <Tooltip title="Close">
            <Button
              size="xs"
              icon={<IoMdClose />}
              onClick={() =>
                handleFeatureClose(setActiveFeatures, featuresEnum.INSERT)
              }
            />
          </Tooltip>
        </div>
      </div>
      {channel.label !== CLIENT.USA_Forbes && (
        <Radio.Group
          value={ntcType}
          onChange={handleNtcTypeChange}
          className="mb-3"
        >
          <Radio value={'free'}>Free</Radio>
          <Radio value={'paid'}>Paid</Radio>
        </Radio.Group>
      )}
      <InputGroup className="mb-2 flex">
        <Select
          placeholder="Type"
          className="w-[60%]"
          options={ntcTypeOptions}
          value={ntcSubType}
          onChange={(value) => setNTCSubType(value)}
          styles={selectorStyles}
        />
        <Input
          placeholder="Search NTC"
          size="sm"
          className="h-[34px]"
          onChange={(event) => setSearchInputValue(event.target.value)}
          value={searchInputValue}
          autoFocus={true}
          onKeyDown={handleSearchByKeyDown}
        />
        <AdvancedFilters
          renderTitle={
            <Button
              icon={<IoFilterSharp />}
              className="h-[34px] px-2"
              size="sm"
              shape="none"
              title="Advanced Filters"
            />
          }
          searchDateRange={searchDateRange}
          setSearchDateRange={setSearchDateRange}
          searchDuration={searchDuration}
          setSearchDuration={setSearchDuration}
          handleApply={() =>
            searchNTC(
              channel,
              convertDateToYMD(date),
              ntcType,
              ntcSubType.value,
              searchInputValue,
            )
          }
        />
        <Button
          icon={<IoMdSearch />}
          className="h-[34px] px-2 !rounded-l-none !border-l-2 !border-l-gray-600"
          size="sm"
          onClick={() =>
            searchNTC(
              channel,
              convertDateToYMD(date),
              ntcType,
              ntcSubType.value,
              searchInputValue,
            )
          }
          title="Search"
        />
      </InputGroup>
      <div className="grow flex flex-col gap-3">
        {secondaryTableData.length > 0 ? (
          <>
            <InputGroup className="grid grid-cols-7">
              <Select
                placeholder="Insert By"
                className={
                  isAutoCalcNtcOffsetTime ? 'col-span-2' : 'col-span-3'
                }
                options={[
                  { value: 'offsetTime', label: 'Offset Time' },
                  { value: 'startTime', label: 'Start Time' },
                ]}
                value={insertType}
                onChange={handleInsertTypeChange}
                styles={selectorStyles}
              />
              <Input
                placeholder="HH:MM:SS:FF"
                size="sm"
                className={`h-[34px] ${
                  isAutoCalcNtcOffsetTime ? 'col-span-2' : 'col-span-4'
                }`}
                onChange={(event) => {
                  const time = getFormattedTime(event, insertTime);
                  setInsertTime(time);
                }}
                onBlur={() => setInsertTime(autoCompleteTime(insertTime))}
                value={insertTime}
                autoFocus={true}
              />
              {isAutoCalcNtcOffsetTime && (
                <>
                  <Addon className="h-[34px] text-white justify-center px-2">
                    Gap
                  </Addon>
                  <Input
                    placeholder="HH:MM:SS:FF"
                    size="sm"
                    className="h-[34px] col-span-2"
                    onChange={(event) => {
                      const time = getFormattedTime(event, gap);
                      setGap(time);
                    }}
                    onBlur={() => setGap(autoCompleteTime(gap))}
                    value={gap}
                  />
                </>
              )}
            </InputGroup>
            <AppliedFilters
              dateRange={searchDateRange}
              duration={searchDuration}
            />
            <div className="grow">
              {showLoader ? (
                <div className="h-full w-full flex justify-center items-center">
                  <Spinner size="45px" />
                </div>
              ) : (
                <DraggableTable
                  tableName={TABLE_NAMES.SECONDARY_TABLE_NAMES.INSERT_NTC}
                  tableType={tableTypesEnum.SECONDARY}
                  tableData={secondaryTableData}
                  columns={secondaryTableManagedColumns.visibleColumns}
                  droppableId={droppableIdsEnum.SECONDARY}
                  selectedRows={secondaryTableSelectedRows}
                  setSelectedRows={setSecondaryTableSelectedRows}
                  scrolledOffset={secondaryTableOffset}
                  tableRef={secondaryTableRef}
                  isDragDisabled={insertType.value === 'startTime'}
                />
              )}
            </div>
            {insertType.value === 'offsetTime' ? (
              <SecondaryTableToolbar insertType={rowDataTypesEnum.NTC} />
            ) : (
              <InsertByStartTimeToolbar />
            )}
          </>
        ) : (
          <Card
            className="h-full"
            bodyClass="h-full flex justify-center items-center"
          >
            No NTCs to show
          </Card>
        )}
      </div>
    </div>
  );
}

export default InsertNTC;
