import { Tag } from 'components/ui';
import React from 'react';
import { HiClock, HiOutlineClipboardCheck } from 'react-icons/hi';

function CommSummary({ comm }) {
  return (
    <div className="flex items-center justify-between rounded-lg p-2 cursor-pointer user-select bg-gray-50 dark:bg-gray-700/60 hover:bg-gray-100 dark:hover:bg-gray-700/90">
      <div className="flex items-center rounded-full font-semibold text-xs">
        <div className="flex items-center px-2 py-1 border border-gray-300 rounded-full  mr-2">
          <HiOutlineClipboardCheck className="text-base" />
          <span className="ml-1 rtl:mr-1 whitespace-nowrap">
            {comm.TotalCount}
          </span>
        </div>
        {'  '}
        <div className="flex items-center">
          <div className="text-gray-900 dark:text-gray-300 text-xs">
            {comm.CommercialCaption} [{comm.CommercialDuration}]
          </div>
        </div>
      </div>
      <div className="text-gray-900 dark:text-gray-300 text-lg">
        <Tag showCloseButton={false}>
          <div className="flex items-center text-sm">
            <span className="mr-1">
              <HiClock />
            </span>{' '}
            {comm.TotalDuration} sec
          </div>
        </Tag>
      </div>
      <div className="text-gray-900 dark:text-gray-300 text-lg">
        <Tag showCloseButton={false}>
          <span className="text-lg">
            {comm.CurrencySymbol} {comm.SpotAmountSum}
          </span>
        </Tag>
      </div>
    </div>
  );
}

export default CommSummary;
