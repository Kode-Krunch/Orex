import { Button, Dropdown, Input, Select, Tooltip } from 'components/ui';
import React, { useContext, useEffect, useState } from 'react';
import { IoFilterSharp } from 'react-icons/io5';
import ReportsTableContext from 'views/Controls/ReportsTable/context/ReportsTableContext';
import { mainTableEnums } from 'views/Controls/ReportsTable/enums/MainTableEnums';

/* CONSTANTS */
const GRAY_500 = 'rgb(107 114 128)';
const TEAL_500 = 'rgb(20 184 166)';
const FILTER_OPTIONS = [
  { value: '0', label: mainTableEnums.filterOptions.STARTS_WITH },
  { value: '1', label: mainTableEnums.filterOptions.CONTAINS },
  { value: '2', label: mainTableEnums.filterOptions.NOT_CONTAINS },
  { value: '3', label: mainTableEnums.filterOptions.ENDS_WITH },
  { value: '4', label: mainTableEnums.filterOptions.EQUALS },
  { value: '5', label: mainTableEnums.filterOptions.NOT_EQUALS },
];
const SELECTOR_STYLES = {
  control: (baseStyles) => ({
    ...baseStyles,
    borderColor: GRAY_500,
    '&:hover': {
      cursor: 'pointer',
    },
  }),
  dropdownIndicator: (baseStyles) => ({
    ...baseStyles,
    color: GRAY_500,
  }),
};

function ColumnFilterDropDown({ columnKey, isLastColumn }) {
  /* CONTEXTS */
  const { selectedFilters, setSelectedFilters } =
    useContext(ReportsTableContext);

  /* STATES */
  const [filterInputValues, setFilterInputValues] = useState({
    selectorValue: FILTER_OPTIONS[0],
    searchInputValue: '',
  });

  /* USE EFFECTS */
  useEffect(() => {
    try {
      if (selectedFilters.length === 0) {
        setFilterInputValues({
          selectorValue: FILTER_OPTIONS[0],
          searchInputValue: '',
        });
      }
    } catch (error) {
      console.error(error);
    }
  }, [selectedFilters]);

  /* EVENT HANDLERS */
  const handleApplyFilter = () => {
    try {
      setSelectedFilters((oldState) => {
        let newState = [...oldState];
        newState = newState.filter(
          (filter) =>
            !(
              filter.columnKey === columnKey &&
              filter.filter === filterInputValues.selectorValue.label
            ),
        );
        newState.push({
          columnKey,
          filter: filterInputValues.selectorValue.label,
          searchValue: filterInputValues.searchInputValue,
        });
        return newState;
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleClearFilter = () => {
    try {
      setSelectedFilters((oldState) => {
        let newState = [...oldState];
        newState = newState.filter((filter) => filter.columnKey !== columnKey);
        return newState;
      });
      resetFilterInputs();
    } catch (error) {
      console.error(error);
    }
  };

  /* HELPER FUNCTIONS */
  const isFilterSelected = () => {
    try {
      const filterSelected = selectedFilters.filter(
        (curFilter) => curFilter.columnKey === columnKey,
      );
      if (filterSelected.length > 0) {
        return true;
      }
      return false;
    } catch (error) {
      console.error(error);
    }
  };

  const resetFilterInputs = () => {
    try {
      setFilterInputValues({
        selectorValue: FILTER_OPTIONS[0],
        searchInputValue: '',
      });
    } catch (error) {
      throw error;
    }
  };

  return (
    <Dropdown
      renderTitle={
        <Tooltip title="Filter">
          <Button
            shape="circle"
            variant="plain"
            size="xs"
            icon={<IoFilterSharp color={isFilterSelected() ? TEAL_500 : ''} />}
          />
        </Tooltip>
      }
      menuClass="w-80 font-normal p-3 capitalize text-xs"
      placement={isLastColumn ? 'bottom-end' : 'bottom-center'}
    >
      <p className="text-[0.92rem] font-normal  border-b border-b-gray-600 pb-2">
        Filter
      </p>
      <div className="mt-3 grid grid-cols-2 gap-x-2 gap-y-3 items-center">
        <Select
          placeholder="Select"
          size="sm"
          styles={SELECTOR_STYLES}
          options={FILTER_OPTIONS}
          value={filterInputValues.selectorValue}
          onChange={(option) => {
            setFilterInputValues({
              ...filterInputValues,
              selectorValue: option,
            });
          }}
        />
        <Input
          size="sm"
          style={{
            borderColor: GRAY_500,
          }}
          placeholder="Search"
          className="h-full hover:cursor-pointer"
          value={filterInputValues.searchInputValue}
          onChange={(event) => {
            setFilterInputValues({
              ...filterInputValues,
              searchInputValue: event.target.value,
            });
          }}
        />
        <Dropdown.Item
          variant="custom"
          className="mt-2 col-span-2 flex justify-between"
        >
          <Button
            className="w-max font-normal"
            style={{
              borderColor: GRAY_500,
              fontSize: '0.8rem',
              lineHeight: '1rem',
            }}
            size="sm"
            onClick={handleClearFilter}
          >
            Clear
          </Button>
          <Button
            className="w-max font-normal"
            size="sm"
            variant="twoTone"
            disabled={!filterInputValues.searchInputValue}
            onClick={handleApplyFilter}
            style={{ fontSize: '0.8rem', lineHeight: '1rem' }}
          >
            Apply
          </Button>
        </Dropdown.Item>
      </div>
    </Dropdown>
  );
}

export default ColumnFilterDropDown;
