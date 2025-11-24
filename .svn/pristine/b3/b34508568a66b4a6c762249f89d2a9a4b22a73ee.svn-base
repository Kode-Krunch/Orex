import { Button, Select, Tooltip } from 'components/ui';
import React from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

function Header() {
  return (
    <div className="flex justify-between items-center pb-3 border-b border-b-gray-700">
      <h4>BARC Analysis</h4>
      <h5>
        18<sup>th</sup> Nov, 2024 - 24<sup>th</sup> Nov, 2024
      </h5>
      <div className="flex gap-3 items-center">
        <Select
          defaultValue={{ value: 'daily', label: 'Daily' }}
          options={[
            { value: 'daily', label: 'Daily' },
            { value: 'weekly', label: 'Weekly' },
            { value: 'monthly', label: 'Monthly' },
          ]}
          size="sm"
        />
        <div className="flex">
          <Tooltip title="Previous Day">
            <Button
              icon={<MdChevronLeft className="text-2xl" />}
              size="sm"
              className="!rounded-r-none"
            />
          </Tooltip>
          <Tooltip title="Next Day">
            <Button
              icon={<MdChevronRight className="text-2xl" />}
              size="sm"
              className="!rounded-l-none"
            />
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

export default Header;
