import React, { useContext, useEffect, useRef, useState } from 'react';
import { IoMdClose, IoMdSearch } from 'react-icons/io';
import {
  Button,
  Card,
  Input,
  InputGroup,
  Select,
  Spinner,
  Tooltip,
} from 'components/ui';
import SchedulerContext from 'views/Scheduling/Scheduler/context/SchedulerContext';
import {
  droppableIdsEnum,
  featuresEnum,
  rowDataTypesEnum,
  secondaryTableTypesEnum,
  tableTypesEnum,
} from 'views/Scheduling/Scheduler/enum';
import {
  getAllColumnsOfTable,
  getColumnSettingsFromAPI,
  handleFeatureClose,
} from '../../utils/utils';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';
import {
  closeDropDowns,
  getPromos,
  getPromoTypeSelectorOptions,
} from './utils';
import { useSelector } from 'react-redux';
import { convertDateToYMD } from 'components/validators';
import DraggableTable from '../DraggableTable/DraggableTable';
import { TbGridDots } from 'react-icons/tb';
import ManageColumns from '../Dropdowns/ManageColumns/ManageColumns';
import classNames from 'classnames';
import SecondaryTableToolbar from '../SecondaryTableToolbar/SecondaryTableToolbar';
import { TABLE_NAMES } from 'views/Scheduling/Scheduler/constants';
import { CLIENT } from 'views/Controls/clientListEnum';
import AdvancedFilters from '../AdvancedFilter/AdvancedFilters';
import AppliedFilters from '../AdvancedFilter/components/AppliedFilters';
import { IoFilterSharp } from 'react-icons/io5';

