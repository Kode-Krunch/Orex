import { Button, Tooltip } from 'components/ui';
import React from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { getWeekRange } from './utils';
import { addDays, format, subDays } from 'date-fns';

function Header({ dateRange, setDateRange }) {
  return (
    <div className="flex justify-between items-center">
      <h5>Brand Spots</h5>
      <div className="flex items-center gap-4">
        <p className="font-semibold text-gray-300">
          {format(dateRange[0], 'd MMM, yyyy')} -{' '}
          {format(dateRange[1], 'd MMM, yyyy')}
        </p>
        <div className="flex items-center">
          <Tooltip title="Prev Week">
            <Button
              icon={<IoIosArrowBack />}
              size="sm"
              shape="none"
              className="!rounded-l-lg"
              onClick={() =>
                setDateRange(getWeekRange(subDays(dateRange[0], 7)))
              }
            />
          </Tooltip>
          <Tooltip title="Next Week">
            <Button
              icon={<IoIosArrowForward />}
              size="sm"
              shape="none"
              className="!rounded-r-lg"
              onClick={() =>
                setDateRange(getWeekRange(addDays(dateRange[0], 7)))
              }
            />
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

export default Header;
