import { convertDateToDMY } from 'components/validators';
import React, { memo } from 'react';

function AppliedFilters({ dateRange, duration }) {
  /* CONSTANTS */
  const isDateRangePresent = dateRange[0] !== null && dateRange[1] !== null;
  const isDurationPresent = duration[0] !== null && duration[1] !== null;

  return (
    <>
      {(isDateRangePresent || isDurationPresent) && (
        <div className="flex gap-2 text-sm text-gray-200">
          {isDateRangePresent && (
            <p className="py-1 px-3 bg-gray-700 rounded-md">
              {`${convertDateToDMY(dateRange[0])} ~ ${convertDateToDMY(
                dateRange[1],
              )}`}
            </p>
          )}
          {isDurationPresent && (
            <p className="py-1 px-3 bg-gray-700 rounded-md">
              {`${duration[0]} - ${duration[1]} Mins`}
            </p>
          )}
        </div>
      )}
    </>
  );
}

export default memo(AppliedFilters);