function InsertPromo() {
  /* REDUX */
  const channel = useSelector((state) => state.locale.selectedChannel);
  const token = useSelector((state) => state.auth.session.token);

  /* CONDITION */
  const IsChannelwise = channel.label === CLIENT.USA_Forbes;

  /* CONTEXT */
  const {
    date,
    setSecondaryTableType,
    setOgSecTableData,
    secondaryTableData,
    setSecondaryTableData,
    secondaryTableManagedColumns,
    setSecondaryTableManagedColumns,
    setActiveFeatures,
    secTableToolbarState,
    setSecTableToolbarState,
    secondaryTableOffset,
    secondaryTableSelectedRows,
    setSecondaryTableSelectedRows,
    secondaryTableRef,
    promoTypeOptions,
    setPromoTypeOptions,
    resetSecondaryTableStates,
  } = useContext(SchedulerContext);

  /* STATES */
  const [selectedPromoType, setSelectedPromoType] = useState({
    value: '0',
    label: 'All',
  });
  const [searchInputValue, setSearchInputValue] = useState('');
  const [searchDateRange, setSearchDateRange] = useState([null, null]);
  const [searchDuration, setSearchDuration] = useState([null, null]);
  const [showLoader, setShowLoader] = useState(false);

  /* HOOKS */
  const dropdownRef = useRef(null);

  /* USE EFFECTS */
  useEffect(() => {
    (async () => {
      try {
        setSecondaryTableType(secondaryTableTypesEnum.PROMO);
        if (promoTypeOptions.length === 0) {
          setShowLoader(true);
          setPromoTypeOptions(await getPromoTypeSelectorOptions());
          setShowLoader(false);
        }
      } catch (error) {
        openNotification(
          'danger',
          'Something went wrong while fetching promo types',
        );
        console.error(error);
      }
    })();
    return resetSecondaryTableStates;
  }, []);

  useEffect(() => {
    (async () => {
      try {
        if (secondaryTableData.length === 0) return;
        const { visibleColumns, removedColumns } =
          await getColumnSettingsFromAPI(
            TABLE_NAMES.SECONDARY_TABLE_NAMES.INSERT_PROMOS,
            secondaryTableData,
            token,
          );
        setSecondaryTableManagedColumns({
          originalColumns: getAllColumnsOfTable(secondaryTableData),
          visibleColumns,
          removedColumns,
        });
      } catch (error) {
        openNotification(
          'danger',
          'Something went wrong while setting columns for Promos',
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

  /* EVENT HANDLERS */
  const handleSearchByEnterKey = (event) => {
    try {
      if (
        event.key.toLowerCase() === 'enter' ||
        event.key.toLowerCase() === 'tab'
      ) {
        handleSearch(searchDateRange, searchDuration);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = async (dateRange, durationRange) => {
    try {
      setShowLoader(true);
      const tableData = await getPromos(
        getSearchParams(dateRange, durationRange),
      );
      setOgSecTableData(tableData);
      setSecondaryTableData(tableData);
      setShowLoader(false);
    } catch (error) {
      openNotification('danger', 'Something went wrong while searching');
      setShowLoader(false);
      console.error(error);
    }
  };

  const getSearchParams = (dateRange, durationRange) => {
    try {
      const fromDate = dateRange[0]
        ? convertDateToYMD(dateRange[0])
        : convertDateToYMD(
            new Date(new Date().setFullYear(new Date().getFullYear() - 3)),
          );
      const toDate = dateRange[1]
        ? convertDateToYMD(dateRange[1])
        : convertDateToYMD(
            new Date(new Date().setDate(new Date().getDate() + 1)),
          );
      const fromDuration = durationRange[0] ? durationRange[0] : 0;
      const toDuration = durationRange[1] ? durationRange[1] : 999;
      return {
        LocationCode: channel.LocationCode,
        ChannelCode: channel.ChannelCode,
        TelecastDate: convertDateToYMD(date),
        PromoTypeCode: selectedPromoType.value,
        PromoName: searchInputValue ? searchInputValue : '%%',
        AddedFrom: fromDate,
        AddedTo: toDate,
        DurationFrom: fromDuration,
        DurationTo: toDuration,
      };
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="h-full w-full flex flex-col overflow-auto no-scrollbar bg-gray-800 p-3 pt-2 rounded-lg">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-3">
          <h5>{IsChannelwise ? 'Content' : 'Promos'}</h5>
          {secondaryTableData.length > 0 && !showLoader && (
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
      <InputGroup className="mb-2 flex">
        <Select
          placeholder="Type"
          className="w-[60%] h-[38px]"
          options={promoTypeOptions}
          value={selectedPromoType}
          onChange={(value) => setSelectedPromoType(value)}
          styles={{
            valueContainer: (baseStyles) => ({
              ...baseStyles,
              paddingRight: 0,
            }),
          }}
        />
        <Input
          placeholder={IsChannelwise ? 'Search Content' : 'Search Promo'}
          size="sm"
          className="h-[38px]"
          onChange={(event) => setSearchInputValue(event.target.value)}
          value={searchInputValue}
          autoFocus={true}
          onKeyDown={handleSearchByEnterKey}
        />
        <AdvancedFilters
          renderTitle={
            <Button
              icon={<IoFilterSharp />}
              className="h-[40px] px-2"
              size="sm"
              shape="none"
              title="Advanced Filters"
            />
          }
          searchDateRange={searchDateRange}
          setSearchDateRange={setSearchDateRange}
          searchDuration={searchDuration}
          setSearchDuration={setSearchDuration}
          handleApply={handleSearch}
        />
        <Button
          icon={<IoMdSearch />}
          className="h-[40px] px-2 !rounded-l-none !border-l-2 !border-l-gray-600"
          size="sm"
          onClick={() => handleSearch(searchDateRange, searchDuration)}
          title="Search"
        />
      </InputGroup>
      <div className="grow flex flex-col gap-2">
        {secondaryTableData.length > 0 && !showLoader ? (
          <>
            <AppliedFilters
              dateRange={searchDateRange}
              duration={searchDuration}
            />
            <div className="grow">
              <DraggableTable
                tableName={TABLE_NAMES.SECONDARY_TABLE_NAMES.INSERT_PROMOS}
                tableType={tableTypesEnum.SECONDARY}
                tableData={secondaryTableData}
                columns={secondaryTableManagedColumns.visibleColumns}
                droppableId={droppableIdsEnum.SECONDARY}
                selectedRows={secondaryTableSelectedRows}
                setSelectedRows={setSecondaryTableSelectedRows}
                scrolledOffset={secondaryTableOffset}
                tableRef={secondaryTableRef}
              />
            </div>
            <SecondaryTableToolbar insertType={rowDataTypesEnum.PROMO} />
          </>
        ) : (
          <Card
            className="h-full"
            bodyClass="h-full flex justify-center items-center"
          >
            {showLoader ? (
              <Spinner size="45px" />
            ) : (
              <>No {IsChannelwise ? 'Content' : 'promo'} to show</>
            )}
          </Card>
        )}
      </div>
    </div>
  );
}

export default InsertPromo;
