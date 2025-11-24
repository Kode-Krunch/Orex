import { Button, Dropdown } from 'components/ui';
import DatePickerRange from 'components/ui/DatePicker/DatePickerRange';
import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';
import WarningDialog from 'views/Controls/WarningDialog';
import { TW_COLORS } from 'views/Controls/Dashboard/constants/tw_colors';
import MuiRangeInput from 'views/Controls/MuiRangeInput';

function AdvancedFilters({
  renderTitle,
  searchDateRange,
  setSearchDateRange,
  searchDuration,
  setSearchDuration,
  handleApply,
}) {
  /* STATES */
  const [dateRange, setDateRange] = useState(searchDateRange);
  const [duration, setDuration] = useState(searchDuration);
  const [isResetWarningDialogOpen, setIsResetWarningDialogOpen] =
    useState(false);

  /* EVENT HANDLERS */
  const handleApplyFilter = async () => {
    try {
      setSearchDateRange(dateRange);
      setSearchDuration(duration);
      await handleApply(dateRange, duration);
    } catch (error) {
      openNotification('danger', 'Something went wrong while applying filters');
      console.error(error);
    }
  };

  const handleResetFilters = async () => {
    try {
      const dateRange = [null, null];
      const duration = [null, null];
      setSearchDateRange(dateRange);
      setSearchDuration(duration);
      setIsResetWarningDialogOpen(false);
      await handleApply(dateRange, duration);
    } catch (error) {
      openNotification(
        'danger',
        'Something went wrong while resetting filters',
      );
      console.error(error);
    }
  };

  return (
    <>
      <Dropdown
        renderTitle={renderTitle || <></>}
        placement="bottom-end"
        menuClass="p-3 min-w-[256px] flex flex-col gap-5 border-2 border-gray-600"
        toggleClassName="hover:cursor-pointer"
        onOpen={() => {
          setDateRange(searchDateRange);
          setDuration(searchDuration);
        }}
      >
        <div>
          <p className="mb-1 text-white">Date Range</p>
          <DatePickerRange
            placeholder="Select"
            size="sm"
            className="!rounded-md"
            onChange={(value) => setDateRange(value)}
            value={dateRange}
          />
        </div>
        <div>
          <div className="flex justify-between items-center">
            <p className="text-white">Duration (Min)</p>
            {duration[0] !== null && duration[1] !== null && (
              <p className="text-white flex items-center gap-2">
                {`${duration[0]} - ${duration[1]}`}
                <Button
                  size="xs"
                  icon={<IoMdClose className="text-gray-300" />}
                  className="!h-6 !w-6"
                  variant="solid"
                  shape="circle"
                  color="gray-600"
                  onClick={() => setDuration([null, null])}
                  title="Reset Duration"
                />
              </p>
            )}
          </div>
          <div className="px-2">
            <MuiRangeInput
              value={duration}
              color={TW_COLORS.teal[500]}
              size="small"
              onChange={(event) => setDuration(event.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-between itmes-center w-full">
          <Button
            className="w-max font-normal !border !border-gray-500"
            size="sm"
            style={{
              fontSize: '0.8rem',
              lineHeight: '1rem',
            }}
            onClick={() => setIsResetWarningDialogOpen(true)}
          >
            Reset
          </Button>
          <Dropdown.Item onClick={handleApplyFilter} className="p-0 w-max">
            <Button
              size="sm"
              className="w-max font-normal"
              variant="twoTone"
              style={{ fontSize: '0.8rem', lineHeight: '1rem' }}
            >
              Apply
            </Button>
          </Dropdown.Item>
        </div>
      </Dropdown>
      {isResetWarningDialogOpen && (
        <WarningDialog
          isDialogOpen={isResetWarningDialogOpen}
          title="Reset Filters"
          description={`Do you wish to reset all the filters?`}
          submitButtonTitle="Reset"
          handleDialogSubmit={handleResetFilters}
          handleDialogClose={() => setIsResetWarningDialogOpen(false)}
        />
      )}
    </>
  );
}

export default AdvancedFilters;
