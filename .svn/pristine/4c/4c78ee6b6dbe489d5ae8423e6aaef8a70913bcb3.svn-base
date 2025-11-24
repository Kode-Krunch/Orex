import { DatePicker, Select } from 'components/ui';
import React, { useState } from 'react';
import FilteredListDialog from './FilteredListDialog';

/* CONSTANTS */
const BOOKING_TYPE_OPTIONS = [
  { value: 'Booking', label: 'Booking' },
  { value: 'LOG', label: 'Transmission Log' },
];

const FILTER_TYPE_OPTIONS = [
  { value: 0, label: 'Client' },
  { value: 1, label: 'Agency' },
  { value: 2, label: 'Brand' },
  { value: 3, label: 'Content / Program' },
  { value: 4, label: 'Schedule Time' },
  { value: 5, label: 'Spot Type' },
  { value: 6, label: 'Rate' },
  { value: 7, label: 'Hour' },
];

function Header({
  date,
  setDate,
  bookingType,
  setBookingType,
  filterType,
  setFilterType,
  selectedFilteredRow,
  setSelectedFilteredRow,
  setShowLoader,
}) {
  /* STATES */
  const [isFilteredListDialogOpen, setIsFilteredListDialogOpen] =
    useState(false);

  return (
    <>
      <div className="grid grid-cols-9 gap-6">
        <div className="col-span-2">
          <p className="text-white mb-1">
            Date <span className="text-red-500">*</span>
          </p>
          <DatePicker
            placeholder="Select"
            size="sm"
            defaultOpen
            onChange={(date) => setDate(date)}
            minDate={new Date()}
            clearable={false}
            value={date}
          />
        </div>
        <div className="col-span-2">
          <p className="text-white mb-1">
            Booking Type <span className="text-red-500">*</span>
          </p>
          <Select
            placeholder="Select"
            options={BOOKING_TYPE_OPTIONS}
            size="sm"
            isDisabled={!date}
            onChange={(selectedOption) => setBookingType(selectedOption)}
            value={bookingType}
          />
        </div>
        <div className="col-span-2">
          <p className="text-white mb-1">
            Filter <span className="text-red-500">*</span>
          </p>
          <Select
            placeholder="Select"
            options={FILTER_TYPE_OPTIONS}
            size="sm"
            isDisabled={!bookingType}
            onChange={(selectedOption) => setFilterType(selectedOption)}
            value={filterType}
          />
        </div>
        <div className="col-span-3">
          <p className="text-white mb-1">
            {filterType.label ? filterType.label : 'Entity'}{' '}
            <span className="text-red-500">*</span>
          </p>
          <Select
            placeholder="Select"
            options={[]}
            {...(selectedFilteredRow &&
              selectedFilteredRow.FilterType && {
                value: {
                  value: selectedFilteredRow.FilterType,
                  label: selectedFilteredRow.FilterType,
                },
              })}
            size="sm"
            isDisabled={!filterType}
            onMenuOpen={(event) => setIsFilteredListDialogOpen(true)}
          />
        </div>
      </div>
      <FilteredListDialog
        isFilteredListDialogOpen={isFilteredListDialogOpen}
        setIsFilteredListDialogOpen={setIsFilteredListDialogOpen}
        date={date}
        bookingType={bookingType}
        filterType={filterType}
        selectedFilteredRow={selectedFilteredRow}
        setSelectedFilteredRow={setSelectedFilteredRow}
        setShowLoader={setShowLoader}
      />
    </>
  );
}

export default Header;
